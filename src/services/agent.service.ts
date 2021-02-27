import BaseService from "../policies/BaseService";
import { IAgent, } from "../models/dbTypes";
import { db } from "../models/db";
import { sign } from "jsonwebtoken";


export class AgentService extends BaseService {
  constructor() {
    super();
  }
  registerAgent = async (user: IAgent) => {
    try {
      const enc = { ...user };
    //   if (enc.password) enc.password = hashSync(enc.password, genSaltSync(12));
      let result = await db.Agent.create(enc)
       //@ts-ignore
      result = result.toObject();
    //   const token = sign(result, process.env.SECRET, JWT_OPTIONS);
      return this.RESP("success", "Agent registered successfully", { result });
    } catch (error) {
      throw error;
    }
  };


  getAgentslist = async () => {
    try {
        let result = await db.Agent.find()
      return this.RESP("success", "Agent registered successfully", { result });
    } catch (error) {
      throw error;
    }

}
}
