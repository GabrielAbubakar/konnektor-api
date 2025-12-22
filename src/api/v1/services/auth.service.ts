import User, { IUser } from '@api/v1/models/user.model';
import { AppError } from '@api/utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (user: IUser, expires: any) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: expires,
    });
};

interface LoginInput {
    email: string;
    password: string;
}

class AuthService {
    login = async (input: LoginInput): Promise<{ user: IUser; token: string }> => {
        // check if user exists
        const existingUser = await User.findOne({ email: input.email }).select('+password');
        if (!existingUser) {
            throw new AppError('User does not exist', 404);
        }

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(input.password, existingUser.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid password', 401);
        }

        // generate token
        const token = generateToken(existingUser, '1h');

        return {
            user: existingUser,
            token,
        };
    };
}
export const authService = new AuthService();
