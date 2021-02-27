import BaseController from "../policies/BaseController";
import { Request, Response, NextFunction as Next } from "express";
import { AgentService } from "../services/Agent.service";
import * as Joi from "@hapi/joi";


export class AgentController extends BaseController {
  constructor(private agentService: AgentService = new AgentService()) {
    super();
  }
    private agentSchema = Joi.object()
    .keys({
      name:Joi.string().required(),
      mobile:Joi.string().required(),
      address:Joi.string().required()

    })
    .required();


// register a agent
  registerAgent = async (req: Request, res: Response, next: Next) => {
    try {
      const value = await this.agentSchema.validateAsync(req.body, { stripUnknown: true });

      const result = await this.agentService.registerAgent(value);

      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

// find a agent
getAgent = async (req: Request, res: Response, next: Next) => {
    try {
      let result = await this.agentService.getAgentslist()
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

}
