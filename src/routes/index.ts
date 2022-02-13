import { Router, Request, Response } from 'express';
import path from 'path';
import knex from '../config/db';

interface wordIF {
    id: number;
    word: string;
}

const router = Router();

router
.get('/', (req: Request, res: Response) => { res.sendFile('index.html', { root: path.join(__dirname, '../public/html')}); })
.post('/word', async (req: Request, res: Response) => {
    const { word, field } = req.body;

    let words: Array<wordIF>;

    switch(field) {
        case 'S':
            words = await knex("word").where('word', 'like', `${word}%`);
            break;
        case 'E':
            words = await knex("word").where('word', 'like', `%${word}`);
            break;
        default:
            words = [];
    }

    res.status(200).json({ success: true, words });
})

.post('/learn', async (req: Request, res: Response) => {
    const { word } = req.body;
    const [w]: Array<wordIF> = await knex("word").where({ word: word });
    if(w) {
        return res.status(200).json({ success: true });
    }
    await knex("word").insert({ word: word })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ success: false });
    });
    res.status(200).json({ success: true });
})

export default router;