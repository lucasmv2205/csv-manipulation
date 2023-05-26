import fs from "node:fs";
import csvParser from "csv-parser";
import { Bill } from "../entities/Bill";

export function parseBills(filePath: string): Promise<Bill[]> {
  return new Promise((resolve, reject) => {
    const bills: Bill[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        const id = Number(data.id);
        const title = data.title;
        const sponsor_id = Number(data.sponsor_id) ? Number(data.sponsor_id) :  "Unknown";
        const bill = new Bill(id, title, sponsor_id);
        bills.push(bill);
      })
      .on("end", () => {
        resolve(bills);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
