import { createConnection, set } from "mongoose";

import * as SCHEMAS from "./schema";
import * as dbTypes from "./dbTypes";

const mongoPath = process.env.MONGO_PATH;
set("debug", true);
set("useCreateIndex", true);
set("useFindAndModify", false);

const connection = createConnection(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true, config: { autoIndex: true } });

export const db = {
  users: connection.model<dbTypes.IUser>("users", SCHEMAS.userSchema),
  customer: connection.model<dbTypes.ICustomer>("customer", SCHEMAS.CustomerSchema),
};
