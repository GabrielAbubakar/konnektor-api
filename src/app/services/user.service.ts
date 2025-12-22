import User, { IUser } from '@/app/models/user.model';
import { AppError } from '@/app/utils';

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

class UserService {
    createUser = async (input: CreateUserInput): Promise<IUser> => {
        const existingUser = await User.findOne({ email: input.email });

        if (existingUser) {
            throw new AppError('User already exists', 409);
        }

        const user = await User.create(input);
        return user;
    };

    findUserByEmail = async (email: string): Promise<IUser | null> => {
        return User.findOne({ email }).select('+password');
    };
}
export const userService = new UserService();
