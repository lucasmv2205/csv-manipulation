export class Vote {
  id: number;
  bill_id: number;

  constructor(id: number, bill_id: number) {
    this.id = id;
    this.bill_id = bill_id;
  }
}
