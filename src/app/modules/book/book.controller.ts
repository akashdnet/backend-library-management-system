import { Request, Response, NextFunction } from 'express';
import { Book } from './book.model';
import { TBook } from './book.interface'


//Create a Book
const createBook = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const bookData = req.body;

    const data :TBook = {
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        isbn: bookData.isbn,
        description: bookData?.description,
        copies: bookData.copies,
        available: (bookData.copies < 1)? false:true
    }


    const result = await Book.create(data);

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });

  } catch (err: any) {

    next(err)
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'Failed to create book',
    //   error: err,
    // });

  }

};







//Get All Books 
const getAllBooks = async (req: Request, res: Response, next:NextFunction) => {


  try {

    let { filter, sortBy, sort, limit = 10, page = 1 } = req.query;
  
    const filterQuery: Record<string, unknown> = {};

    if (filter) {
      filterQuery.genre = filter;
    }

    
    const sortOptions: Record<string, 1 | -1> = {};
    if (sortBy && (sort === 'asc' || sort === 'desc')){
      sortOptions[sortBy as string] = sort === 'asc' ? 1 : -1;
    } else {
      sortOptions.createdAt = -1; 
    }


    
    page  = (Number(page)>0)? ((Number(page)-1)*Number(limit)):0


    const result = await Book.find(filterQuery).sort(sortOptions).limit(Number(limit)).skip(Number(page)).select('-__v')



    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      length: result.length,
      data: result,

    });


  } catch (err: any) {
    
    next(err)
  }
};







//Get a Single Book
const getSingleBook = async (req: Request, res: Response, next:NextFunction) => {


    try {


        const {bookId} = req.params;
        const result = await Book.isBookExists(bookId);
        
        if(!result){
            res.status(404).json({ success: false, message: 'Book not found' });
            return;
        }


        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: result,
        });


    } catch (err: any) {

        next(err)
    }
};






//Update a Book
const updateBook = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const {bookId} = req.params;
    const book = await Book.isBookExists(bookId);

    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }


    const updateData = req.body;



    const data :TBook = {
        title: updateData.title,
        author: updateData.author,
        genre: updateData.genre,
        isbn: updateData.isbn,
        description: updateData?.description,
        copies: updateData.copies,
        available: (updateData.copies < 1)? false:true
    }





    const result = await Book.findByIdAndUpdate(bookId, data, { new: true, runValidators: true}).select('-__v');;



    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: result,
    });




  } catch (err: any) {
    next(err)
  }



};






//Delete a Book
const deleteBook = async (req: Request, res: Response, next:NextFunction) => {

  try {

    const {bookId} = req.params;
    const book = await Book.isBookExists(bookId);
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }

    
    await Book.findByIdAndDelete(bookId);



    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null, 
    });


  } catch (err: any) {
    
    next(err)

  }


};















export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook, 
  deleteBook, 
};