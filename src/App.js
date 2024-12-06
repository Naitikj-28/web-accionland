// -----------------------------------------Not to remove---------------------------------------
import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Sidesection from './components/Sidesection/Sidesection';
import React from 'react';
import LayersControl from './components/Main/LayersControl';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('map');
  const [parsedLayers, setParsedLayers] = useState([]);
  const [totalSlumArea, setTotalSlumArea] = useState(0);
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    const loadLayers = async () => {
      const layers = await LayersControl.loadAllKmlFiles();
      setParsedLayers(layers);
      const slumLayer = layers.find((layer) => layer.name === 'Slums');
      if (slumLayer) {
        setTotalSlumArea(slumLayer.totalArea);
      }

      const LengthLayer = layers.find((layer) => layer.name === 'Railway');
      if (LengthLayer) {
        setTotalLength(LengthLayer.totalLength);
      }
    };

    loadLayers();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="content-wrapper">
        <Main activeScreen={activeScreen} />
        <Sidesection
          setActiveScreen={setActiveScreen}
          layers={parsedLayers}
          totalSlumArea={totalSlumArea}
          totalLength={totalLength} // Pass totalLength here
        />
      </div>
    </div>
  );
};

export default App;
// ---------------------------------------- till here don't touch -------------------------------------

