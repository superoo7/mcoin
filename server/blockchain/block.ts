import { BlockHistory } from "../config/history";

interface IBlock {
  timestamp: number;
  hash: string;
  signature: string;
}

export class Block {
  timestamp: number;
  hash: string;
  signature: string;
  blockHistory: BlockHistory;

  constructor(
    { timestamp, hash, signature }: IBlock,
    blockHistory = new BlockHistory()
  ) {
    this.timestamp = timestamp;
    this.hash = hash;
    this.signature = signature;
    this.blockHistory = blockHistory;
  }

  static genesis(blockHistory: BlockHistory) {
    const genesisBlock = new this(
      {
        timestamp: 0,
        hash:
          "0000000000000000000000000000000000000000000000000000000000000000",
        signature: blockHistory.config().originHash
      },
      blockHistory
    );
    delete genesisBlock.blockHistory;
    return genesisBlock;
  }
}
