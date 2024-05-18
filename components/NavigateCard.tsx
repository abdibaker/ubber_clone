import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'twrnc';

import { Location } from '~/app/index';

export const $destination = observable<{ location: Location; description: string }>();

export default observer(() => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={tw`flex-1  bg-white`}>
      <Text style={tw`text-center py-5 text-xl`}>{getGreeting()}, sonny</Text>
      <View style={tw`border-t border-gray-100 flex-shrink`}>
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails
          enablePoweredByContainer={false}
          debounce={400}
          placeholder="Where To"
          onPress={(data, details = null) => {
            if (!details) return;
            $destination.set({
              location: details.geometry.location,
              description: data.description,
            });
            navigation.navigate('rideOptionCard');
          }}
          minLength={2}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          styles={{
            container: {
              backgroundColor: 'white',
              paddingTop: 20,
              flex: 0,
            },
            textInputContainer: {
              paddingHorizontal: 20,
              paddingBottom: 0,
            },
            textInput: {
              backgroundColor: '#e5e7eb',
              borderRadius: 0,
              fontSize: 18,
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
});

function getGreeting() {
  const time = new Date().getHours();
  if (time < 12) {
    return 'Good Morning';
  } else if (time < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}
