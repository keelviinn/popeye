import React from 'react';
import Leaflet from 'leaflet';

import { CarIcon, ManIcon } from '../../assets';

export function LeafletIcon({ value }: Route) {
  return Leaflet.icon({
    iconUrl: value === 'Go to lunch' ? ManIcon : CarIcon,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });
}