import styles from 'styled-components/macro';

export const MapWrapper = styles.div`
  width: 100vw;
  height: 100vh;

  .leaflet-container {
    z-index: 0;
  }

  .leaflet-container {
    height: 600px;
    width: 100%;
  }
  
  .leaflet-div-icon {
    background: transparent;
    border: none;
  }  
`;