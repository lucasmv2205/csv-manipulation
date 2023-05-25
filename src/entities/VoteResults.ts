export class VoteResult {
  id: number;
  legislator_id: number;
  vote_id: number;
  vote_type: number;

  constructor(id: number, legislator_id: number,vote_id:number ,vote_type:number) {
    this.id = id;
    this.legislator_id = legislator_id;
    this.vote_id = vote_id;
    this.vote_type = vote_type;
  }
}
