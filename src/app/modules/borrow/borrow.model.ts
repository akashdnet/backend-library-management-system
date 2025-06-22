import { Schema, model } from "mongoose";
import { TBorrow } from "./borrow.interface";
import GenericError from "../../middlewares/GenericError";
import { Book } from "../book/book.model";

const borrowSchema = new Schema<TBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "A book reference is required for borrowing."],
    },
    quantity: {
      type: Number,
      required: [true, "Borrow quantity is required."],
      min: [1, "Borrow quantity must be at least 1."],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required for the borrowed book."],
    },
  },
  {
    timestamps: true,
  }
);







borrowSchema.post('save', async function(doc, next) {
    try {

      // console.log("post middleware check")
        const borrowedBook = await Book.findById(doc.book);
        
        if (borrowedBook) {

            if (borrowedBook.copies == 0) {
                borrowedBook.available = false;
            }

            await borrowedBook.save();
        } else {
            throw new GenericError('Book not found during post-save middleware.', 500);
        }

    } catch (error) {
        
        console.error('Error in post-save hook of Borrow model:', error);
    }

    next();
});





export const Borrow = model<TBorrow>("Borrow", borrowSchema);
