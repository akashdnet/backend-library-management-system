import { Request, Response, NextFunction } from 'express';
import { Book } from '../book/book.model';
import { Borrow } from './borrow.model';
import { TBorrow } from './borrow.interface';



//Borrow Book
const borrowBook = async (req: Request, res: Response, next:NextFunction) => {


  try {

    const borrowData:TBorrow = req.body;


    const data: TBorrow = {
      book: borrowData.book,
      quantity: borrowData.quantity,
      dueDate: borrowData.dueDate
    };


    if(!data.book){
      res.status(400).json({
        message: 'Book(ID) field data is empty.',
        success: false,
        error: "Missing book input filed."
      });
      return
    }



    const book = await Book.findById(data.book);
    if(!book){
       res.status(404).json({
          success: false,
          message: 'Book not found!',
      });
      return
    }



    if(!book.available || book.copies < data.quantity){
       res.status(400).json({
        success: false,
        message: 'Not enough copies available to borrow!',
      });
      return
    }



    book.copies -= data.quantity;
    // if (book.copies <= 0) {
    //   book.available = false;
    // }
    await book.save();


    
    const borrowDataRecord = await Borrow.create(data);



    res.status(200).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrowDataRecord,
    });

  } catch (err: any){


    next(err)
  }


};








//Borrowed Books Summary
const getBorrowedSummary = async (req: Request, res: Response,next:NextFunction) => {

  try {


    
    const result = await Borrow.aggregate([
      { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
      { $lookup: { from: 'books', localField: '_id', foreignField: '_id', as: 'bookDetails' } },
      { $unwind: '$bookDetails' },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: { title: '$bookDetails.title', isbn: '$bookDetails.isbn' },
        },
      },
    ]);

    res.status(200).json({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data: result,
      });



  } catch (err: any) {
    next(err)
  }
};



















export const BorrowController = {
    borrowBook,
    getBorrowedSummary,
}