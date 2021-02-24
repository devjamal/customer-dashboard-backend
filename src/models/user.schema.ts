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
 const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile :{
    type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

  },
  { timestamps: true
  }
);



export  {
  userSchema
}
