import { Schema, SchemaOptions } from "mongoose";
import { date, number, object } from "@hapi/joi";

const schemaOptions: SchemaOptions = {
  timestamps: true,
  versionKey: false,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mainAadhaar: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
consumerNo:{
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  unique: true,
},
  familyAadhaar: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mainAgent: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  subAgent: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  regNo: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  remarks: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  }
},
  { timestamps: {} }
)

export  {
  CustomerSchema
};
