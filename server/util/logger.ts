import log4js from "log4js";

log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[%d{hh:mm:ss.SSS} [%p]%] %m"
      }
    },
    file: {
      type: "file",
      filename: "./logs/output.log",
      maxLogSize: 10485760,
      backups: 3,
      compress: true
    }
  },
  categories: {
    default: {
      appenders: ["out", "file"],
      level: process.env.LOG_LEVEL || "info"
    }
  }
});

const _logger = log4js.getLogger();
_logger.info("Logger initialized");

export const logger = _logger;
