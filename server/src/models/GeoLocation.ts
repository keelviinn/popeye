import { Schema, model } from 'mongoose';
import { GeoLocationInterface } from '../interfaces';

const GeoLocationSchema: Schema = new Schema({
	label: { type: String },
	type: { type: String },
  features: { type: Object }
}, { timestamps: true});

export const GeoLocation = model<GeoLocationInterface>('GeoLocation', GeoLocationSchema);
