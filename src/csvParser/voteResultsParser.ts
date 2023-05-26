import fs from 'node:fs';
import csvParser from 'csv-parser';
import { VoteResult } from '../entities/VoteResults';

export function parseVoteResults(filePath: string): Promise<VoteResult[]> {
  return new Promise((resolve, reject) => {
    const voteResuts: VoteResult[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        const id = Number(data.id);
        const legislator_id = Number(data.legislator_id);
        const vote_id = Number(data.vote_id);
        const vote_type = Number(data.vote_type);
        const voteResult = new VoteResult(id, legislator_id, vote_id, vote_type);
        voteResuts.push(voteResult);
      })
      .on('end', () => {
        resolve(voteResuts);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
