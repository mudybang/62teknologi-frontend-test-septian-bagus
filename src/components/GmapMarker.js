import {
    GoogleMap,
    LoadScript,
    MarkerF , // Import Marker
  } from "@react-google-maps/api";
  
function GmapMarker({ coordinates}) {
    // Atur LongLat Focus map disini saya mengatur LongLat yang mengarah ke Jakarta
    const center = {
      lat: coordinates.latitude,
      lng: coordinates.longitude,
    };
  
    // ContainerStyle Berfungsi Untuk Mengatur StyleContainer Untuk google maps
    const containerStyle = {
      width: 'auto',
      height: '300px'
    };    
    
    return (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAP_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
        >
          <MarkerF
            //Titik Marker akan di letakkan dengan menentukan LongLat
            position={center}
            // Jika Ingin Marker dapat di drag rubah value draggable menjadi true
            draggable={false}
          />
        </GoogleMap>
      </LoadScript>      
    );
  }
  
  export default GmapMarker;