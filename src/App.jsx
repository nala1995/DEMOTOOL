import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Menubarslide from './Menubarslide';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import movementData from './movements.json';
import Afacilities from './Afacilities';

function App() {
  const [markerData, setMarkerData] = useState([]);
  const [showMovementData, setShowMovementData] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [individualApiData, setIndividualApiData] = useState([]);
  const [apiDataLoaded, setApiDataLoaded] = useState(false); // Estado para rastrear la carga de datos de la API
  const [loadType, setLoadType] = useState(null);
  const [afacilitiesData, setAfacilitiesData] = useState([]);
  const [currentApiCall, setCurrentApiCall] = useState(null);

  useEffect(() => {
    if (showMovementData) {
      // Procesa los datos de movimiento
      const processedData = movementData.map((array) => ({
        lat: parseFloat(array.latitud),
        lng: parseFloat(array.longitud),
        popupContent: (
          <div>
            <h3>Empresa: {array.CodigoEmpresa}</h3>
            <p>Movimiento: {array.movimiento}</p>
            <p>Empresa Transportista: {array.empresatransporte}</p>
            <p>Peso: {array.peso}</p>
            <p>Tipo de Carga: {array.tipocarga}</p>
            <p>Tipo de Nave: {array.tipoNave}</p>
            <p>Fecha en puerto: {array.OBJECTID2}</p>
          </div>
        ),
      }));
      setMarkerData(processedData);
    }
  }, [showMovementData]);

  const handleTabClick = () => {
    setShowMovementData(true);
  };

  const handleJsonLoad = useCallback(() => {
    setLoadType('json');
    const jsonData = [
      {
        latitud: '6.9708',
        longitud: '-74.2973',
        CodigoEmpresa: 'Empresa1',
        movimiento: 'Movimiento1',
        empresatransporte: 'Transportista1',
        peso: '1000',
        tipocarga: 'Carga1',
        tipoNave: 'Nave1',
        OBJECTID2: 'Fecha1',
      },
      // Agrega más datos simulados según tu estructura
    ];
    const processedData = jsonData.map((array) => ({
      lat: parseFloat(array.latitud),
      lng: parseFloat(array.longitud),
      popupContent: (
        <div>
          <h3>Empresa: {array.CodigoEmpresa}</h3>
          <p>Movimiento: {array.movimiento}</p>
          <p>Empresa Transportista: {array.empresatransporte}</p>
          <p>Peso: {array.peso}</p>
          <p>Tipo de Carga: {array.tipocarga}</p>
          <p>Tipo de Nave: {array.tipoNave}</p>
          <p>Fecha en puerto: {array.OBJECTID2}</p>
        </div>
      ),
    }));
    setMarkerData(processedData);
  }, [setLoadType, setMarkerData]);

  const handleApiLoad = useCallback(async (tab, data) => {
    setLoadType('api');
    setApiData(data);
    // Almacena la data individual en el estado
    const individualData = data.map((feature) => ({
      lat: feature.geometry.y,
      lng: feature.geometry.x,
      popupContent: (
        <div>
          <h3>ID: {feature.attributes.ID}</h3>
          <p>ELEVATION: {feature.attributes.ELEVATION}</p>
          {/* Agrega más campos de atributos aquí si es necesario */}
        </div>
      ),
    }));
    setIndividualApiData(individualData);
    setApiDataLoaded(true);
    setShowMovementData(false); // Oculta los datos de JSON
  }, [setLoadType, setApiData, setIndividualApiData, setApiDataLoaded, setShowMovementData]);

  useEffect(() => {
    if (loadType === 'json') {
      handleJsonLoad();
    }
  }, [loadType, handleJsonLoad]);

  const handleAfacilitiesData = (data) => {
    setAfacilitiesData(data);
  };

  return (
    <>
      <div className="app">
        <div className="sidebar-overlay">
          <Menubarslide
            handleTabClick={handleTabClick}
            handleApiLoad={handleApiLoad}
            handleAfacilitiesData={handleAfacilitiesData}
            currentApiCall={currentApiCall}
            setCurrentApiCall={setCurrentApiCall}
          />
        </div>
      </div>
      <div className="map-container">
        <h1 className='title-app'>Foreign Trade & Transportation traffic viewer tool</h1>
        <MapContainer center={[6.9708, -74.2973]} zoom={3} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap </a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerData.map((marker, index) => (
            <Marker key={`${marker.lat}-${marker.lng}-${index}`} position={[marker.lat, marker.lng]}>
              <Popup>{marker.popupContent}</Popup>
            </Marker>
          ))}
          {apiDataLoaded && individualApiData.map((marker, index) => (
            <Marker key={`api-${index}`} position={[marker.lat, marker.lng]}>
              <Popup>{marker.popupContent}</Popup>
            </Marker>
          ))}
          <Afacilities afacilitiesData={afacilitiesData} />
        </MapContainer>
      </div>
    </>
  );
}

export default App;
