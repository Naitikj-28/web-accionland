// -----------------------------------------Not to remove---------------------------------------
import React from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import * as tj from '@mapbox/togeojson';
import rewind from '@mapbox/geojson-rewind';

import kmlFile1 from './KML/IMP/AMC_WARD_BOUNDARY.kml';
import kmlFile2 from './KML/Extra/Ward_Office.kml';
import kmlFile3 from './KML/Extra/Zone_Office.kml';
import kmlFile4 from './KML/IMP/Railway.kml';
import kmlFile5 from './KML/IMP/Drains.kml';
import kmlFile6 from './KML/IMP/WaterMovement.kml';
import kmlFile7 from './KML/IMP/Natural_Outfall.kml';
import kmlFile8 from './KML/IMP/Streams.kml';
import kmlFile9 from './KML/Extra/Hospitals.kml';
import kmlFile10 from './KML/Extra/WaterBodies.kml';
import kmlFile11 from './KML/Extra/Slum_Areas.kml';
import kmlFile12 from './KML/IMP/ARGS.kml';
import kmlFile13 from './KML/IMP/AMC_WLS.kml';
import kmlFile14 from './KML/IMP/SewerPS.kml';
import kmlFile15 from './KML/IMP/SewerTP.kml';
import kmlFile16 from './KML/IMP/StromPS.kml';
import kmlFile17 from './KML/Extra/Medical_Stores.kml';
import kmlFile18 from './KML/Extra/Ward_Boundary.kml';

