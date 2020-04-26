import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Tool extends Model {
	public readonly id!: number;

	public readonly name!: string;
	public readonly image!: string;
	public readonly variation!: string;
	public readonly bodyTitle!: string;
	public readonly DIY!: string;
	public readonly customize!: string;
	public readonly kitCost!: string;
	public readonly buy!: string;
	public readonly sell!: string;
	public readonly color1!: string;
	public readonly color2!: string;
	public readonly size!: string;
	public readonly sets!: string;
	public readonly source!: string;
	public readonly sourceNotes!: string;
	public readonly version!: string;
	public readonly filename!: string;
	public readonly variantID!: string;
	public readonly internalID!: string;
	public readonly uniqueEntryID!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Tool.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: { type: DataTypes.STRING },
		image: { type: DataTypes.STRING },
		variation: { type: DataTypes.STRING },
		bodyTitle: { type: DataTypes.STRING },
		DIY: { type: DataTypes.STRING },
		customize: { type: DataTypes.STRING },
		kitCost: { type: DataTypes.STRING },
		buy: { type: DataTypes.STRING },
		sell: { type: DataTypes.STRING },
		color1: { type: DataTypes.STRING },
		color2: { type: DataTypes.STRING },
		size: { type: DataTypes.STRING },
		sets: { type: DataTypes.STRING },
		source: { type: DataTypes.STRING },
		sourceNotes: { type: DataTypes.STRING },
		version: { type: DataTypes.STRING },
		filename: { type: DataTypes.STRING },
		variantID: { type: DataTypes.STRING },
		internalID: { type: DataTypes.STRING },
		uniqueEntryID: { type: DataTypes.STRING },
	},
	{
		sequelize,
		modelName: 'tool',
		tableName: 'tools',
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
	},
);

export const associate = (db: dbType) => { };

export default Tool;
