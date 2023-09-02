import express, { Request, Response } from 'express';
import redisService from '../services/redisService';
import config from '../config';

export const redirectionController = express.Router();

redirectionController.route('/:hash')
    .get(async (req: Request, res: Response) => {
        const { hash } = req.params;

        try {
            const longUrl = await redisService.getValue(`${config.redirectUrl}/${hash}`);

            if (!longUrl) {
                return res.status(404).json({ message: 'URL does not exist' });
            }

            return res.status(301).redirect(longUrl);
        } catch (err) {
            if (err && err instanceof Error) {
                res.status(400);
                return res.json({ message: err.message });
            }
        }
    });
