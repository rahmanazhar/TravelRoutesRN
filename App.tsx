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

// Waypoints
const WAYPOINTS = [
  {
    latitude: 3.1527,
    longitude: 101.7374,
    title: 'Ampang Point',
  },
  {
    latitude: 3.1590,
    longitude: 101.7174,
    title: 'KLCC East',
  },
];

// Destination coordinates (KL City Center)
const DESTINATION = {
  latitude: 3.1478,
  longitude: 101.6953,
};

// Calculate initial midpoint
const MIDPOINT = {
  latitude: (ORIGIN.latitude + DESTINATION.latitude) / 2,
  longitude: (ORIGIN.longitude + DESTINATION.longitude) / 2,
};

interface SegmentDistance {
  start: {latitude: number; longitude: number};
  end: {latitude: number; longitude: number};
  distance: number;
  midPoint: {latitude: number; longitude: number};
}

const App = () => {
  const mapRef = useRef<MapView | null>(null);
  const [segmentDistances, setSegmentDistances] = useState<SegmentDistance[]>([]);

  // Create an array of all points in order
  const allPoints = [ORIGIN, ...WAYPOINTS, DESTINATION];

  // Function to fit map to show all points
  const fitMapToPoints = () => {
    mapRef.current?.fitToCoordinates(allPoints, {
      edgePadding: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      },
      animated: true,
    });
  };

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
        {/* Origin Marker */}
        <Marker
          coordinate={ORIGIN}
          title="Ampang"
          description="Starting Point"
          pinColor="green"
        />

        {/* Waypoint Markers */}
        {WAYPOINTS.map((waypoint, index) => (
          <Marker
            key={index}
            coordinate={waypoint}
            title={waypoint.title}
            description={`Waypoint ${index + 1}`}
            pinColor="blue"
          />
        ))}

        {/* Destination Marker */}
        <Marker
          coordinate={DESTINATION}
          title="Kuala Lumpur"
          description="City Center"
          pinColor="red"
        />

        {/* Render directions for each segment */}
        {allPoints.slice(0, -1).map((start, index) => {
          const end = allPoints[index + 1];
          return (
            <MapViewDirections
              key={index}
              origin={start}
              destination={end}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
              onReady={result => {
                // Update segment distances
                setSegmentDistances(prev => {
                  const newDistances = [...prev];
                  const middleIndex = Math.floor(result.coordinates.length / 2);
                  newDistances[index] = {
                    start,
                    end,
                    distance: result.distance,
                    midPoint: result.coordinates[middleIndex],
                  };
                  return newDistances;
                });

                // Fit map to show all points after the last segment is loaded
                if (index === allPoints.length - 2) {
                  fitMapToPoints();
                }
              }}
            />
          );
        })}

        {/* Display distance markers for each segment */}
        {segmentDistances.map((segment, index) => (
          <Marker key={`distance-${index}`} coordinate={segment.midPoint} flat={true}>
            <View style={styles.distanceBox}>
              <Text style={styles.distanceText}>{segment.distance.toFixed(2)} KM</Text>
            </View>
          </Marker>
        ))}
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
