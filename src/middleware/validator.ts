import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';
import { URL } from '../types/URL';

export const validator = createValidator();

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: URL
}
