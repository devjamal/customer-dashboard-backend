import BaseService from "../policies/BaseService";
import { ICustomer } from "../models/dbTypes";
import { db } from "../models/db";

export class CustomerService extends BaseService {
  constructor() {
    super();
  }
  registerACustomer = async (customer: ICustomer) => {
    try {
      let customerdata = await db.Customers.findOne({ mainAadhaar:customer.mainAadhaar }).exec();

      const enc = { ...customer };
      let result = await db.Customers.create(enc);
      return this.RESP(true, "registered successfully", {result});
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };


  updateUser = async (options) => {
    try {
        const user = await db.Customers.findOneAndUpdate({}, { new: true });
        if (this._.isNil(user)) throw Error;
        return this.RESP(true, "Customer updated", user);
    } catch (error) {
        throw error;
    }
};

  findCustomer = async (data) => {
    try {
      let result = await db.Customers.findOne(data);
    //   if (result.data == null) throw "Customer not found";
      return this.RESP(true, "user found ", result);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
