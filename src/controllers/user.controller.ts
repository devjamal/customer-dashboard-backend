import BaseController from "../policies/BaseController";
import { Request, Response, NextFunction as Next } from "express";
import { UserService } from "../services/user.service";
import * as Joi from "@hapi/joi";


export class UserController extends BaseController {
  constructor(private userService: UserService = new UserService()) {
    super();
  }
  private userSchema = Joi.object()
    .keys({
      email: Joi.string().required().lowercase().email(),
      password: Joi.string().required(),
      mobile:Joi.string().required()
    })
    .required();

  registerAUser = async (req: Request, res: Response, next: Next) => {
    try {
      const value = await this.userSchema.validateAsync(req.body, { stripUnknown: true });

      const result = await this.userService.registerAUser(value);

      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  // USER LOGIN

  userLogin = async (req: Request, res: Response, next: Next) => {
    try {
      const value = await this.userSchema.validateAsync(req.body, { stripUnknown: true });

      let result = await this.userService.userLogin(value);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };


  //finding a user from DB
  searchUser = async (req: Request, res: Response, next: Next) => {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().lowercase().email(),
      });
      const value = await schema.validateAsync(req.body, { stripUnknown: true });
      let result = await this.userService.findUser(value);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
