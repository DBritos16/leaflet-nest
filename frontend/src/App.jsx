
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { FeatureGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import './App.css';


function App() {

  const [marcadores, setMarcadores] = useState([]);

  const getMarcadores = async()=>{
    const req = await fetch('http://localhost:3000/map');
    const res = await req.json();
    setMarcadores(res);
  }

  const editLayer = async (data) => {
    const req = await fetch('http://localhost:3000/map',{
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      });

    const res = await req.json();

    setMarcadores(prev => prev.map( marcador => marcador.id === res.idMarcador ? res : marcador));
  };
 
  const deleteLayer = async (id) => {
    const req = await fetch(`http://localhost:3000/map/${id}`,{
        method: 'DELETE'
      });

    const res = await req.json();

    setMarcadores(prev => prev.filter( marcador => marcador.id === id ? res : marcador));
  };


  const onCreated = async ({layer})=>{

    const nombre = prompt('Ingrese un nombre para el marcador');

    if(nombre.trim()){
      const req = await fetch('http://localhost:3000/map',{
        method: 'POST',
        body: JSON.stringify({nombre, coordenadas: layer.getLatLng()}),
        headers: {
          'content-type': 'application/json'
        }
      });

      const res = await req.json();

      setMarcadores(prev => [...prev, res]);

      return alert('Marcador Guardado');
    } else {
      alert('Debes ingresar un nombre')
    }
  };

  const onEdited = ({layers}) => {
    const editedLayers = layers.getLayers();

    editedLayers.forEach( async editedLayer => {
      await editLayer({idMarcador: editedLayer.options.id, coordenadas: editedLayer.getLatLng()});
    })
  };

  const onDeleted = ({layers}) => {
    const deletedLayers = layers.getLayers();

    deletedLayers.forEach( async deletedLayer => {
      await deleteLayer(deletedLayer.options.id);
    })

  };

  useEffect(()=>{
    getMarcadores();
  },[])

  return (
    <main>
      <MapContainer center={[-24.6545, -59.5011]} zoom={8}>
        
        <LayersControl>
          <LayersControl.BaseLayer name='Mapa 2D' checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name='Mapa Satelital'>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://khms0.google.com/kh/v=979?x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>

        </LayersControl>
        <FeatureGroup key={marcadores}>
          <EditControl
            onCreated={onCreated}
            onEdited={onEdited}
            onDeleted={onDeleted}

            draw={{
              marker: true,
              circle: false,
              circlemarker: false,
              polygon: false,
              polyline: false,
              rectangle: false
            }}
          />

          {marcadores.map( marcador => (
            <Marker position={marcador.coordenadas} id={marcador.idMarcador} key={marcador.idMarcador}>
              <Popup>{marcador.nombre}</Popup>
            </Marker>
          ))}

        </FeatureGroup>
      </MapContainer>
    </main>
  )
}

export default App
