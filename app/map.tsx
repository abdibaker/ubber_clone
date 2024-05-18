import { observer } from '@legendapp/state/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import tw from 'twrnc';

import { $origin } from './index';

import NavigateCard, { $destination } from '~/components/NavigateCard';
import RideOptionCard from '~/components/RideOptionCard';

export default observer(() => {
  const Stack = createNativeStackNavigator();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!$origin.get() || !$destination.get()) return;
    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
    console.log('object');
  }, [$origin.get(), $destination.get()]);
  return (
    <>
      <View style={tw`h-1/2`}>
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: $origin.get().location.lat,
            longitude: $origin.get().location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={tw`flex-1`}
          mapType="mutedStandard">
          {$origin.get() && $destination.get() && (
            <MapViewDirections
              origin={{
                latitude: $origin.get().location.lat,
                longitude: $origin.get().location.lng,
              }}
              destination={$destination.get().description}
              apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!}
              strokeWidth={3}
              strokeColor="black"
            />
          )}
          {$origin.get()?.location && (
            <Marker
              coordinate={{
                latitude: $origin.get().location.lat,
                longitude: $origin.get().location.lng,
              }}
              title="Origin"
              description={$origin.get().description}
              identifier="origin"
            />
          )}
          {$destination.get()?.location && (
            <Marker
              coordinate={{
                latitude: $destination.get().location.lat,
                longitude: $destination.get().location.lng,
              }}
              title="Destination"
              description={$destination.get().description}
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
});

{
}
