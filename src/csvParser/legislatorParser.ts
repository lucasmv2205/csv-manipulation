import fs from 'fs';
import csvParser from 'csv-parser';
import { Legislator } from '../entities/Legislator';

export function parseLegislators(filePath: string): Promise<Legislator[]> {
  return new Promise((resolve, reject) => {
    const legislators: Legislator[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        const id = Number(data.id);
        const name = data.name;
        const legislator = new Legislator(id, name);
        legislators.push(legislator);
      })
      .on('end', () => {
        resolve(legislators);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
