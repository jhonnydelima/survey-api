import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, noContent } from "../helpers/http-helper";
import { type HttpRequest, type HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("Missing param: name"));
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("Missing param: email"));
    }
    return noContent();
  }
}
