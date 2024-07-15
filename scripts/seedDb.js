import { User, Wallet } from '../src/model.js';

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
	// create tables
	await User.sync({ force: true });
	await Wallet.sync({ force: true });

	//insert data
	await Promise.all([
		User.create({
			id: 1,
			firstName: 'FirstName1',
			lastName: 'LastName1',
		}),
		User.create({
			id: 2,
			firstName: 'FirstName2',
			lastName: 'LastName2',
		}),
		Wallet.create({
			userId: 1,
			type: 'bitcoin',
			amount: 100,
		}),
	]);
}
