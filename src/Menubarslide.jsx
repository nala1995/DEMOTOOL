import React, { useState, useEffect } from 'react';
import arrow from './assets/atras.png';
import menu from './assets/menu.png';
import * as HoverCard from '@radix-ui/react-hover-card';
import './App.css';

function Menubarslide({ handleTabClick, handleApiLoad, handleAfacilitiesData, currentApiCall, setCurrentApiCall }) {
  const [arrowClicked, setArrowClicked] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [afacilitiesData, setAfacilitiesData] = useState([]);
  const [showAfacilitiesInfo, setShowAfacilitiesInfo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setDataLoaded(true);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  const handleArrowClick = () => {
    setArrowClicked(!arrowClicked);
  };

  const apiActions = {
    1: async () => {
      // Llamada a la API para el caso 1
      if (!dataLoaded) {
        console.log('Espera a que los datos se carguen...');
        return;
      }
      setCurrentApiCall(1);
      try {
        const response = await fetch(/* URL de la API para el caso 1 */);
        if (response.ok) {
          const data = await response.json();
          await handleApiLoad(1, data.features);
        } else {
          throw new Error(`Error al obtener datos de la API (${response.status})`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setCurrentApiCall(null);
    },
    2: () => {
      // Utiliza los datos del archivo movements.json para el caso 2
      if (!dataLoaded) {
        console.log('Espera a que los datos se carguen...');
        return;
      }
      handleTabClick(2);
    },
    3: async () => {
      if (!showAfacilitiesInfo) {
        try {
          const response = await fetch(
            'https://services7.arcgis.com/n1YM8pTrFmm7L4hs/ArcGIS/rest/services/ndc/FeatureServer/6/query?where=1%3D1&outFields=*&outSR=4326&f=json'
          );
          if (response.ok) {
            const data = await response.json();
            await handleApiLoad(3, data.features);
          } else {
            throw new Error(`Error al obtener datos de la API (${response.status})`);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    },
    4: async () => {
      if (!showAfacilitiesInfo) {
        if (afacilitiesData.length === 0) {
          try {
            const response = await fetch(
              'https://services.arcgis.com/xOi1kZaI0eWDREZv/arcgis/rest/services/Aviation_Facilities/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson'
            );
            if (response.ok) {
              const data = await response.json();
              setAfacilitiesData(data.features);
              handleAfacilitiesData(data.features);
              await handleApiLoad(4, data.features);
            } else {
              throw new Error(`Error al obtener datos de la API (${response.status})`);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        } else {
          handleApiLoad(4, afacilitiesData);
        }
      }
    },
  };

  const handleApiCall = async (tab) => {
    if (currentApiCall !== null) {
      console.log('Ya se está procesando una llamada a la API. Por favor, espera...');
      return;
    }

    const action = apiActions[tab];
    if (action) {
      action();
    }
  };

  return (
    <>
      {arrowClicked && <img className="toggle-button" src={menu} onClick={handleArrowClick} />}
      <div className={`sidebar ${arrowClicked ? 'hidden' : ''}`}>
        <img
          src={arrow}
          alt="Atras"
          className={`arrow-image ${arrowClicked ? 'clicked' : ''}`}
          onClick={handleArrowClick}
        />
        <div>
          <button onClick={() => handleApiCall(2)}>Sant M Ports Movements</button>
          <button onClick={() => handleApiCall(3)}>Navigable Waterway Network</button>
          <button onClick={() => handleApiCall(4)}>US Aviation Facilities</button>
        </div>
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <a
              className="ImageTrigger"
              href="https://twitter.com/GomoFerch"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="Image normal"
                src="https://news.topusainsights.com/wp-content/uploads/2023/07/twitter-x-logo.jpg"
                alt="Radix UI"
              />
            </a>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content className="HoverCardContent" sideOffset={5}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <img
                  className="Image large"
                  src="https://news.topusainsights.com/wp-content/uploads/2023/07/twitter-x-logo.jpg"
                  alt="Radix UI"
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  <div>
                    <div className="Text bold">Ferch!</div>
                    <div className="Text faded">@GomoFerch</div>
                  </div>
                  <div className="Text">
                    On this profile you will approach the world of technology and programming in a simple place the profile is managed by a Colombian entrepreneurial and you will have access to his company Nala where you will find new designs and services for your company or requirements.
                  </div>
                  <div style={{ display: 'flex', gap: 15 }}>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <div className="Text bold">5</div> <div className="Text faded">Following</div>
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <div className="Text bold">5,555</div> <div className="Text faded">Followers</div>
                    </div>
                  </div>
                </div>
              </div>
              <HoverCard.Arrow className="HoverCardArrow" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </div>
    </>
  );
}

export default Menubarslide;


        