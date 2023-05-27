import fs from "node:fs";
import { VoteRepository } from "./repository/VoteRepository";
import { BillRepository } from "./repository/BillRepository";
import { LegislatorRepository } from "./repository/LegislatorRepository";
import { VoteResultsRepository } from "./repository/VoteResultsRepository";
import { VoteResult } from "./entities/VoteResults";
import { Bill } from "./entities/Bill";
import { Legislator } from "./entities/Legislator";

interface Result_1_Format {
  id: number;
  name: string;
  num_supported_bills: number;
  num_opposed_bills: number;
}

interface Result_2_Format {
  id: number;
  title: string;
  supporter_count: number;
  opposer_count: number;
  primary_sponsor: string | number;
}

// csvCreate
function createLegislatorsSupportOpposeCountCsv(
  fileName: string,
  data: Result_1_Format[]
): void {
  const header = "id,name,num_supported_bills,num_opposed_bills\n";
  let csvContent = header;

  for (const { id, name, num_supported_bills, num_opposed_bills } of data) {
    const row = `${id},"${name}",${num_supported_bills},${num_opposed_bills}\n`;
    csvContent += row;
  }

  fs.writeFileSync(fileName, csvContent, "utf-8");
}
// csvCreate
function createBillsSupportOpposeCountCsv(
  fileName: string,
  data: Result_2_Format[]
): void {
  const header = "id,title,supporter_count,opposer_count,primary_sponsor\n";
  let csvContent = header;

  for (const {
    id,
    title,
    supporter_count,
    opposer_count,
    primary_sponsor,
  } of data) {
    const row = `${id},"${title}",${supporter_count},${opposer_count},"${primary_sponsor}"\n`;
    csvContent += row;
  }

  fs.writeFileSync(fileName, csvContent, "utf-8");
}

async function main() {
  const start = new Date();
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

    const result_1: Result_1_Format[] =
      legislatorRepository.calculateSupportOpposeCounts(
        legislatorRepository,
        voteResultsRepository
      );
    createLegislatorsSupportOpposeCountCsv(
      "src/files/results/legislators-support-oppose-count.csv",
      result_1
    );

    const result_2: Result_2_Format[] = billRepository.calculateSupportOpposeCounts(
      voteRepository,
      billRepository,
      legislatorRepository,
      voteResultsRepository
    );
    createBillsSupportOpposeCountCsv("src/files/results/bills.csv", result_2);
  } catch (error) {
    console.error("error loading csv files", error);
  }
  const end = new Date();
  const time = end.getMilliseconds() - start.getMilliseconds();
  console.log(time);
}

main();
