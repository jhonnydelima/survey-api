import { ServerError } from "../errors";
import { HttpStatusCode, type HttpResponse } from "../protocols";

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

export function serverError(): HttpResponse {
  return {
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    body: new ServerError(),
  };
}
