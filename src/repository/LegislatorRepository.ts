import { parseLegislators } from "../csvParser/legislatorParser";
import { Legislator } from "../entities/Legislator";

export class LegislatorRepository {
  private legislators: Legislator[];

  constructor() {
    this.legislators = [];
  }

  async loadLegislators(filePath: string): Promise<void> {
    try {
      this.legislators = await parseLegislators(filePath);
    } catch (error) {
      throw new Error('error loading legislators: ' + error);
    }
  }

  getAllLegislators(): Legislator[] {
    return this.legislators;
  }

  getLegislatorById(id: number): Legislator | undefined {
    return this.legislators.find((legislator) => legislator.id === id);
  }
}
