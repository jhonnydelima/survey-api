import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, noContent, serverError } from "../helpers/http-helper";
import type { Controller } from "../protocols/controller";
import type { EmailValidator } from "../protocols/email-validator";
import { type HttpRequest, type HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];

    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError("email"));
      }
      return noContent();
    } catch (error) {
      return serverError();
    }
  }
}
