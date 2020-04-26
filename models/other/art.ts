import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Art extends Model {
	public readonly id!: number;

	public readonly name!: string;
	public readonly realImageUrl!: string;
	public readonly fakeImageUrl!: string;
	public readonly realComment!: string;
	public readonly fakeComment!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Art.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
		},
		realImageUrl: {
			type: DataTypes.STRING,
		},
		fakeImageUrl: {
			type: DataTypes.STRING,
		},
		realComment: {
			type: DataTypes.STRING,
		},
		fakeComment: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: 'art',
		tableName: 'arts',
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
	},
);

export const associate = (db: dbType) => { };

export default Art;
