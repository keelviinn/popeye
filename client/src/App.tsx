import { useEffect, useState } from 'react';

import socket from './config/socket';
import { Map } from './components/MapContainer';
import { routesFieldsStates } from './components/Form/Form.constants';

import { Form } from './components/Form';

function App() {
  const [position, setPosition] = useState<Position>();
  const [geoJson, setGeoJson] = useState<any>();
  const [route, setRoute] = useState<Route>(routesFieldsStates[0]);
  const [time, setTime] = useState<Time>({ label: '5 sec', value: 5 });

  useEffect(() => {
    route && socket.emit('get-geolocation', { time: time.value, routeLabel: route.value });
  }, [route]);

  useEffect(() => {
    time && socket.emit('set-time', { time: time.value });
  }, [time]);

  useEffect(() => {
    socket.on('set-geolocation', (data: any) => data && setGeoJson(data))
    socket.on('set-position', ([lng, lat]) => lng && lat && setPosition({ lat, lng }));
  }, []);

  const handleStart = async (e: any) => {
    e.preventDefault();
    route && socket.emit('start-navigation', { time: time.value, routeLabel: route.value });
  }

  return (
    <>
      <Form
        route={route}
        time={time}
        setTime={setTime}
        setRoute={setRoute}
        handleStart={handleStart}
        setGeoJson={setGeoJson}
      />

      { position && <Map route={route} position={position} geoJson={geoJson} time={time} /> }
    </>
  );
}

export default App;