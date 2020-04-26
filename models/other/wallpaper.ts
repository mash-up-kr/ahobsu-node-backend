import { DataTypes, Model } from 'sequelize';
import { dbType } from '../index';
import { sequelize } from '../sequelize';

class Wallpaper extends Model {
	public readonly id!: number;

	public readonly name!: string;
	public readonly image!: string;
	public readonly VFX!: string;
	public readonly VFXType!: string;
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
	public readonly HHASeries!: string;
	public readonly interact!: string;
	public readonly tag!: string;
	public readonly catalog!: string;
	public readonly filename!: string;
	public readonly internalID!: string;
	public readonly uniqueEntryID!: string;
	public readonly windowType!: string;
	public readonly windowColor!: string;
	public readonly paneType!: string;
	public readonly curtainType!: string;
	public readonly curtainColor!: string;
	public readonly ceilingType!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Wallpaper.init(
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
		VFXType: { type: DataTypes.STRING },
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
		interact: { type: DataTypes.STRING },
		tag: { type: DataTypes.STRING },
		catalog: { type: DataTypes.STRING },
		filename: { type: DataTypes.STRING },
		internalID: { type: DataTypes.STRING },
		uniqueEntryID: { type: DataTypes.STRING },
		windowType: { type: DataTypes.STRING },
		windowColor: { type: DataTypes.STRING },
		paneType: { type: DataTypes.STRING },
		curtainType: { type: DataTypes.STRING },
		curtainColor: { type: DataTypes.STRING },
		ceilingType: { type: DataTypes.STRING },
	},
	{
		sequelize,
		modelName: 'wallpaper',
		tableName: 'wallpapers',
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
	},
);

export const associate = (db: dbType) => { };

export default Wallpaper;
