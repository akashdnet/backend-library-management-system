import mongoose from 'mongoose';
import app from './app'
import config from './app/config';
import { Server } from 'http';
import { insertBooks } from './app/modules/book/bulk';

let server: Server;






async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Successfully connected to DB...');

    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });



    // await insertBooks()
  } catch (error) {
    console.error('Failed to connect to DB', error);
  }
}

main();