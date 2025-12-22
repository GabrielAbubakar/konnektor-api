import { IUser } from '../api/v1/models/user.model';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
