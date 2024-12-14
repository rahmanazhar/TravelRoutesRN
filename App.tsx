import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'api_key';

// Origin coordinates (Ampang)
const ORIGIN = {
  latitude: 3.1488,
  longitude: 101.762,
};

// Destination coordinates (KL City Center)
const DESTINATION = {
  latitude: 3.1478,
  longitude: 101.6953,
};

// Calculate midpoint
const MIDPOINT = {
  latitude: (ORIGIN.latitude + DESTINATION.latitude) / 2,
  longitude: (ORIGIN.longitude + DESTINATION.longitude) / 2,
};

const App = () => {
  const mapRef = useRef<MapView | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [routeMidPoint, setRouteMidPoint] = useState(MIDPOINT);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        googleRenderer="LEGACY"
        initialRegion={{
          latitude: MIDPOINT.latitude,
          longitude: MIDPOINT.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={ORIGIN}
          title="Ampang"
          description="Starting Point"
          pinColor="green"
        />
        <Marker
          coordinate={DESTINATION}
          title="Kuala Lumpur"
          description="City Center"
          pinColor="red"
        />
        <MapViewDirections
          origin={ORIGIN}
          destination={DESTINATION}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onReady={result => {
            setDistance(result.distance);
            // Get the middle coordinate from the route
            const middleIndex = Math.floor(result.coordinates.length / 2);
            setRouteMidPoint(result.coordinates[middleIndex]);
            
            mapRef.current?.fitToCoordinates([ORIGIN, DESTINATION], {
              edgePadding: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100,
              },
              animated: true,
            });
          }}
        />
        {distance && (
          <Marker coordinate={routeMidPoint} flat={true}>
            <View style={styles.distanceBox}>
              <Text style={styles.distanceText}>{distance.toFixed(2)} KM</Text>
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  distanceBox: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    minWidth: 80,
    alignItems: 'center',
  },
  distanceText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default App;
