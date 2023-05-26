export class Bill {
  id: number;
  title: string;
  sponsor_id: number;

  constructor(id: number, title: string, sponsor_id: number) {
    this.id = id;
    this.title = title;
    this.sponsor_id = sponsor_id;
  }
}
