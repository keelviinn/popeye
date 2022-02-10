import React from 'react';
import { TileLayer, MapContainer, GeoJSON } from 'react-leaflet';
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";

import 'leaflet/dist/leaflet.css';

import { LeafletIcon } from '../LeafletIcon';
import * as S from './MapContainer.styles';

export function Map({ position, time, route, geoJson }: MapContainerProps) {
  return (
    <S.MapWrapper>
      <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <ReactLeafletDriftMarker position={position} duration={time.value * 1000} keepAtCenter={true} icon={LeafletIcon(route)} />
        { geoJson && <GeoJSON style={{ color: 'green' }} data={geoJson} /> }
      </MapContainer>
    </S.MapWrapper>
  );
}