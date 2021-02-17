import { Document as BaseDocument } from "mongoose";

interface Document extends BaseDocument {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
}



export interface ICustomer extends Document {
  name: string;
  mainAadhaar: number;
  consumerNo: boolean;
  familyAdhaar: number;
  regNo: number
  mainAgent: string;
  subAgent: string
  remarks: string
  createdBy: string;

}
