import { ModelStatic } from 'sequelize';
import { IURLModel } from '../models/UrlModel';
import EntityDataMapperService from '../services/entityDataMapperService';
import { URL } from '../types/URL';

export default class UrlRepository {
    private model: ModelStatic<IURLModel>;
    private mapper: EntityDataMapperService;

    constructor(urlModel: ModelStatic<IURLModel>, urlMapper: EntityDataMapperService) {
        this.model = urlModel;
        this.mapper = urlMapper;
    }

    async findAllURLs(): Promise<URL[]> {
        const urls = await this.model.findAll();

        return urls.map(this.mapper.toService);
    }

    async findURLById(id: number): Promise<URL> {
        const url = await this.model.findByPk(id);
        return this.mapper.toService(url);
    }

    async createURL(url: URL): Promise<URL> {
        const dbUrl = await this.model.create(this.mapper.toDataBase(url));
        return this.mapper.toService(dbUrl);
    }

    async removeURL(id: number): Promise<void> {
        const url = await this.model.findByPk(id);
        await url?.destroy();
    }
}
