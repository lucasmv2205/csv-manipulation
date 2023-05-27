import { parseVoteResults } from "../csvParser/voteResultsParser";
import { VoteResult } from "../entities/VoteResults";

export class VoteResultsRepository {
  private voteResults: VoteResult[];

  constructor(voteResults?: VoteResult[]) {
    this.voteResults = voteResults || [];
  }

  async loadVoteResults(filePath: string): Promise<void> {
    try {
      this.voteResults = await parseVoteResults(filePath);
    } catch (error) {
      throw new Error("error loading vote results: " + error);
    }
  }

  getAllVoteResults(): VoteResult[] {
    return this.voteResults;
  }

  getAllVoteResultsByVoteId(voteId: number) {
    return this.voteResults.filter((obj) => obj.vote_id === voteId);
  }

  getVoteResultsById(id: number): VoteResult | undefined {
    return this.voteResults.find((voteResult) => voteResult.id === id);
  }
}
