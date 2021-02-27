import BaseController from "../policies/BaseController";
import { Request, Response, NextFunction as Next } from "express";
import * as Joi from "@hapi/joi";
import { CustomerService } from "../services/customer.service";
import * as moment from "moment";


export class CustomerController extends BaseController {
  constructor(private customerService: CustomerService = new CustomerService()) {
    super();
  }



  private customerJoiSchema = Joi.object()
    .keys({
        name:Joi.string().required(),
        mobile: Joi.string().required(),
        mainAadhaar:Joi.string().required(),
        familyAadhaar:Joi.string().required(),
        consumerNo:Joi.string().required(),
        mainAgent:Joi.string().required(),
        subAgent:Joi.string().optional(),
        remarks:Joi.string().required(),
        regNo:Joi.string().required()
    })
    .required();

    private cutomerUpdateJoiSchema = Joi.object()
    .keys({
      name: Joi.string().optional().empty(""),
      mobile: Joi.string().optional().empty(""),
      mainAadhaar: Joi.string().optional().empty(""),
      familyAadhaar:Joi.string().optional().empty(""),
      consumerNo:Joi.string().optional().empty(""),
      mainAgent:Joi.string().optional().empty(""),
      subAgent:Joi.string().optional().empty(""),
      remarks:Joi.string().optional().empty(""),
      regNo:Joi.string().optional().empty("")
    })
    .required();

    private statsDataJoiSchema = Joi.object().keys({
      start_date: Joi.string().required(),
      end_date: Joi.string().required(),
      override_cache: Joi.boolean().default(false)
  })

  registerACustomer = async (req: Request, res: Response, next: Next) => {
    try {
      const value = await this.customerJoiSchema.validateAsync(req.body, { stripUnknown: true });

      const result = await this.customerService.registerACustomer(value);

      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };



  //finding a customer from DB
  searchCustomer = async (req: Request, res: Response, next: Next) => {
    try {

      const value = await this.cutomerUpdateJoiSchema.validateAsync(req.body);
      let result = await this.customerService.findCustomer(value)
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };


  customerStatsData = async (req: Request, res: Response, next: Next) => {
    try {
        const validatedData = await this.statsDataJoiSchema.validateAsync(req.body, this.joiOptions);
        const startDateISO = moment(validatedData.start_date)
        const endDateISO = moment(validatedData.end_date).endOf('day') // Timezone issue
        const result = await this.customerService.statsData(startDateISO, endDateISO)
        return res.status(200).json({ "data": result })
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
}


getLiveStats = async (req: Request, res: Response) => {
  try {
      const result = await this.customerService.getLiveStats(req.body)
      return res.status(200).json({ "data": result })
  } catch (error) {
      return res.status(400).json()
  }
}


//update customer
// updateCustomer = async (req: Request, res: Response, next: Next) => {

//   try {
//     const value = await this.cutomerUpdateJoiSchema.validateAsync(req.body, { stripUnknown: true });
//     let result = await this.customerService.findCustomer(value)
//     return res.send(result);
//   } catch (error) {
//     this.ErrorResult(error, req, res, next);
//   }
// }
}