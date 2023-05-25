import { VoteRepository } from "./repository/VoteRepository";
import { BillRepository } from "./repository/BillRepository";
import { LegislatorRepository } from "./repository/LegislatorRepository";
import { VoteResultsRepository } from "./repository/VoteResultsRepository";

async function main() {
  const voteRepository = new VoteRepository();
  const billRepository = new BillRepository();
  const legislatorRepository = new LegislatorRepository();
  const voteResultsRepository = new VoteResultsRepository();

  try {
    Promise.all([
      await voteRepository.loadVotes("src/files/votes.csv"),
      await billRepository.loadBills("src/files/bills.csv"),
      await legislatorRepository.loadLegislators("src/files/legislators.csv"),
      await voteResultsRepository.loadVoteResults("src/files/vote_results.csv"),
    ]);

    const allVotes = voteRepository.getAllVotes();
    const allBills = billRepository.getAllBills();

  } catch (error) {
    console.error("error loading csv files", error);
  }
}

main();
