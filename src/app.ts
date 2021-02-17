require("dotenv").config();
import { logger } from "./policies/InitApp";
import routeDefinition from "./routes";

import { Express as Server, json, urlencoded } from "express";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import { CorsOptions } from "cors";
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
const server: Server = express();

logger.debug("✔ Logger initialised");

server.use(json());
server.use(urlencoded());



const corsOptions: CorsOptions = {
  // origins: ["*"],
  origin: "*",
  allowedHeaders: ["at", "Content-Type", "encryption", "access_token"],
  exposedHeaders: [],
  // preflightContinue: false,
  // optionsSuccessStatus: 204,
};


server.use(cors(corsOptions));

server.use((req, _, next) => {
  logger.debug(req.method, req.url, " => ", req.headers["host"]);
  next();
});

routeDefinition(server);
server.get("/", (_, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  res.write("<h1 style='font-family:monospace;text-align:center;font-size:72px'><br/><br/><br/>🚀<br/>API is Ready! </h1>");
  return res.end();
});

server.listen(process.env.PORT, function () {
  logger.info("=---------------------------------------------------=");
  logger.info("env -> ", process.env.NODE_CONFIG_ENV);
  logger.info("=---------------------------------------------------=");
  logger.info("API HOSTED ON => http://localhost:%s", process.env.PORT);
  logger.info("=---------------------------------------------------=");
});
