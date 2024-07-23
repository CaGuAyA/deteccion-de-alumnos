import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './css/maps.css'

export const Map = ({ direccion, setDireccion }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // useRef para el mapa
  const markerRef = useRef(null); // useRef para el marcador
  const [address, setAddress] = useState(''); // useState para la dirección

  useEffect(() => {
    const initMap = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;

          const initializedMap = L.map(mapContainerRef.current).setView([latitude, longitude], 16);
          mapRef.current = initializedMap; // Asignar el mapa al ref

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(initializedMap);

          const userMarker = L.marker([latitude, longitude]).addTo(initializedMap)
            .bindPopup('Tu ubicación');
          markerRef.current = userMarker; // Asignar el marcador al ref

          // Contador para el número de niveles de zoom
          let zoomCount = 5;

          const toggleMarkerVisibility = () => {
            if (zoomCount < 3) {
              userMarker.setOpacity(userMarker.options.opacity === 0 ? 1 : 0);
              zoomCount++;
            } else {
              userMarker.setOpacity(1);
              userMarker.openPopup();
            }
          };

          initializedMap.on('zoomend', toggleMarkerVisibility);

          initializedMap.on('dblclick', async (e) => {
            const { lat, lng } = e.latlng;
            if (markerRef.current) {
              markerRef.current.setLatLng([lat, lng]).setPopupContent('Ubicación seleccionada');
              markerRef.current.openPopup();
            } else {
              const newMarker = L.marker([lat, lng]).addTo(initializedMap)
                .bindPopup('Ubicación seleccionada');
              markerRef.current = newMarker; // Asignar el nuevo marcador al ref
            }

            // Geocodificación inversa
            const reverseGeocodeResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const reverseGeocodeData = await reverseGeocodeResponse.json();
            if (reverseGeocodeData && reverseGeocodeData.display_name) {
              setAddress(reverseGeocodeData.display_name);
              setDireccion(reverseGeocodeData.display_name);
            } else {
              setAddress(`${lat}, ${lng}`);
              setDireccion(`${lat}, ${lng}`);
            }
          });

        }, () => {
          console.log("No se pudo obtener la ubicación.");
        });
      } else {
        console.log("La geolocalización no está disponible en este navegador.");
      }
    };
    if (!mapRef.current) {
      initMap();
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const handleSearch = async () => {
    const addressInput = document.getElementById('address').value;
    if (!addressInput) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressInput)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        if (mapRef.current) {
          mapRef.current.setView([lat, lon], 16);
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lon]).setPopupContent(`Ubicación buscada: ${addressInput}`);
            markerRef.current.openPopup();
          } else {
            const newMarker = L.marker([lat, lon]).addTo(mapRef.current)
              .bindPopup(`Ubicación buscada: ${addressInput}`);
            markerRef.current = newMarker;
          }
        }
      } else {
        alert('No se encontraron resultados para esa dirección.');
      }
    } catch (error) {
      console.error('Error al buscar la dirección:', error);
    }
  };

  return (
    <div className='contenedor_mapa'>
      <div className='contenedor_datos_mapa'>
        <input
          type="text"
          id="address"
          placeholder="Ingrese una dirección (calle, zona)"
          value={address}
          onChange={(e) => { setAddress(e.target.value), setDireccion(e.target.value) }}
        />
        <button onClick={handleSearch} style={{ padding: '10px' }}>Buscar</button>
      </div>
      <div ref={mapContainerRef} id="map"></div>
    </div>
  );
};
