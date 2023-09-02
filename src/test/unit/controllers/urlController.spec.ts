import request from 'supertest';
import { NextFunction, Request, Response } from 'express';
import urlService from '../../../services/urlService';
import { createServer } from '../../createServer';

import { urlController  } from '../../../controllers/urlController';
import { urls, url } from '../../mocks/urlsMock';

jest.mock('../../../services/urlService', () => ({
    getAllURLs: jest.fn(),
    getUrlById: jest.fn(),
    createURL: jest.fn(),
    deleteURL: jest.fn()
}));

jest.mock('../../../middleware/validator', () => ({
    validator: {
        body: () => {
            return (req: Request, res: Response, next: NextFunction) => {
                return next();
            };
        }
    }
}));

beforeEach(() => {
    jest.spyOn(urlService, 'getAllURLs').mockResolvedValue(urls);
    jest.spyOn(urlService, 'createURL').mockResolvedValue({} as any);
    jest.spyOn(urlService, 'deleteURL').mockResolvedValue({} as any);
    jest.spyOn(urlService, 'getUrlById').mockResolvedValue(url);
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('URL controller tests', () => {
    const app = createServer((application: any) => {
        application.use('/shortenize', urlController);
    });

    it('should get all urls', async () => {
        const response = await request(app)
            .get('/shortenize');

        expect(urlService.getAllURLs).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(urls);
    });

    // it('should create a new url', async () => {
    //     const response = await request(app)
    //         .post('/shortenize')
    //         .send({
    //             longUrl: 'http://google.com'
    //         });
    //
    //     console.log(response);
    //
    //     expect(true).toEqual(true);
    // });
});
