import { Document as BaseDocument } from "mongoose";

interface Document extends BaseDocument {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name:string;
  mobile:string
}



export interface ICustomer extends Document {
  name: string;
  mainAadhaar: number;
  consumerNo:number;
  mobile:number;
  familyAadhaar: number;
  regNo: number
  mainAgent: string;
  subAgent: string
  remarks: string

}

export interface IAgent extends Document {
  name: string;
  mobile:number;
  address:string;


}

