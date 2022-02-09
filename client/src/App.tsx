import React, { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import {TileLayer, MapContainer, GeoJSON } from 'react-leaflet';
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import Select from 'react-select';

import socket from './config/socket';
import 'leaflet/dist/leaflet.css';
import mapPackage from './assets/package.svg';

import './App.css';

const mapPackageIcon = Leaflet.icon({
  iconUrl: mapPackage,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

type Position = {
  lat: number;
  lng: number;
};

type Route = {
  label: string;
  value: string;
};

type Time = {
  label: string;
  value: number;
};

const routes: Route[] = [
  { label: 'Go to work', value: 'Go to work'},
  { label: 'Go to lunch', value: 'Go to lunch' },
  { label: 'Go to home', value: 'Go to home' },
];

function App() {
  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState<Position>({
    lat: 35.96093506939264,
    lng: 14.340945482254028
  });
  const [geoJson, setGeoJson] = useState<any>();
  const [route, setRoute] = useState<Route>(routes[0]);
  const [time, setTime] = useState<Time>({ label: '5 sec', value: 5 });

  console.log(running);

  useEffect(() => {
    route && socket.emit('get-geolocation', { time: time.value, routeLabel: route.value });
  }, [route]);

  useEffect(() => {
    time && socket.emit('set-time', { time: time.value });
  }, [time]);

  useEffect(() => {
    socket.on('set-geolocation', (data: any) => { 
      console.log(data)
      data && setGeoJson(data) 
    })

    socket.on('set-position', ([lng, lat]) => {
      console.log(lng, lat)
      lng && lat && setPosition({ lat, lng })
    });
  }, []);

  const handleStart = async (e: any) => {
    e.preventDefault();
    setRunning(true);
    route && socket.emit('start-navigation', { time: time.value, routeLabel: route.value });
  }

  return (
    <div id="page-map">
      <main>
        <form onSubmit={handleStart} className="landing-page-form">
          <fieldset>
            <legend>Popeye road map</legend>

            <div className="input-block">
              <label htmlFor="address">Route</label>
              <Select
                placeholder="Select the route to process"
                classNamePrefix="filter"
                value={route}
                // isDisabled={running}
                options={routes}
                onChange={(event) => { setGeoJson(null); setRoute(event as Route)}}
              />
            </div>

            <div className="input-block">
              <label htmlFor="address">Time</label>
              <Select
                placeholder="Select the time to process"
                classNamePrefix="filter"
                value={time}
                // isDisabled={running}
                options={[
                  { label: '1 sec', value: 1 },
                  { label: '5 sec', value: 5 },
                  { label: '10 sec', value: 10 },
                ]}
                onChange={(event) => setTime(event as Time)}
              />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Start
          </button>
        </form>
      </main>

      { position && (
        <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <ReactLeafletDriftMarker position={position} duration={time.value * 1000} keepAtCenter={true} icon={mapPackageIcon} />
          { geoJson && <GeoJSON style={{ color: 'green' }} data={geoJson}  /> }
        </MapContainer>
      ) }
    </div>
  );
}

export default App;