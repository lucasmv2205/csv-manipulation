import { VoteRepository } from "./repository/VoteRepository";
import { BillRepository } from "./repository/BillRepository";
import { LegislatorRepository } from "./repository/LegislatorRepository";
import { VoteResultsRepository } from "./repository/VoteResultsRepository";
import { VoteResult } from "./entities/VoteResults";
import fs from 'node:fs'

interface Result_1_Format {
  id: number;
  name: string;
  num_supported_bills: number;
  num_opposed_bills: number;
}

function createLegislatorsSupportOpposeCountCsv(fileName: string, data: Result_1_Format[]): void {
  const header = 'id,name,num_supported_bills,num_opposed_bills\n';
  let csvContent = header;

  for (const { id, name, num_supported_bills, num_opposed_bills } of data) {
    const row = `${id},"${name}",${num_supported_bills},${num_opposed_bills}\n`;
    csvContent += row;
  }

  fs.writeFileSync(fileName, csvContent, 'utf-8');
}


function legislatorsSupportOpposeCount(
  legislatorRepository: { getLegislatorById: (arg: number) => any },
  voteResultsRepository: {
    getAllVoteResults: () => any;
    getItemsWithLegislatorId: (arg: number) => any;
  }
): Result_1_Format[] {
  const allVoteResults = voteResultsRepository.getAllVoteResults();

  const result_1: Result_1_Format[] = allVoteResults.map(
    (voteResultItem: VoteResult) => {
      let num_supported_bills = 0;
      let num_opposed_bills = 0;
      const id = voteResultItem.legislator_id; // legislator id
      const legislator = legislatorRepository.getLegislatorById(
        voteResultItem.legislator_id
      );

      const voteInfosCount = voteResultsRepository.getItemsWithLegislatorId(
        voteResultItem.legislator_id
      );

      voteInfosCount.map((voteInfo: { vote_type: number }) => {
        if (voteInfo.vote_type === 1) {
          num_supported_bills += 1;
        } else {
          num_opposed_bills += 1;
        }
      });

      const obj = {
        id,
        name: legislator?.name || "",
        num_supported_bills,
        num_opposed_bills,
      };
      return obj;
    }
  );

  return result_1;
}

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

    const result_1: Result_1_Format[] = legislatorsSupportOpposeCount(
      legislatorRepository,
      voteResultsRepository
    );
    createLegislatorsSupportOpposeCountCsv("src/files/results/legislators-support-oppose-count.csv",result_1)

  } catch (error) {
    console.error("error loading csv files", error);
  }
}

main();
