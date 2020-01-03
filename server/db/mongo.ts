import { MongoClient, Db } from "mongodb";
import { DB_URL, DB_NAME } from "../util/env";
import { logger } from "../util/logger";
import { BlockHistory } from "../config/history";
import { Block } from "../blockchain/block";

export class MongoDatabase {
  db!: Db;
  blockHistory: BlockHistory;

  constructor(blockHistory: BlockHistory) {
    this.blockHistory = blockHistory;
  }

  get config() {
    return this.blockHistory.config();
  }

  init() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
        if (err) reject(err);
        this.db = client.db(DB_NAME);
        logger.info("Connected to " + DB_URL + "/" + this.db.databaseName);

        // check genesis block
        this.db.collection("blocks").findOne({ _id: 0 }, (err, genesis) => {
          if (err) reject(err);
          if (genesis) {
            if (genesis.hash !== this.config.originHash) {
              logger.fatal(
                "Block #0 hash doesn't match config. Did you forget to db.dropDatabase() ?"
              );
              process.exit(1);
            }
            resolve();
            return;
          } else {
            logger.info(
              "Creating Genesis Block #0 with hash " + this.config.originHash
            );
            // this.db.collection("accounts").insertOne({});
            this.db.collection("blocks").findOne({}, (err, block) => {
              if (err) reject(err);
              if (!block) {
                const genesisBlock = Block.genesis(this.blockHistory);
                this.db.collection("blocks").insertOne(genesisBlock, () => {
                  resolve();
                });
              } else resolve();
            });
          }
        });
      });
    });
  }

  lastBlock() {
    return new Promise((resolve, reject) =>
      this.db.collection("blocks").findOne(
        {},
        {
          sort: { _id: -1 }
        },
        (err, block) => {
          if (err) reject(err);
          resolve(block);
        }
      )
    );
  }
}
