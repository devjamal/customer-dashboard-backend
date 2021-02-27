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
      return this.RESP("success", "registered successfully", {result});
    } catch (error) {
      throw error;
    }
  };


  updateUser = async (options) => {
    try {
        const user = await db.Customers.findOneAndUpdate({}, { new: true });
        if (this._.isNil(user)) throw Error;
        return this.RESP("success", "User updated successfully", user);

    } catch (error) {
        throw error;
    }
};

  findCustomer = async (data) => {
    try {
      let result = await db.Customers.findOne(data);
    //@ts-ignore
      if (result == null) throw "Customer not found";
    return this.RESP("success", "User found successfully", result);
  } catch (error) {
      throw error;
    }
  };


statsData = async ( startDateISO, endDateISO) => {
  try {
      const result = await db.Customers.aggregate([
          {
              $match: {
                  createdAt: {
                      $gte: startDateISO.toDate(),
                      $lt: endDateISO.toDate(),
                  },
              },
          },
          {
              $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "+05:30" } },
                  customers: {
                      $push: {
                          name: "$name",
                          mobile: "$mobile",
                          createdAt: "$createdAt",
                          mainAadhaar:"$mainAadhaar",
                          familyAdhaar:"$familyAdhaar",
                          regNo:"$regNo",
                          mainAgent:"$mainAgent",
                          subAgent:"$subAgent",
                          remarks:"$remarks"

                      },
                  },
              },
          },
          {
              $project: {
                  _id: 0,
                  join_date: "$_id",
                  customers: 1,
              },
          },
          { $sort: { "join_date": -1 } }
      ])
      return result
  } catch (error) {
      throw error
  }
}


getLiveStats = async (data:any) => {
  try {
      const result = {
          "userCount": 1,
          "CustomerCount": 1,
      }
      result.userCount = await db.Users.estimatedDocumentCount()
      result.CustomerCount = await db.Customers.estimatedDocumentCount()
      return result
  } catch (error) {
      throw error
  }
}
}