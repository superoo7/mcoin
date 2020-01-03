import { Http } from "./http";
import { MongoDatabase } from "./db/mongo";
import { BlockHistory } from "./config/history";
import { logger } from "./util/logger";

(async () => {
  try {
    const config = new BlockHistory();
    const db = new MongoDatabase(config);
    await db.init();

    const http = new Http();
    http.init();

    console.log(await db.lastBlock());
  } catch (err) {
    logger.error(err);
  }
})();
