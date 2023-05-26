import fs from 'node:fs';
import csvParser from 'csv-parser';
import { Vote } from '../entities/Vote';

export function parseVotes(filePath: string): Promise<Vote[]> {
  return new Promise((resolve, reject) => {
    const votes: Vote[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        const id = Number(data.id);
        const billId = Number(data.bill_id);
        const vote = new Vote(id, billId);
        votes.push(vote);
      })
      .on('end', () => {
        resolve(votes);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
