import { GeoLocation } from "../models";

import { lunch, popeyeVillageBalluta } from '../assets';

export const seedDatabase = async () => {
  if (!await GeoLocation.findOne({ label: "Go to work" })) {
    await GeoLocation.create({ label: "Go to work", ...popeyeVillageBalluta })
    console.log("Database seeded: Go to work");
  }
  if (!await GeoLocation.findOne({ label: "Go to lunch" })) {
    await GeoLocation.create({ label: "Go to lunch", ...lunch })
    console.log("Database seeded: Go to lunch");
  }
  if (!await GeoLocation.findOne({ label: "Go to home" })) {
    const coordinates = popeyeVillageBalluta.features[0].geometry.coordinates.reverse();
    const returnRoute = { ...popeyeVillageBalluta, features: [{ ...popeyeVillageBalluta.features[0], geometry: { type: "LineString", coordinates } }] };
    await GeoLocation.create({ label: "Go to home", ...returnRoute });
    console.log("Database seeded: Go to home");
  }
}