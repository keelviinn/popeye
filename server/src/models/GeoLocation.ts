import { Schema, model } from 'mongoose';
import * as I from '../interfaces';

const GeoLocationSchema: Schema = new Schema({
	label: { type: String },
	type: { type: String },
  features: { type: Object }
}, { timestamps: true});

export const GeoLocation = model<I.GeoLocation>('GeoLocation', GeoLocationSchema);
