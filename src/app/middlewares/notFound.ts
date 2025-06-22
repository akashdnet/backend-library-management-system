// src/middlewares/notFound.ts
import { RequestHandler } from 'express';

const notFound: RequestHandler = (req, res, next) => {

  res.status(404).json({
    success: false,
    message: 'API Not Found!',
    error: {
      path: req.originalUrl,
      details: `The route '${req.originalUrl}' you are trying to access does not exist.`,
    },
  });

  
};

export default notFound;