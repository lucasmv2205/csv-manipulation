import { parseLegislators } from "../csvParser/legislatorParser";
import { Legislator } from "../entities/Legislator";
import { VoteResult } from "../entities/VoteResults";

export class LegislatorRepository {
  private legislators: Legislator[];

  constructor(legislators?: Legislator[]) {
    this.legislators = legislators || [];
  }

  async loadLegislators(filePath: string): Promise<void> {
    try {
      this.legislators = await parseLegislators(filePath);
    } catch (error) {
      throw new Error("error loading legislators: " + error);
    }
  }

  getAllLegislators(): Legislator[] {
    return this.legislators;
  }

  getLegislatorById(id: number): Legislator | undefined {
    return this.legislators.find((legislator) => legislator.id === id);
  }

  filterVotesByLegislatorId(legislatorId: number, votes: VoteResult[]) {
    const filteredVotes = votes.filter(
      (vote) => vote.legislator_id === legislatorId
    );
    const num_supported_bills = filteredVotes.filter(
      (vote) => vote.vote_type === 1
    ).length;
    const num_opposed_bills = filteredVotes.filter(
      (vote) => vote.vote_type === 2
    ).length;
    return { num_supported_bills, num_opposed_bills };
  }

  calculateSupportOpposeCounts(
    voteResultsRepository: any
  ) {
    const legislators = this.getAllLegislators();
    const votes = voteResultsRepository.getAllVoteResults();

    const legislatorSupporOpposeCount = legislators.map(
      (legislator: Legislator) => {
        const { id, name } = legislator;
        const { num_supported_bills, num_opposed_bills } =
          this.filterVotesByLegislatorId(id, votes);

        return {
          id,
          name,
          num_supported_bills,
          num_opposed_bills,
        };
      }
    );

    return legislatorSupporOpposeCount;
  }
}
