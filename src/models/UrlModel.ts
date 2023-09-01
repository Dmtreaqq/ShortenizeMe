import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../loaders/db';
import logger from '../middleware/logger';

export interface IURLModel extends Model<InferAttributes<IURLModel>, InferCreationAttributes<IURLModel>> {
  id: number;
  long_url: string;
}

export const UrlModel = sequelize.define<IURLModel>('url', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    long_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

UrlModel.sync().then(() => logger.info('DB Synchronization')).catch(err => logger.error(err));
