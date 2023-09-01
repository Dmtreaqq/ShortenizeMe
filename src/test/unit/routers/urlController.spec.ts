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
            isDeleted: false,
            age: 22,
            login: 'dmytro',
            password: 'hello12345'
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

    // it('should DELETE user by ID', async () => {
    //     const userId = 1;
    //
    //     const response = await request(app).delete(`/users/${userId}`);
    //
    //     expect(userService.deleteUser).toHaveBeenCalledWith(userId);
    //     expect(userService.deleteUser).toBeCalledTimes(1);
    //     expect(response.statusCode).toBe(200);
    //     expect(response.text)
    //         .toEqual(JSON.stringify({ message: `User with id ${userId} successfully deleted` }));
    // });
    //
    // it('should return 404 when user not found while DELETE user by ID', async () => {
    //     const userId = 1;
    //     jest.spyOn(userService, 'getUserById').mockResolvedValue(undefined);
    //
    //     const response = await request(app).delete(`/users/${userId}`);
    //
    //     expect(userService.deleteUser).toBeCalledTimes(0);
    //     expect(response.statusCode).toBe(404);
    //     expect(response.text)
    //         .toEqual(JSON.stringify({ message: `User with id ${userId} was not found` }));
    // });
    //
    // it('should GET user by ID', async () => {
    //     const userId = 1;
    //
    //     const response = await request(app).get(`/users/${userId}`);
    //
    //     expect(userService.getUserById).toHaveBeenCalledWith(userId);
    //     expect(userService.getUserById).toBeCalledTimes(1);
    //     expect(response.statusCode).toBe(200);
    // });
    //
    // it('should return 404 when GET user by ID not found', async () => {
    //     const userId = 1;
    //     jest.spyOn(userService, 'getUserById').mockResolvedValue(undefined);
    //
    //     const response = await request(app).get(`/users/${userId}`);
    //
    //     expect(userService.getUserById).toHaveBeenCalledWith(userId);
    //     expect(userService.getUserById).toBeCalledTimes(1);
    //     expect(response.statusCode).toBe(404);
    //     expect(response.text)
    //         .toEqual(JSON.stringify({ message: `User with id ${userId} was not found` }));
    // });
    //
    // it('should GET users method with default query params', async () => {
    //     const default_limit = '3';
    //     const default_filter = '';
    //
    //     const response = await request(app).get('/users');
    //
    //     expect(userService.getUsersByLogin).toHaveBeenCalledWith(default_filter, default_limit);
    //     expect(userService.getUsersByLogin).toBeCalledTimes(1);
    //     expect(response.statusCode).toBe(200);
    // });
    //
    // it('should GET users with LIMIT query param', async () => {
    //     const limit = '5';
    //     const default_filter = '';
    //
    //     const response = await request(app)
    //         .get('/users')
    //         .query({
    //             limit
    //         });
    //
    //     expect(userService.getUsersByLogin).toHaveBeenCalledWith(default_filter, limit);
    //     expect(userService.getUsersByLogin).toBeCalledTimes(1);
    //     expect(response.statusCode).toBe(200);
    // });
    //
    // it('should GET users with FILTER query param', async () => {
    //     const default_limit = '3';
    //     const filter = 'a';
    //
    //     const response = await request(app)
    //         .get('/users')
    //         .query({
    //             filter
    //         });
    //
    //     expect(userService.getUsersByLogin).toHaveBeenCalledWith(filter, default_limit);
    //     expect(userService.getUsersByLogin).toBeCalledTimes(1);
    //     expect(response.statusCode).toBe(200);
    // });
    //
    // it('should GET users with LIMIT and FILTER query param', async () => {
    //     const limit = '5';
    //     const filter = 'a';
    //
    //     const response = await request(app)
    //         .get('/users')
    //         .query({
    //             limit,
    //             filter
    //         });
    //
    //     expect(userService.getUsersByLogin).toHaveBeenCalledWith(filter, limit);
    //     expect(userService.getUsersByLogin).toBeCalledTimes(1);
    //     expect(response.statusCode).toBe(200);
    // });
});
