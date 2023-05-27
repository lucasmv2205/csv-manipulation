import { parseBills } from "../csvParser/billParser";
import { Bill } from "../entities/Bill";
import { Legislator } from "../entities/Legislator";
import { VoteResult } from "../entities/VoteResults";

export class BillRepository {
  private bills: Bill[];

  constructor() {
    this.bills = [];
  }

  async loadBills(filePath: string): Promise<void> {
    try {
      this.bills = await parseBills(filePath);
    } catch (error) {
      throw new Error("error loading bills: " + error);
    }
  }

  getAllBills(): Bill[] {
    return this.bills;
  }

  getBillById(id: number): Bill | undefined {
    return this.bills.find((bill) => bill.id === id);
  }

  calculateSupportOpposeCounts(
    voteRepository: { getVoteByBillId: (arg0: number) => any },
    legislatorRepository: {
      getLegislatorById: (arg0: number) => Legislator | undefined;
    },
    voteResultsRepository: { getAllVoteResultsByVoteId: (arg0: any) => any }
  ) {
    const allBills = this.getAllBills();
    return allBills.map((bill: Bill) => {
      let supporter_count = 0;
      let opposer_count = 0;
      const primary_sponsor =
        legislatorRepository.getLegislatorById(bill.sponsor_id)?.name ||
        "Unknown";
      const vote = voteRepository.getVoteByBillId(bill.id);
      const voteResults = vote
        ? voteResultsRepository.getAllVoteResultsByVoteId(vote.id)
        : [];

      voteResults.map((voteResult: VoteResult) => {
        if (voteResult.vote_type === 1) {
          supporter_count += 1;
        } else {
          opposer_count += 1;
        }
      });

      const obj = {
        id: bill.id,
        title: bill.title,
        primary_sponsor,
        supporter_count,
        opposer_count,
      };
      return obj;
    });
  }
}
