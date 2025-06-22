import { Model } from 'mongoose';

export type TGenre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

export type TBook = {
  title: string;
  author: string;
  genre: TGenre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
};



export interface BookModel extends Model<TBook> {
  isBookExists(id: string): Promise<TBook>;
}