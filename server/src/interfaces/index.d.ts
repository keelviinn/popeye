import { Document } from 'mongoose';

export interface GeoLocationInterface extends Document {
	_id: string;
	label: string;
  type: string;
  features: object;
}