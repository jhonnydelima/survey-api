import { HttpStatusCode, type HttpResponse } from "../protocols/http";

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: error,
  };
}

export function noContent(): HttpResponse {
  return {
    statusCode: HttpStatusCode.NO_CONTENT,
    body: null,
  };
}
