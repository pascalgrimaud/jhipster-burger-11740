import { Moment } from 'moment';

export interface IBeer {
  id?: number;
  name?: string;
  drinkDate?: Moment;
}

export class Beer implements IBeer {
  constructor(public id?: number, public name?: string, public drinkDate?: Moment) {}
}
