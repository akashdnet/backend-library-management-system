import { Types } from 'mongoose';

export type TBorrow = {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
};