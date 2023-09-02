import express, { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import Hashids from 'hashids/cjs';
import { UserRequestSchema, validator } from '../middleware/validator';
import { URLValidationSchema } from '../schemas/URL';
import { URL } from '../types/URL';
import urlService from '../services/urlService';
import redisService from '../services/redisService';
import config from '../config';

export const urlController = express.Router();
const hashids = new Hashids('ShortenizeMe', 5);

urlController.param('id', async (req: Request, res: Response, next, id) => {
    const url = await urlService.getUrlById(id);

    if (url) req.customUrl = url;
    else {
        res.status(404);
        return res.json({ message: `URL with id ${id} was not found` });
    }
    next();
});

urlController.route('/')
    .get(async (req: Request, res: Response) => {
        try {
            const urls = await urlService.getAllURLs();

            return res.json(urls);
        } catch (err) {
            if (err && err instanceof Error) {
                res.status(400);
                return res.json({ message: err.message });
            }
        }
    })
    .post(validator.body(URLValidationSchema),
        async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
            const url: URL = { ...req.body };
            try {
                const createdUrl = await urlService.createURL(url);
                if (createdUrl && createdUrl.id) {
                    const hash = hashids.encode(createdUrl.id);
                    const shortUrl = `${config.redirectUrl}/${hash}`;

                    await redisService.setValue(shortUrl, createdUrl.longUrl);

                    res.status(201);
                    return res.json({ ...createdUrl, shortUrl });
                }
            } catch (err) {
                if (err && err instanceof Error) {
                    res.status(400);
                    return res.json({ message: err.message });
                }
            }
        });

urlController.route('/:id')
    .get(async (req: Request, res: Response) => {
        const urlById = req.customUrl;

        return res.json(urlById);
    })
    .delete(async (req: Request, res: Response) => {
        const urlById = req.customUrl;
        const { id } = urlById;

        await urlService.deleteURL(id);

        return res.json({ message: `User with id ${id} successfully deleted` });
    });
