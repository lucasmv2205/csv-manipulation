export class Bill {
  id: number;
  title: string;
  sponsor_id: number | string;

  constructor(id: number, title: string, sponsor_id: number | string) {
    this.id = id;
    this.title = title;
    this.sponsor_id = sponsor_id;
  }
}
