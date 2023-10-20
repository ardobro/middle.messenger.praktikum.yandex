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

type HTTPMethod = (
  url: string,
  options?: OptionsWithoutMethod
) => Promise<unknown>;

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
  get: HTTPMethod = (url, options = {}) => {
    const queryString = queryStringify(options.data as Record<string, unknown>);

    return this.request(url + queryString, {
      ...options,
      method: METHOD.GET,
    });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.POST });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.PUT });
  };

  patch: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.PATCH });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.DELETE });
  };

  request = (
    url: string,
    options: Options = { method: METHOD.GET },
    timeout = 5000
  ): Promise<unknown> => {
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
  };
}

function fetchWithRetry(url: string, options: Options): Promise<unknown> {
  const { retries = 1 } = options;

  return new HTTPTransport().get(url, options).catch((error: unknown) => {
    if (retries > 0) {
      return fetchWithRetry(url, { ...options, retries: retries - 1 });
    } else {
      throw error;
    }
  });
}

export { fetchWithRetry };

export default HTTPTransport;
