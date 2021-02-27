import { createConnection, set } from "mongoose";

import * as SCHEMAS from "./user.schema";
import * as CUSTOMERSCHEMAS from "./customer.schema";
import * as  AGENTSCHEMAS from './agent.schema'

import * as dbTypes from "./dbTypes";
import * as mongoose from "mongoose";


const mongoPath = process.env.MONGO_PATH;

set("useCreateIndex", true);
set("useFindAndModify", false);

const connection = createConnection(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true, config: { autoIndex: true } });

export const db = {
  Users: connection.model<dbTypes.IUser>("Users", SCHEMAS.userSchema , "users"),
  Customers: connection.model<dbTypes.ICustomer>("Customers", CUSTOMERSCHEMAS.CustomerSchema ,  "customers"),
  Agent: connection.model<dbTypes.IAgent>("agent", AGENTSCHEMAS.AgentSchema ,  "agent"),
};

