import UrlDataMapperService from './urlDataMapperService';
import UrlRepository from '../repositories/urlRepository';
import { URL } from '../types/URL';
import { UrlModel } from '../models';
import logger from '../middleware/logger';

const urlRepository = new UrlRepository(UrlModel, UrlDataMapperService);
class UrlService {
    async getUrlById(id: number): Promise<URL | undefined> {
        try {
            const url = await urlRepository.findURLById(id);
            if (!url) {
                throw new Error('There is no such url');
            }

            return url;
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.stack);
            }
        }
    }

    async getAllURLs(): Promise<URL[] | undefined> {
        try {
            return await urlRepository.findAllURLs();
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err);
                throw new Error(err.message);
            }
        }
    }

    async createURL(url: URL): Promise<URL | void> {
        try {
            return urlRepository.createURL(url);
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.message);
                throw new Error(err.message);
            }
        }
    }

    async deleteURL(id: number) {
        try {
            await urlRepository.removeURL(id);
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.message);
            }
        }
    }
}

export default new UrlService();
