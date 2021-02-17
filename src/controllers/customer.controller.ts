import BaseController from "../policies/BaseController";
import { Request, Response, NextFunction as Next } from "express";
import * as Joi from "@hapi/joi";
import { CustomerService } from "../services/customer.service";


export class CustomerController extends BaseController {
  constructor(private customerService: CustomerService = new CustomerService()) {
    super();
  }



  private customerJoiSchema = Joi.object()
    .keys({
        name:Joi.string().required(),
        mobile: Joi.string().required(),
        mainAadhaar:Joi.string().required(),
        familyaadhaar:Joi.string().required(),
        consumerNo:Joi.string().required(),
        mainAgent:Joi.string().required(),
        subAgent:Joi.string().optional() ,
        // remarks:Joi.string.required(),
        // regNo:Joi.string.required()
    })
    .required();

  registerACustomer = async (req: Request, res: Response, next: Next) => {
    try {
      const value = await this.customerJoiSchema.validateAsync(req.body, { stripUnknown: true });

      const result = await this.customerService.registerACustomer(value);

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
      let result = await this.customerService.findCustomer(value)
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
