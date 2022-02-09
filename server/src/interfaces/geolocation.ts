import { Document } from 'mongoose';

export interface GeoLocation extends Document {
	_id: string;
	label: string;
  type: string;
  features: object;
};