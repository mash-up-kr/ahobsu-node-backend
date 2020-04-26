import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Top extends Model {
	public readonly id!: number;

	public readonly closetImage!: string;
	public readonly storageImage!: string;
	public readonly variation!: string;
	public readonly DIY!: string;
	public readonly buy!: string;
	public readonly sell!: string;
	public readonly color1!: string;
	public readonly color2!: string;
	public readonly size!: string;
	public readonly source!: string;
	public readonly sourceNotes!: string;
	public readonly version!: string;
	public readonly style!: string;
	public readonly labelThemes!: string;
	public readonly catalog!: string;
	public readonly filename!: string;
	public readonly internalID!: string;
	public readonly uniqueEntryID!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Top.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		closetImage: { type: DataTypes.STRING },
		storageImage: { type: DataTypes.STRING },
		variation: { type: DataTypes.STRING },
		DIY: { type: DataTypes.STRING },
		buy: { type: DataTypes.STRING },
		sell: { type: DataTypes.STRING },
		color1: { type: DataTypes.STRING },
		color2: { type: DataTypes.STRING },
		size: { type: DataTypes.STRING },
		source: { type: DataTypes.STRING },
		sourceNotes: { type: DataTypes.STRING },
		version: { type: DataTypes.STRING },
		style: { type: DataTypes.STRING },
		labelThemes: { type: DataTypes.STRING },
		catalog: { type: DataTypes.STRING },
		filename: { type: DataTypes.STRING },
		internalID: { type: DataTypes.STRING },
		uniqueEntryID: { type: DataTypes.STRING },
	},
	{
		sequelize,
		modelName: 'top',
		tableName: 'tops',
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
	},
);

export const associate = (db: dbType) => { };

export default Top;
