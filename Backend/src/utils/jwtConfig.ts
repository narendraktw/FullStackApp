import * as jwt from 'jsonwebtoken';

export const generateToken = (
	userId: string,
	expiresIn: string,
	isRefreshToken = false
): string => {
	const secret = isRefreshToken
		? process.env.REFRESH_TOKEN_SECRET!
		: process.env.JWT_SECRET!;
	return jwt.sign({ userId }, secret, { expiresIn });
};

export const verifyToken = (token: string): any => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET!);
	} catch (error) {
		throw new Error('Invalid token');
	}
};
