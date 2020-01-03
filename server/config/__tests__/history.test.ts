import { HISTORY_BLOCK, BlockHistory } from "../history";

describe("History", () => {
  const history = {
    ...HISTORY_BLOCK,
    3: {
      blockTime: 1000
    }
  };
  let blockHistory: BlockHistory;

  beforeEach(() => {
    blockHistory = new BlockHistory(history);
  });

  it("update block number", () => {
    expect(blockHistory.blockNum).toEqual(0);
    blockHistory.blockNum = 2;
    expect(blockHistory.blockNum).toEqual(2);
  });

  it("shows updated config", () => {
    expect(blockHistory.config().blockTime).toEqual(3000);
    blockHistory.blockNum = 3;
    expect(blockHistory.config().blockTime).toEqual(1000);
  });
});
