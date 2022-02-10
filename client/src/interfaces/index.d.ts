interface Position {
  lat: number;
  lng: number;
};

interface Route {
  label: string;
  value: string;
};

interface Time {
  label: string;
  value: number;
};

interface FormProps {
  handleStart: (e: any) => Promise<void>;
  setGeoJson: (data: any) => void;
  setRoute: (route: Route) => void;
  setTime: (time: Time) => void;
  route: Route;
  time: Time;
}

interface MapContainerProps {
  position: Position;
  geoJson: any;
  route: Route;
  time: Time;
}