// Models
import { User } from '../model.js';

export const getUser = async (req, res, next) => {
	const userId = req.get('userId');
	if (!userId) return res.status(401).end();

	const user = await User.findOne({ where: { id: userId } });
	if (!user) return res.status(401).end();

	req.user = user;
	next();
};
