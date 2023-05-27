import { LegislatorRepository } from "../repository/LegislatorRepository";
import { VoteResultsRepository } from "../repository/VoteResultsRepository";

describe('LegislatorRepository - calculateSupportOpposeCounts', () => {
  it('should calculate how many bills did each legislator support and oppose', () => {
    const legislators = [
      { id: 1, name: 'Legislator 1' },
      { id: 2, name: 'Legislator 2' },
      { id: 3, name: 'Legislator 3' },
    ];

    const votes = [
      { id: 1, legislator_id: 1, vote_id: 1, vote_type: 1 },
      { id: 2, legislator_id: 1, vote_id: 2, vote_type: 1 },
      { id: 3, legislator_id: 1, vote_id: 3, vote_type: 2 },
      { id: 4, legislator_id: 2, vote_id: 4, vote_type: 1 },
      { id: 5, legislator_id: 2, vote_id: 5, vote_type: 2 },
    ];

    const legislatorRepository = new LegislatorRepository(legislators);
    const voteResultsRepository = new VoteResultsRepository(votes);

    const result = legislatorRepository.calculateSupportOpposeCounts(voteResultsRepository);

    expect(result).toEqual([
      { id: 1, name: 'Legislator 1', num_supported_bills: 2, num_opposed_bills: 1 },
      { id: 2, name: 'Legislator 2', num_supported_bills: 1, num_opposed_bills: 1 },
      { id: 3, name: 'Legislator 3', num_supported_bills: 0, num_opposed_bills: 0 },
    ]);

  });
});