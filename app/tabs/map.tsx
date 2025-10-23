import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Circle, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";

const POIS = [
  {
    id: "poi1",
    title: "Clocktower Plaza",
    latitude: 14.5995,
    longitude: 120.9842,
    radiusMeters: 100,
  },
  {
    id: "poi2",
    title: "Riverside Checkpoint",
    latitude: 14.6005,
    longitude: 120.9865,
    radiusMeters: 100,
  },
  {
    id: "poi3",
    title: "Heritage Gate",
    latitude: 14.5982,
    longitude: 120.9820,
    radiusMeters: 100,
  },
];

// Default region (Manila sample)
const DEFAULT_REGION: Region = {
  latitude: 14.5995,
  longitude: 120.9842,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

// Simple dark map style
const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#212121" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#212121" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#383838" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0f1724" }],
  },
];

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [insideMap, setInsideMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required to show your position.");
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
        },
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ latitude, longitude });
          checkGeofences(latitude, longitude);
        }
      );
    })();
  }, []);

  function checkGeofences(userLat: number, userLng: number) {
    POIS.forEach((poi) => {
      const dist = haversineDistance(userLat, userLng, poi.latitude, poi.longitude);
      const inside = dist <= (poi.radiusMeters ?? 100);
      const prev = insideMap[poi.id] || false;
      if (inside && !prev) Alert.alert("Entered", `You entered ${poi.title}`);
      if (!inside && prev) Alert.alert("Exited", `You left ${poi.title}`);
      if (prev !== inside) setInsideMap((s) => ({ ...s, [poi.id]: inside }));
    });
  }

  function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  const zoom = (factor: number) => {
    const latDelta = Math.max(0.0005, region.latitudeDelta * factor);
    const lonDelta = Math.max(0.0005, region.longitudeDelta * factor);
    const newRegion = { ...region, latitudeDelta: latDelta, longitudeDelta: lonDelta };
    mapRef.current?.animateToRegion(newRegion, 300);
    setRegion(newRegion);
  };

  const panToUser = () => {
    if (!userLocation) {
      Alert.alert("Please wait", "Fetching your location...");
      return;
    }
    const target = { ...region, ...userLocation };
    mapRef.current?.animateToRegion(target, 400);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={DEFAULT_REGION}
        showsUserLocation
        customMapStyle={darkMapStyle}
        onRegionChangeComplete={(r) => setRegion(r)}
      >
        {POIS.map((p) => (
          <React.Fragment key={p.id}>
            <Marker
              coordinate={{ latitude: p.latitude, longitude: p.longitude }}
              title={p.title}
            />
            <Circle
              center={{ latitude: p.latitude, longitude: p.longitude }}
              radius={p.radiusMeters ?? 100}
              strokeWidth={1}
              strokeColor="#88ffcc44"
              fillColor={insideMap[p.id] ? "#22552244" : "#44444422"}
            />
          </React.Fragment>
        ))}
      </MapView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={() => zoom(0.6)}>
          <Text style={styles.txt}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => zoom(1.6)}>
          <Text style={styles.txt}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={panToUser}>
          <Text style={styles.txt}>You</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.status}>
        <Text style={styles.statusText}>
          {userLocation
            ? `Lat: ${userLocation.latitude.toFixed(5)}  Lon: ${userLocation.longitude.toFixed(5)}`
            : "Waiting for location..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  controls: {
    position: "absolute",
    right: 10,
    top: 60,
    backgroundColor: "#00000066",
    padding: 5,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#ffffff22",
    marginVertical: 5,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  txt: { color: "white", fontWeight: "600" },
  status: {
    position: "absolute",
    left: 10,
    bottom: 20,
    backgroundColor: "#00000088",
    padding: 8,
    borderRadius: 8,
  },
  statusText: { color: "white" },
});
