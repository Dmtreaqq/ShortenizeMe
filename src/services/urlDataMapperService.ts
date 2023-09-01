import { IURLModel } from '../models/UrlModel';
import { URL } from '../types/URL';
import EntityDataMapperService from './entityDataMapperService';

class UrlDataMapperService extends EntityDataMapperService {
    toService(dbUrl: IURLModel): URL | null {
        if (dbUrl === null) {
            return null;
        }

        return {
            id: dbUrl.id,
            longUrl: dbUrl.long_url
        };
    }

    toDataBase(url: URL) {
        return {
            long_url: url.longUrl
        };
    }
}

export default new UrlDataMapperService();
