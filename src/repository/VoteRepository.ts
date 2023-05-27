import { parseVotes } from "../csvParser/voteParser";
import { Vote } from "../entities/Vote";

export class VoteRepository {
  private votes: Vote[];

  constructor(votes?: Vote[]) {
    this.votes = votes || [];
  }

  async loadVotes(filePath: string): Promise<void> {
    try {
      this.votes = await parseVotes(filePath);
    } catch (error) {
      throw new Error('error loading votes: ' + error);
    }
  }

  getAllVotes(): Vote[] {
    return this.votes;
  }

  getVoteById(id: number): Vote | null {
    return this.votes.find((vote) => vote.id === id) || null;
  }

  getVoteByBillId(billId: number): Vote | null {
    return this.votes.find((vote) => vote.bill_id === billId) || null;
  }
}
