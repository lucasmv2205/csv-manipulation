import { LegislatorRepository } from "../repository/LegislatorRepository";
import { VoteResultsRepository } from "../repository/VoteResultsRepository";
import { VoteRepository } from "../repository/VoteRepository";
import { BillRepository } from "../repository/BillRepository";

describe("BillRepository - calculateSupportOpposeCounts", () => {
  it("should calculate how many legislators supported and oppose the bill", () => {
    const legislators = [
      { id: 1, name: "Legislator 1" },
      { id: 2, name: "Legislator 2" },
      { id: 3, name: "Legislator 3" },
    ];

    const vote_results = [
      { id: 1, legislator_id: 1, vote_id: 1, vote_type: 1 },
      { id: 2, legislator_id: 1, vote_id: 1, vote_type: 2 },
      { id: 3, legislator_id: 1, vote_id: 2, vote_type: 1 },
      { id: 4, legislator_id: 2, vote_id: 2, vote_type: 2 },
    ];

    const votes = [
      { id: 1, bill_id: 1 },
      { id: 2, bill_id: 2 },
    ];

    const bills = [
      { id: 1, title: "title 1", sponsor_id: 1 },
      { id: 2, title: "title 2", sponsor_id: 1234 },
    ];

    const legislatorRepository = new LegislatorRepository(legislators);
    const voteResultsRepository = new VoteResultsRepository(vote_results);
    const voteRepository = new VoteRepository(votes);
    const billRepository = new BillRepository(bills);

    const result = billRepository.calculateSupportOpposeCounts(
      voteRepository,
      legislatorRepository,
      voteResultsRepository
    );

    expect(result).toEqual([
      {
        id: 1,
        title: "title 1",
        supporter_count: 1,
        opposer_count: 1,
        primary_sponsor: 'Legislator 1'
      },
      {
        id: 2,
        title: "title 2",
        supporter_count: 1,
        opposer_count: 1,
        primary_sponsor: 'Unknown'
      },
    ]);
  });
});
