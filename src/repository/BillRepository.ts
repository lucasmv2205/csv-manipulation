import { parseBills } from "../csvParser/billParser";
import { Bill } from "../entities/Bill";

export class BillRepository {
  private bills: Bill[];

  constructor() {
    this.bills = [];
  }

  async loadBills(filePath: string): Promise<void> {
    try {
      this.bills = await parseBills(filePath);
    } catch (error) {
      throw new Error('error loading bills: ' + error);
    }
  }

  getAllBills(): Bill[] {
    return this.bills;
  }

  getBillById(id: number): Bill | undefined {
    return this.bills.find((bill) => bill.id === id);
  }
}
