// src/modules/Book/book.model.ts
import { Schema, model } from "mongoose";
import { TBook, BookModel, TGenre } from "./book.interface";
import { Borrow } from "../borrow/borrow.model";

const genreList: TGenre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];



const bookSchema = new Schema<TBook, BookModel>(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
    },
    genre: {
      type: String,
      enum: {
        values: genreList,
        message: 'Genre must be one of the allowed values',
      },
      required: [true, 'Genre is required'],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, 'Number of copies is required'],
      min: [0, 'Number of copies cannot be negative'],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);





bookSchema.statics.isBookExists= async function (id: string) {

  return await Book.findById(id).select('-__v');;

};





bookSchema.pre('save', function(next) {


  if (this.copies < 0){
    const err = new Error('Quantity must be greater than zero');
    next(err);

  } else if (this.copies == 0) {
    this.available = false;
  }
  next();
});

















export const Book = model<TBook, BookModel>("Book", bookSchema);
