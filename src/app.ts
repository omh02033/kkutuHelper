import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import router from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());

app.use('/', router);

export default app;