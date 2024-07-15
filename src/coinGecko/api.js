import fetch from 'node-fetch';

export const getBTCPrice = async () => {
	try {
		const result = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
		const data = (await result.json()).data;
		return data.amount;
	} catch (error) {
		console.error('Error getting BTC price:', error);
		return null;
	}
};
