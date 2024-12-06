import React, { useState } from 'react';

const Dropdown = ({ selectedLayers, handleLayerToggle }) => {
    const [wardOpen, setWardOpen] = useState(false);
    const [railwayOpen, setRailwayOpen] = useState(false);
    const [waterOpen, setWaterOpen] = useState(false);

    const toggleWardDropdown = () => {
        setWardOpen((prev) => !prev);
    };

    const toggleRailwayDropdown = () => {
        setRailwayOpen((prev) => !prev);
    };

    const toggleWaterDropdown = () => {
        setWaterOpen((prev) => !prev);
    };

    return (
        <div className="dropdown styled-dropdown" style={{ scrollbarWidth: 'none' }}>
            <div className="section" id='ward'>
                <button className="section-toggle" onClick={toggleWardDropdown}>
                    WARD DETAILS <span className={wardOpen ? 'arrow-up' : 'arrow-down'}>▼</span>
                </button>
                {wardOpen && (
                    <div className="section-items">
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="ward-boundary"
                                checked={selectedLayers.includes('Ward Boundary')}
                                onChange={() => handleLayerToggle('Ward Boundary')}
                            />
                            <label htmlFor="ward-boundary">Ward Boundary</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="slums"
                                checked={selectedLayers.includes('Slums')}
                                onChange={() => handleLayerToggle('Slums')}
                            />
                            <label htmlFor="slums">Slum Areas</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="args"
                                checked={selectedLayers.includes('ARGS')}
                                onChange={() => handleLayerToggle('ARGS')}
                            />
                            <label htmlFor="args">Auto Rain guage stations</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="amcwls"
                                checked={selectedLayers.includes('AMC_WLS')}
                                onChange={() => handleLayerToggle('AMC_WLS')}
                            />
                            <label htmlFor="amcwls">AMC waterlogging</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="sewerps"
                                checked={selectedLayers.includes('SewerPS')}
                                onChange={() => handleLayerToggle('SewerPS')}
                            />
                            <label htmlFor="sewerps">Sewer Pump Station</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="sewertp"
                                checked={selectedLayers.includes('SewerTP')}
                                onChange={() => handleLayerToggle('SewerTP')}
                            />
                            <label htmlFor="sewertp">Sewer Treatment Plant</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="stromps"
                                checked={selectedLayers.includes('StromPS')}
                                onChange={() => handleLayerToggle('StromPS')}
                            />
                            <label htmlFor="stromps">Strom Pump Station</label>
                        </div>
                    </div>
                )}
            </div>

            {/* New Railway and Road Layers Dropdown */}
            <div className="section" id='connect'>
                <button className="section-toggle" onClick={toggleRailwayDropdown}>
                    City Connectivity<span className={railwayOpen ? 'arrow-up' : 'arrow-down'}>▼</span>
                </button>
                {railwayOpen && (
                    <div className="section-items">
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="railway"
                                checked={selectedLayers.includes('Railway')}
                                onChange={() => handleLayerToggle('Railway')}
                            />
                            <label htmlFor="railway">Railway</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="hospitals"
                                checked={selectedLayers.includes('Hospitals')}
                                onChange={() => handleLayerToggle('Hospitals')}
                            />
                            <label htmlFor="hospitals">Hospitals</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="ward-office"
                                checked={selectedLayers.includes('Ward Office')}
                                onChange={() => handleLayerToggle('Ward Office')}
                            />
                            <label htmlFor="ward-office">Ward Office</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="zone-office"
                                checked={selectedLayers.includes('Zone Office') || selectedLayers.includes('Zone Boundary')}
                                onChange={() => {
                                    if (selectedLayers.includes('Zone Office')) {
                                        handleLayerToggle('Zone Office');
                                        handleLayerToggle('Zone Boundary');
                                    } else {
                                        handleLayerToggle('Zone Office');
                                        handleLayerToggle('Zone Boundary');
                                    }
                                }}
                            />
                            <label htmlFor="zone-office">Zone Office</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="medical"
                                checked={selectedLayers.includes('Medical')}
                                onChange={() => handleLayerToggle('Medical')}
                            />
                            <label htmlFor="medical">Medical Stores</label>
                        </div>
                    </div>
                )}
            </div>

            {/* Water Analysis Layers Dropdown */}
            <div className="section" id='water'>
                <button className="section-toggle" onClick={toggleWaterDropdown}>
                    Water Analysis <span className={waterOpen ? 'arrow-up' : 'arrow-down'}>▼</span>
                </button>
                {waterOpen && (
                    <div className="section-items">
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="drains"
                                checked={selectedLayers.includes('Drains')}
                                onChange={() => handleLayerToggle('Drains')}
                            />
                            <label htmlFor="drains">WaterShed</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="watermovement"
                                checked={selectedLayers.includes('Water Movement')}
                                onChange={() => handleLayerToggle('Water Movement')}
                            />
                            <label htmlFor="watermovement">Water Movement</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="naturalOutfall"
                                checked={selectedLayers.includes('Natural Outfall')}
                                onChange={() => handleLayerToggle('Natural Outfall')}
                            />
                            <label htmlFor="naturalOutfall">Natural Outfall</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="streams"
                                checked={selectedLayers.includes('Streams')}
                                onChange={() => handleLayerToggle('Streams')}
                            />
                            <label htmlFor="streams">Streams</label>
                        </div>
                        <div className="dropdown-item">
                            <input
                                type="checkbox"
                                id="waterbodies"
                                checked={selectedLayers.includes('WaterBodies')}
                                onChange={() => handleLayerToggle('WaterBodies')}
                            />
                            <label htmlFor="waterbodies">Water Bodies</label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
