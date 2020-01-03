import express from "express";
import { logger } from "../util/logger";
import { HTTP_PORT } from "../util/env";
import log4js from "log4js";

export class Http {
  app = express();
  httpPort = HTTP_PORT;

  constructor() {
    this.app.use(log4js.connectLogger(logger, { level: "info" }));
  }

  init() {
    this.app.get("/ping", (req, res) => {
      res.send("pong!");
    });

    this.app.listen(this.httpPort, () => {
      logger.info(`App started at port ${this.httpPort}`);
    });
  }
}
