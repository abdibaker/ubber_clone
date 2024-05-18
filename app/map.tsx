import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import tw from 'twrnc';

import NavigateCard from '~/components/NavigateCard';
import RideOptionCard from '~/components/RideOptionCard';
import useNavStore from '~/stores/navStore';

export default function Map() {
  const Stack = createNativeStackNavigator();
  const mapRef = useRef<MapView>(null);
  const origin = useNavStore((s) => s.origin);
  const destination = useNavStore((s) => s.destination);

  const calculateEdgePadding = () => {
    if (!origin || !destination) return { top: 50, right: 50, bottom: 50, left: 50 };

    const latitudes = [origin.location.lat, destination.location.lat];
    const longitudes = [origin.location.lng, destination.location.lng];

    const maxLatitude = Math.max(...latitudes);
    const minLatitude = Math.min(...latitudes);
    const maxLongitude = Math.max(...longitudes);
    const minLongitude = Math.min(...longitudes);

    const latitudeDelta = Math.abs(maxLatitude - minLatitude) / 0.1;
    const longitudeDelta = Math.abs(maxLongitude - minLongitude) / 0.1;

    return {
      top: latitudeDelta,
      right: longitudeDelta,
      bottom: latitudeDelta,
      left: longitudeDelta,
    };
  };

  useEffect(() => {
    if (!origin || !destination) return;

    setTimeout(() => {
      const edgePadding = calculateEdgePadding();
      console.log('🚀 ~ setTimeout ~ edgePadding:', edgePadding);
      mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding,
      });
    }, 100);

    console.log('destination', destination);
  }, [origin, destination]);
  return (
    <>
      <View style={tw`h-1/2`}>
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: origin!.location.lat,
            longitude: origin!.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={tw`flex-1`}
          mapType="mutedStandard">
          {origin && destination && (
            <MapViewDirections
              origin={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              destination={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!}
              strokeWidth={3}
              strokeColor="black"
            />
          )}
          {origin?.location && (
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              title="Origin"
              description={origin.description}
              identifier="origin"
            />
          )}
          {destination?.location && (
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              title="Destination"
              description={destination.description}
              identifier="destination"
            />
          )}
        </MapView>
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="navigateCard" component={NavigateCard} />
          <Stack.Screen name="rideOptionCard" component={RideOptionCard} />
        </Stack.Navigator>
      </View>
    </>
  );
}
