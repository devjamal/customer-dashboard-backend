import BaseService from "../policies/BaseService";
import { IUser } from "../models/dbTypes";
import { db } from "../models/db";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

const JWT_OPTIONS = { expiresIn: "90d", noTimestamp: false };

export class UserService extends BaseService {
  constructor() {
    super();
  }
  registerAUser = async (user: IUser) => {
    try {
      const enc = { ...user };
      if (enc.password) enc.password = hashSync(enc.password, genSaltSync(12));
      let result = await db.users.create(enc);
      let existuser = await db.users.findOne({ email: user.email }).exec();
      if (this._.isNil(result)) return this.RESP(false, "You haven't registered", result);
      result = result.toObject();
      const token = sign(result, process.env.SECRET, JWT_OPTIONS);
      return this.RESP(true, "registered successfully", { token });
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  userLogin = async (user: IUser) => {
    try {
      let result = await db.users.findOne({ email: user.email }).exec();
      // if (this._.isNil(result)) return this.RESP(false, "You haven't registered", result);
      if (this._.isNil(result)) throw "You haven't registered";
      // if (user.password !== result.password) return this.RESP(false, "password missmatch! try again", result);
      // if (user.email !== result.email) return this.RESP(false, "You have not registered! ,register with us", result);
      const isMatch = compareSync(user.password, result.password);
      if (!isMatch) throw "wrong password";
      result = result.toObject();
      delete result.password;
      delete result.createdAt;
      delete result.updatedAt;

      const token = sign(result, process.env.SECRET, JWT_OPTIONS);

      return this.RESP(true, "user loggedin successfully", { token });
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  findUser = async (email) => {
    try {
      let result = await db.users.findOne(email);
      if (result.email == null) throw "user not found";
      return this.RESP(true, "user found ", result);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
