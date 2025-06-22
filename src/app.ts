import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './app/modules/book/book.route';
import { BorrowRoutes } from './app/modules/borrow/borrow.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();


app.use(express.json());
app.use(cors());



app.use('/api/books', BookRoutes); 
app.use('/api/borrow', BorrowRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Backend of Library Management System');
});


app.use(notFound)



app.use(globalErrorHandler);



export default app;