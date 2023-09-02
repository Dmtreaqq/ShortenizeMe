import request from 'supertest';
import { NextFunction, Request, Response } from 'express';
import urlService from '../../../services/urlService';
import { createServer } from '../../createServer';
import { urlController  } from '../../../controllers/urlController';
import { urls, url } from '../../mocks/urlsMock';

jest.mock('../../../services/urlService', () => ({
    getUsersByLogin: jest.fn(),
    getUserById: jest.fn(),
    postUser: jest.fn(),
    deleteUser: jest.fn()
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

describe('URL router tests', () => {
    const app = createServer((application: any) => {
        application.use('/urls', urlController);
    });

    it('should POST url', async () => {
        const generatedId = 1;
        const urlWithoutId = {
            longUrl: 'http://google.com'
        };

        const response = await request(app)
            .post('/urls')
            .send(urlWithoutId);

        expect(urlService.createURL).toHaveBeenCalledWith(expect.objectContaining(urlWithoutId));
        expect(urlService.createURL).toBeCalledTimes(1);
        expect(response.statusCode).toBe(201);
        expect(response.text)
            .toEqual(JSON.stringify({ message: `User with id ${generatedId} successfully created` }));
    });
});
