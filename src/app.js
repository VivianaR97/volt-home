import bodyParser from 'body-parser';
import express from 'express';

// Middlewares
import { getUser } from './middleware/getUser.js';

// API
import { getBTCPrice } from './coinGecko/api.js';

// Models
import { Wallet, sequelize } from './model.js';

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

/**
 * Buy an amount of bitcoin and uptade the user's wallet.
 *
 * @returns {Wallet}
 */
app.post('/api/buy', getUser, async (req, res) => {
	const user = req.user;
	const [bitcoinWallet] = await Wallet.findOrCreate({
		where: {
			userId: user.id,
			type: 'bitcoin',
		},
	});

	const { amount } = req.body;
	if (amount <= 0) return res.status(400).send('Invalid amount');

	bitcoinWallet.amount = bitcoinWallet.amount + amount;
	bitcoinWallet.save();
	res.json(bitcoinWallet);
});

/**
 * Sell an amount of bitcoin and uptade the user's wallet.
 *
 * @returns {Wallet}
 */
app.post('/api/sell', getUser, async (req, res) => {
	const user = req.user;
	const bitcoinWallet = await Wallet.findOne({
		where: {
			userId: user.id,
			type: 'bitcoin',
		},
	});
	if (!bitcoinWallet) return res.status(400).send('Wallet not found');

	const { amount } = req.body;
	if (amount <= 0) return res.status(400).send('Invalid amount');
	if (bitcoinWallet.amount < amount) return res.status(400).send('Not enough funds');

	bitcoinWallet.amount = bitcoinWallet.amount - amount;
	bitcoinWallet.save();
	res.json(bitcoinWallet);
});

/**
 * Get the amount of money in USD the user has in their wallet
 *
 * @returns {Wallet}
 */
app.get('/api/portfolio', getUser, async (req, res) => {
	const user = req.user;
	const bitcoinWallet = await Wallet.findOne({
		where: {
			userId: user.id,
			type: 'bitcoin',
		},
	});

	if (!bitcoinWallet) return 0;

	const btcPrice = await getBTCPrice();
	if (!btcPrice) return res.status(500).send('An error occurred, try again later');

	const response = {
		btcPrice,
		walletAmount: bitcoinWallet.amount,
		total: btcPrice * bitcoinWallet.amount,
	};
	res.json(response);
});

export { app };
