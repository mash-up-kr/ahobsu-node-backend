import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Poster extends Model {
	public readonly id!: number;

	public readonly name!: string;
	public readonly image!: string;
	public readonly buy!: string;
	public readonly size!: string;
	public readonly sell!: string;
	public readonly color1!: string;
	public readonly color2!: string;
	public readonly source!: string;
	public readonly sourceNotes!: string;
	public readonly version!: string;
	public readonly filename!: string;
	public readonly internalID!: string;
	public readonly uniqueEntryID!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Poster.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: { type: DataTypes.STRING },
		image: { type: DataTypes.STRING },
		buy: { type: DataTypes.STRING },
		size: { type: DataTypes.STRING },
		sell: { type: DataTypes.STRING },
		color1: { type: DataTypes.STRING },
		color2: { type: DataTypes.STRING },
		source: { type: DataTypes.STRING },
		sourceNotes: { type: DataTypes.STRING },
		version: { type: DataTypes.STRING },
		filename: { type: DataTypes.STRING },
		internalID: { type: DataTypes.STRING },
		uniqueEntryID: { type: DataTypes.STRING },
	},
	{
		sequelize,
		modelName: 'poster',
		tableName: 'posters',
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
	},
);

export const associate = (db: dbType) => { };

export default Poster;
