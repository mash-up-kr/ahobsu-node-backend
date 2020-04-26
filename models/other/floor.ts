import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Floor extends Model {
	public readonly id!: number;

	public readonly name!: string;
	public readonly image!: string;
	public readonly VFX!: string;
	public readonly DIY!: string;
	public readonly buy!: string;
	public readonly sell!: string;
	public readonly color1!: string;
	public readonly color2!: string;
	public readonly source!: string;
	public readonly sourceNotes!: string;
	public readonly version!: string;
	public readonly HHAConcept1!: string;
	public readonly HHAConcept2!: string;
	public readonly tag!: string;
	public readonly catalog!: string;
	public readonly filename!: string;
	public readonly internalID!: string;
	public readonly uniqueEntryID!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Floor.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: { type: DataTypes.STRING },
		image: { type: DataTypes.STRING },
		VFX: { type: DataTypes.STRING },
		DIY: { type: DataTypes.STRING },
		buy: { type: DataTypes.STRING },
		sell: { type: DataTypes.STRING },
		color1: { type: DataTypes.STRING },
		color2: { type: DataTypes.STRING },
		source: { type: DataTypes.STRING },
		sourceNotes: { type: DataTypes.STRING },
		version: { type: DataTypes.STRING },
		HHAConcept1: { type: DataTypes.STRING },
		HHAConcept2: { type: DataTypes.STRING },
		HHASeries: { type: DataTypes.STRING },
		tag: { type: DataTypes.STRING },
		catalog: { type: DataTypes.STRING },
		filename: { type: DataTypes.STRING },
		internalID: { type: DataTypes.STRING },
		uniqueEntryID: { type: DataTypes.STRING },
	},
	{
		sequelize,
		modelName: 'floor',
		tableName: 'floors',
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
	},
);

export const associate = (db: dbType) => { };

export default Floor;
