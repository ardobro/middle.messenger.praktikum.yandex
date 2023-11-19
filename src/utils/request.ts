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
  static API_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response = void>(
    path: string,
    options?: OptionsWithoutMethod
  ): Promise<Response> {
    let queryString = "";

    if (options?.data) {
      queryString = queryStringify(options.data as Record<string, unknown>);
    }

    return this.request<Response>(this.endpoint + path + queryString, {
      ...options,
      method: METHOD.GET,
    });
  }

  public post<Response = void>(
    path: string,
    options?: OptionsWithoutMethod
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      ...options,
      method: METHOD.POST,
    });
  }

  public put<Response = void>(
    path: string,
    options?: OptionsWithoutMethod
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      ...options,
      method: METHOD.PUT,
    });
  }

  public patch<Response = void>(
    path: string,
    options?: OptionsWithoutMethod
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      ...options,
      method: METHOD.PATCH,
    });
  }

  public delete<Response>(
    path: string,
    options?: OptionsWithoutMethod
  ): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      ...options,
      method: METHOD.DELETE,
    });
  }

  private request<Response>(
    url: string,
    options: Options = { method: METHOD.GET }
  ): Promise<Response> {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        Object.entries(headers).forEach(([name, value]) => {
          xhr.setRequestHeader(name, value);
        });
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
