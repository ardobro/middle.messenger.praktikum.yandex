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
  path: string,
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
  static API_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get: HTTPMethod = (path, options = {}) => {
    const queryString = queryStringify(options.data as Record<string, unknown>);

    return this.request(this.endpoint + path + queryString, {
      ...options,
      method: METHOD.GET,
    });
  };

  post: HTTPMethod = (path, options = {}) => {
    return this.request(this.endpoint + path, {
      ...options,
      method: METHOD.POST,
    });
  };

  put: HTTPMethod = (path, options = {}) => {
    return this.request(this.endpoint + path, {
      ...options,
      method: METHOD.PUT,
    });
  };

  patch: HTTPMethod = (path, options = {}) => {
    return this.request(this.endpoint + path, {
      ...options,
      method: METHOD.PATCH,
    });
  };

  delete: HTTPMethod = (path, options = {}) => {
    return this.request(this.endpoint + path, {
      ...options,
      method: METHOD.DELETE,
    });
  };

  request = (
    url: string,
    options: Options = { method: METHOD.GET },
    timeout = 5000
  ): Promise<unknown> => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        Object.entries(headers).forEach(([name, value]) => {
          xhr.setRequestHeader(name, value);
        });
      }

      xhr.onload = () => {
        resolve(xhr);
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

export default HTTPTransport;
