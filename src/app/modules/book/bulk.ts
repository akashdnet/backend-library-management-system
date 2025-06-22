import { Book } from './book.model';

const books = []







export const insertBooks = async () => {
  try {
    // Insert books in MongoDB
    // const result = await Book.insertMany(books);
    console.log('Books inserted successfully:');
  } catch (error) {
    console.error('Error inserting books:', error);
  }
};





