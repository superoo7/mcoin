import { logger } from "../util/logger";

export interface BlockConfig {
  blockTime: number;
  originHash: string;
}

type HistoryBlock = { [blockNo: number]: Partial<BlockConfig> };

export const HISTORY_BLOCK: HistoryBlock = {
  /** Genesis Block */
  0: {
    blockTime: 3000,
    originHash:
      "0000000000000000000000000000000000000000000000000000000000000035"
  }
};

export class BlockHistory {
  num = 0;
  history: HistoryBlock;

  constructor(history: HistoryBlock = HISTORY_BLOCK) {
    this.history = history;
  }

  get blockNum() {
    return this.num;
  }

  set blockNum(val: number) {
    this.num = val;
  }

  config() {
    let config = {} as BlockConfig;
    Object.keys(this.history).map((block, key) => {
      if (this.blockNum >= parseInt(block)) {
        // Hard fork config
        if (this.blockNum === parseInt(block)) logger.info("Hard Fork #" + key);
        config = { ...config, ...(this.history as any)[block] };
      } else {
        //
      }
    });
    return config;
  }
}
