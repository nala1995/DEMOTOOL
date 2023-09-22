import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

function Afacilities({ afacilitiesData, currentApiCall }) {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Verificar si la llamada a la API coincide con el valor actual de currentApiCall
    if (afacilitiesData.length === 0 || currentApiCall !== 4) {
      setDataLoaded(true); // Indicamos que los datos están cargados
      return;
    }

    // Realiza la llamada a la API solo si la API actual es la de aviación (currentApiCall === 4)
    fetch('https://services.arcgis.com/xOi1kZaI0eWDREZv/arcgis/rest/services/Aviation_Facilities/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
      .then((response) => response.json())
      .then((data) => {
        if (currentApiCall === 4) {
          // Actualiza los datos de las instalaciones de aviación solo si coincide
          setAfacilitiesData(data.features);
        }
        setDataLoaded(true); // Indicamos que los datos están cargados
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API:', error);
        setDataLoaded(true); // Indicamos que los datos están cargados, aunque haya ocurrido un error
      });
  }, [afacilitiesData, currentApiCall]);

  return (
    <div>
      {dataLoaded ? (
        <div>
          {afacilitiesData.map((feature, index) => (
            <Marker
              key={`afacility-${index}`}
              position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
            >
              <Popup>
                <div>
                  <p>ID: {feature.properties.OBJECTID}</p>
                  <p>NAME: {feature.properties.CITY}</p>
                  <p>TYPE: {feature.properties.STATE_NAME}</p>
                  <p>Airport Name: {feature.properties.ARPT_NAME}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </div>
      ) : (
        <p>Ya se está procesando una llamada a la API. Por favor, espera...</p>
      )}
    </div>
  );
}

export default Afacilities;