const LayersControl = ({ layers, selectedLayers }) => {
    const layerStyles = {
        'Ward Boundary': { color: 'darkgreen', fillColor: 'green', weight: 2, fillOpacity: 0.1 },
        Railway: { color: 'black', weight: 5, dashArray: '7,10' },
        Drains: { color: 'red', weight: 2 },
        'Water Movement': { color: '#7196d1', weight: 4, dashArray: '5,5' },
        Streams: { color: 'yellow', weight: 5, dashArray: '5,5' },
        WaterBodies: { color: 'blue', weight: 3, fillOpacity: 0.5 },
        Slums: { color: 'brown', weight: 3, fillOpacity: 0.5 },
    };


    const ZoneBoundary = (properties) => {
        const zone = properties['zone_amc'];
        switch (zone) {
            case 'South':
                return { color: '#687EBB', fillColor: '#8E9FCC', weight: 1, fillOpacity: 0.5 };
            case 'East':
                return { color: '#9DDBEA', fillColor: '#B7E1ED', weight: 1, fillOpacity: 0.5 };
            case 'North':
                return { color: '#B69890', fillColor: '#C7B4B0', weight: 1, fillOpacity: 0.5 };
            case 'West':
                return { color: '#FED864', fillColor: '#E8DF8A', weight: 1, fillOpacity: 0.5 };
            case 'New West':
                return { color: '#7C7C7C', fillColor: '#A6A39C', weight: 1, fillOpacity: 0.5 };
            case 'Central':
                return { color: '#009D57', fillColor: '#61BF8B', weight: 1, fillOpacity: 0.5 };
            default:
                return { color: 'gray', weight: 1 };
        }
    };

    const markerCreators = {
        'Zone Office': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fas fa-building-columns" style="font-size: 20px; color: blue;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }).bindPopup(`
                <div class="popup-table">
                    <table>
                        <tr>
                            <td><b>Ward</b></td>
                            <td>${feature.properties.name}</td>
                            </tr>
                            <tr>
                            <td><b>Name</b></td>
                            <td>${feature.properties.description}</td>
                        </tr>
                    </table>
                </div>
            `),
        'Ward Office': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fas fa-building" style="font-size: 20px; color: #ed9d13;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }).bindPopup(`
                <div class="popup-table">
                    <table>
                        <tr>
                            <td><b>Office</b></td>
                            <td>${feature.properties.name}</td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td>${feature.properties.Address}</td>
                        </tr>
                    </table>
                </div>
            `),
        'Natural Outfall': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fas fa-circle" style="font-size: 20px; color: green;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }),
        'Hospitals': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fa-solid fa-hospital" style="font-size: 15px; color: red;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }).bindPopup(`<b>Hospitals</b><br>${JSON.stringify(feature.properties)}`),
        'ARGS': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fa-solid fa-circle" style="font-size: 20px; color: #f0c011;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }).bindPopup(`
                <div class="popup-table">
                    <table>
                        <tr>
                            <td><b>Location</b></td>
                            <td>${feature.properties.Address}</td>
                        </tr>
                    </table>
                </div>
            `),
        'AMC_WLS': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fa-solid fa-circle" style="font-size: 20px; color: #f06311;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }).bindPopup(`
                <div class="popup-table">
                    <table>
                        <tr>
                            <td><b>Location</b></td>
                            <td>${feature.properties.Place}</td>
                        </tr>
                    </table>
                </div>
            `),
        'SewerPS': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fa-solid fa-circle" style="font-size: 10px; color: #339e1b;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }).bindPopup(`
                <div class="popup-table">
                    <table>
                        <tr>
                            <td><b>Location</b></td>
                            <td>${feature.properties.Address}</td>
                        </tr>
                    </table>
                </div>
            `),
        'SewerTP': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fa-solid fa-circle" style="font-size: 10px; color: #911b9e;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }).bindPopup(`
                <div class="popup-table">
                    <table>
                        <tr>
                            <td><b>Location</b></td>
                            <td>${feature.properties.Address}</td>
                        </tr>
                    </table>
                </div>
            `),
        'StromPS': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fa-solid fa-circle" style="font-size: 10px; color: #9e561b;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }),
        'Medical': (feature, latlng) =>
            L.marker(latlng, {
                icon: L.divIcon({
                    html: '<i class="fas fa-store" style="font-size: 10px; color: #c311f0;"></i>',
                    className: 'custom-div-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                }),
            }).bindPopup(`
                <div class="popup-table">
                    <table>
                        <tr>
                            <td><b>Name</b></td>
                            <td>${feature.properties.Firm_nm}</td>
                        </tr>
                        <tr>
                            <td><b>Name</b></td>
                            <td>${feature.properties.add1}${feature.properties.Add2}</td>
                        </tr>
                    </table>
                </div>
            `),
    };

    return (
        <>
            {
                layers
                    .filter((layer) => selectedLayers.includes(layer.name))
                    .map((layer, index) => (
                        <GeoJSON
                            key={`${layer.name}-${index}`} // Unique key
                            data={layer.geojson}
                            style={(feature) => {
                                if (layer.name === 'Zone Boundary') {
                                    return ZoneBoundary(feature.properties);
                                }
                                return layerStyles[layer.name] || {};
                            }}
                            pointToLayer={(feature, latlng) =>
                                markerCreators[layer.name]
                                    ? markerCreators[layer.name](feature, latlng)
                                    : L.circleMarker(latlng)
                            }
                        />
                    ))
            }
        </>
    );
};

const calculateTotalArea = (geojson) => {
    let totalArea = 0;
    let totalLength = 0;  // Initialize totalLength to 0
    geojson.features.forEach((feature) => {
        const areaField = feature.properties['Area'];
        if (areaField) {
            totalArea += parseFloat(areaField);
        }
    });

    geojson.features.forEach((feature) => {
        const RLength = feature.properties['LENGTH'];
        if (RLength) {
            totalLength += parseFloat(RLength) / 1000;
        }
    });
    return { totalArea, totalLength };
};


LayersControl.loadAllKmlFiles = async () => {
    const kmlFiles = [
        { name: 'Zone Boundary', file: kmlFile1 },
        { name: 'Ward Office', file: kmlFile2 },
        { name: 'Zone Office', file: kmlFile3 },
        { name: 'Railway', file: kmlFile4 },
        { name: 'Drains', file: kmlFile5 },
        { name: 'Water Movement', file: kmlFile6 },
        { name: 'Natural Outfall', file: kmlFile7 },
        { name: 'Streams', file: kmlFile8 },
        { name: 'Hospitals', file: kmlFile9 },
        { name: 'WaterBodies', file: kmlFile10 },
        { name: 'Slums', file: kmlFile11 },
        { name: 'ARGS', file: kmlFile12 },
        { name: 'AMC_WLS', file: kmlFile13 },
        { name: 'SewerPS', file: kmlFile14 },
        { name: 'SewerTP', file: kmlFile15 },
        { name: 'StromPS', file: kmlFile16 },
        { name: 'Medical', file: kmlFile17 },
        { name: 'Ward Boundary', file: kmlFile18 },
    ];

    const parseTextAsKml = (text) => {
        const dom = new DOMParser().parseFromString(text, 'text/xml');
        const converted = tj.kml(dom);
        rewind(converted, false);
        return converted;
    };

    const layerData = await Promise.all(
        kmlFiles.map((kml) =>
            fetch(kml.file)
                .then((response) => response.text())
                .then((text) => {
                    const geojson = parseTextAsKml(text);
                    const { totalArea, totalLength } = calculateTotalArea(geojson);
                    return {
                        name: kml.name,
                        geojson: geojson,
                        totalArea: totalArea.toFixed(2),
                        totalLength: totalLength.toFixed(2)
                    };
                })
                .catch((error) => console.error(`Error loading ${kml.name}:`, error))
        )
    );

    return layerData;
};

export default LayersControl;
// ---------------------------------------- till here don't touch -------------------------------------
