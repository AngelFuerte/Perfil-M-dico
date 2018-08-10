import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const styleMap = {
  width: '50vw',
  height: '75vh',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
  position: 'relative',
};

const MedicalMap = ({ medical, google }) => (
  <div>
    <div className="Map">
      <Map
        item
        xs={12}
        google={google}
        zoom={16}
        style={styleMap}
        initialCenter={medical.work_place[0].location}
        center={medical.work_place[0].location}
      >
        <Marker position={medical.work_place[0].location} />
      </Map>
    </div>
  </div>
);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBld1lYALlLVvk0fxug_koFWag0Un-whMI',
})(MedicalMap);
