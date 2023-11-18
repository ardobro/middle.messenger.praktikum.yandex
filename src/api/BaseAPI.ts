import HTTPTransport from "../utils/request";

abstract class Api {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
}

export default Api;
