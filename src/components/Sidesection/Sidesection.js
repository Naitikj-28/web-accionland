import React, { useState, useEffect } from 'react';
import './Sidesection.css';

const Sidesection = ({ setActiveScreen, layers, totalSlumArea, totalLength }) => {
    const [chartContent, setChartContent] = useState("map");
    const [activeSlide, setActiveSlide] = useState(0);
    const [counts, setCounts] = useState({});

    useEffect(() => {
        if (layers) {
            const layerCounts = {};
            layers.forEach((layer) => {
                layerCounts[layer.name] = layer.geojson.features.length || 0;
            });
            setCounts(layerCounts);
        }
    }, [layers]);

    const handleFooterClick = (screen) => {
        setActiveScreen(screen);
        if (screen === '3dModel') {
            setChartContent("3D");
        } else if (screen === 'map') {
            setChartContent("map");
        } else if (screen === 'fewdss') {
            setChartContent("FEWDSS");
        }
    };

    const slides = [
        {
            title: "Ward Details",
            content: (
                <div>
                    <table className="table-section">
                        <tbody>
                            <tr><td>Total Wards: </td><td>{counts['Ward Boundary'] || 'N/A'}</td></tr>
                            <tr><td>Total Slum Area: </td><td>{totalSlumArea || 'N/A'} km²</td></tr>
                            <tr><td>Total Auto Rain Gauge Stations: </td><td>{counts['ARGS'] || 'N/A'}</td></tr>
                            <tr><td>Total AMC Waterlogging Spots: </td><td>{counts['AMC_WLS'] || 'N/A'}</td></tr>
                            <tr><td>Total Sewer Pump Stations: </td><td>{counts['SewerPS'] || 'N/A'}</td></tr>
                            <tr><td>Total Sewer Treatment Plant: </td><td>{counts['SewerTP'] || 'N/A'}</td></tr>
                            <tr><td>Total Storm Pump Stations: </td><td>{counts['StromPS'] || 'N/A'}</td></tr>
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            title: "City Connectivity",
            content: (
                <div>
                    <table className="table-section">
                        <tbody>
                            <tr><td>Total Railway Line (in kms): </td><td>{totalLength || 'N/A'} kms</td></tr>
                            <tr><td>Total Hospitals: </td><td>{counts['Hospitals'] || 'N/A'}</td></tr>
                            <tr><td>Total Ward Office: </td><td>{counts['Ward Office'] || 'N/A'}</td></tr>
                            <tr><td>Total Zone Office: </td><td>{counts['Zone Office'] || 'N/A'}</td></tr>
                            <tr><td>Total Medical Stores: </td><td>{counts['Medical'] || 'N/A'}</td></tr>
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            title: "Water Analysis",
            content: "Statements and functions of Water Analysis.",
        },
    ];

    const handleNext = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePrevious = () => {
        setActiveSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    return (
        <aside className="side-section">
            <div className="statistics-grid">
                <div className="statistic-box">City<br /><span>Ahmedabad</span></div>
                <div className="statistic-box">State<br /><span>Gujarat</span></div>
                <div className="statistic-box">Total Area Cover<br /><span>505 km²</span></div>
                <div className="statistic-box">Total Population<br /><span>8,651,000+</span></div>
            </div>

            <div className="chart-section">
                <div className="chart-box">
                    {chartContent === "3D" && (
                        <div>
                            <h3>3D Terrain Model of Ahmedabad - Flood Warning Analysis</h3>
                            <p style={{ textAlign: 'justify' }}>
                                The 3D terrain model of Ahmedabad provides a detailed, interactive visualization of the city's landscape, designed to simulate potential flood scenarios. By analyzing various environmental factors and historical data, this model predicts the likely paths that floodwaters could take in the event of heavy rainfall or extreme weather conditions. It helps in understanding the areas most at risk of flooding, enabling better preparedness and response planning. This model is essential for local authorities, urban planners, and emergency responders to make informed decisions, ensuring that resources are allocated efficiently to protect lives and property. The flood warning analysis provides an essential tool for proactive disaster management, highlighting the vulnerable regions and offering insight into how the city’s infrastructure could be impacted.
                            </p>
                        </div>
                    )}
                    {chartContent === "map" && (
                        <div className="map-content">
                            <h2>
                                <span className="arrow" onClick={handlePrevious}>&lt;</span>
                                {slides[activeSlide].title}
                                <span className="arrow" onClick={handleNext}>&gt;</span>
                            </h2>
                            <h6 className="slide-content">{slides[activeSlide].content}</h6>
                        </div>
                    )}
                    {chartContent === "FEWDSS" && (
                        <div></div>
                    )}
                </div>
            </div>

            <div className="footer-section">
                <div className="footer-box" onClick={() => handleFooterClick('3dModel')}>GeoScope</div>
                <div className="footer-box" onClick={() => handleFooterClick('map')}>UrbanView</div>
                <div className="footer-box" onClick={() => handleFooterClick('fewdss')}>FloodGuard</div>
            </div>
        </aside>
    );
};

export default Sidesection;
// ---------------------------------------- till here don't touch -------------------------------------