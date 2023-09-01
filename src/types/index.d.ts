import { URL } from './URL';

declare global {
    namespace Express {
        export interface Request {
            customUrl: URL
        }
    }
}
