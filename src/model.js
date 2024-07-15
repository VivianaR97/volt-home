import Sequelize, { Model, STRING, DECIMAL, ENUM, DataTypes, UUID } from 'sequelize';

export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './database.sqlite3',
});

export class User extends Model {}
User.init(
	{
		id: {
			type: DECIMAL,
			primaryKey: true,
		},
		firstName: {
			type: STRING,
			allowNull: false,
		},
		lastName: {
			type: STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'User',
	},
);

export class Wallet extends Model {}
Wallet.init(
	{
		id: {
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: UUID,
			allowNull: false,
		},
		amount: {
			type: DECIMAL,
			allowNull: false,
			defaultValue: 0,
		},
		type: {
			type: ENUM('bitcoin'),
		},
	},
	{
		sequelize,
		modelName: 'Wallet',
	},
);

User.hasMany(Wallet, { as: 'Wallet', foreignKey: 'userId' });
