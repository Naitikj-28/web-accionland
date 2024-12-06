import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Main.css';
import LayersControl from './LayersControl';
import Dropdown from './Dropdown';

const Main = ({ activeScreen }) => {
    const [mapType, setMapType] = useState('street');
    const [layers, setLayers] = useState([]);
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchLayers = async () => {
            const loadedLayers = await LayersControl.loadAllKmlFiles();
            setLayers(loadedLayers);
        };
        fetchLayers();
    }, []);

    const handleLayerToggle = (name) => {
        setSelectedLayers((prevSelected) =>
            prevSelected.includes(name)
                ? prevSelected.filter((layerName) => layerName !== name)
                : [...prevSelected, name]
        );
    };

    const handleMapTypeChange = (type) => {
        setMapType(type);
    };

    const toggleDropdown = (section) => {
        setDropdownOpen((prev) => (prev === section ? null : section));
    };

    if (activeScreen === '3dModel') {
        return (
            <div className="main-content">
                <div className="model-container">
                    <iframe
                        src="./3D/3D_AMC.html"
                        title="3D Model Viewer"
                        style={{
                            width: '75vw',
                            height: '100vh',
                            border: 'none',
                        }}
                    ></iframe>
                </div>
            </div>
        );
    }

    if (activeScreen === 'fewdss') {
        return (
            <div className="main-content">
                <div className="model-container">
                    <iframe
                        src="https://fewdss.pages.dev/"
                        title="FEWDSS"
                        style={{
                            width: '75vw',
                            height: '95vh',
                            border: 'none',
                            zIndex: '11111',
                        }}
                    ></iframe>
                </div>
            </div>
        );
    }

    return (
        <main className="main-content">
            <MapContainer
                center={[23.0225, 72.5714]}
                zoom={11.5}
                className="leaflet-map"
                style={{ height: '100%', width: '100%' }}
                maxBounds={[[22.8, 72.3], [23.2, 72.9]]}
                maxBoundsViscosity={2.0}
                maxZoom={18}
                minZoom={9}
            >
                {mapType === 'street' && (
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                )}
                {mapType === 'satellite' && (
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                    />
                )}

                <LayersControl
                    layers={layers}
                    selectedLayers={selectedLayers}
                    handleLayerToggle={handleLayerToggle}
                />
            </MapContainer>

            <div className="map-toggle">
                <button className="toggle-btn" onClick={() => handleMapTypeChange('street')}>
                    Street
                </button>
                <button className="toggle-btn" onClick={() => handleMapTypeChange('satellite')}>
                    Satellite
                </button>
            </div>

            <Dropdown
                selectedLayers={selectedLayers}
                handleLayerToggle={handleLayerToggle}
                toggleDropdown={toggleDropdown}
                dropdownOpen={dropdownOpen}
            />
        </main>
    );
};

export default Main;
