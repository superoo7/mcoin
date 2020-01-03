import { Block } from "./block";

export class Blockchain {
  recentBlock: Block[] = [];

  cleanMemoryBlock() {
    this.recentBlock = [];
  }

  cleanMemoryTx() {}
}
