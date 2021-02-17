import BaseService from "../policies/BaseService";
import { ICustomer } from "../models/dbTypes";
import { db } from "../models/db";

export class CustomerService extends BaseService {
  constructor() {
    super();
  }
  registerACustomer = async (customer: ICustomer) => {
    try {
      const enc = { ...customer };
      let result = await db.customer.create(enc);
      return this.RESP(true, "registered successfully", {result});
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };



  findCustomer = async (data) => {
    try {
      let result = await db.customer.findOne(data);
    //   if (result.data == null) throw "Customer not found";
      return this.RESP(true, "user found ", result);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
