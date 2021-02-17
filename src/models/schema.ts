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

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: {} }
);

export const CustomerSchema = new Schema({
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
  mainAdhaar: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  familyAdhaar: {
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
  },
  remarks: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },




  createdBy: {
    type: String,
    required: true,
  },

});

export default {
  userSchema,
  CustomerSchema,
};
