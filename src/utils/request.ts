enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Options = {
  method: METHOD;
  data?: unknown;
  headers?: Record<string, string>;
  retries?: number;
};

type OptionsWithoutMethod = Omit<Options, "method">;

function queryStringify(data: Record<string, unknown>) {
  if (!data) {
    return "";
  }

  return (
    "?" +
    Object.keys(data)
      .map((key) => {
        return `${key}=${data[key]}`;
      })
      .join("&")
  );
}

class HTTPTransport {
  get<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    const queryString = queryStringify(options.data as Record<string, unknown>);

    return this.request<T>(url + queryString, {
      ...options,
      method: METHOD.GET,
    });
  }

  post<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHOD.POST });
  }

  put<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHOD.PUT });
  }

  patch<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHOD.PATCH });
  }

  delete<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHOD.DELETE });
  }

  request<T>(
    url: string,
    options: Options = { method: METHOD.GET },
    timeout = 5000
  ): Promise<T> {
    const { method, data, headers } = options;

    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        Object.entries(headers).forEach(([name, value]) => {
          xhr.setRequestHeader(name, value);
        });
      }

      xhr.onload = () => {
        resolve(xhr as T);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      setTimeout(() => {
        reject("Timeout error");
      }, timeout);

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

function fetchWithRetry<T>(url: string, options: Options): Promise<T> {
  const { retries = 1 } = options;

  return new HTTPTransport().get<T>(url, options).catch((error: unknown) => {
    if (retries > 0) {
      return fetchWithRetry(url, { ...options, retries: retries - 1 });
    } else {
      throw error;
    }
  });
}

export { fetchWithRetry };

export default HTTPTransport;
