import {
  type HttpRequest,
  type HttpResponse,
  HttpStatusCode,
} from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: new Error("Missing param: name"),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: new Error("Missing param: email"),
      };
    }
    return {
      statusCode: HttpStatusCode.NO_CONTENT,
      body: null,
    };
  }
}
