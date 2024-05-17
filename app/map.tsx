import { observer } from '@legendapp/state/react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';

import { $origin } from './index';

export default observer(() => {
  return (
    <>
      <View style={tw`h-1/2`}>
        <MapView
          initialRegion={{
            latitude: $origin.get().location.lat,
            longitude: $origin.get().location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={tw`flex-1`}
          mapType="mutedStandard">
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
        </MapView>
      </View>
      <View style={tw`h-1/2`} />
    </>
  );
});
