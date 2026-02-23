import { MissingParamError } from "../errors/missing-param-error";
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
        body: new MissingParamError("Missing param: name"),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: new MissingParamError("Missing param: email"),
      };
    }
    return {
      statusCode: HttpStatusCode.NO_CONTENT,
      body: null,
    };
  }
}
