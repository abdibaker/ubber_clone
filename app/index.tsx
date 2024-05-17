import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { Icon } from '@rneui/themed';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'twrnc';

import { Container } from '~/components/Container';

const options = [
  {
    id: '1',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: '/map',
  },
  {
    id: '2',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: '/food',
  },
];

interface Location {
  lat: number;
  lng: number;
}

export const $origin = observable<{ location: Location; description: string }>();

export default observer(() => {
  const [hasLocation, setHasLocation] = useState(false);
  return (
    <>
      <Container>
        <Image
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails
          enablePoweredByContainer={false}
          debounce={400}
          placeholder="Where From"
          onPress={(data, details = null) => {
            if (!details) return;
            $origin.set({
              location: details.geometry.location,
              description: data.description,
            });
            setHasLocation(true);
          }}
          minLength={2}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
        />
        <FlatList
          data={options}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`pl-6 pb-8 pt-4 pr-2 bg-gray-200 m-2 h-64`}
              disabled={!hasLocation || item.id !== '1'}
              onPress={() => router.navigate(item.screen)}>
              <View style={tw`${!hasLocation || item.id !== '1' ? 'opacity-20' : ''}`}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 120, height: 120, resizeMode: 'contain' }}
                />
                <Text style={tw`mt-2 font-semibold text-lg`}>{item.title}</Text>
                <Icon
                  name="arrowright"
                  type="antdesign"
                  color="white"
                  style={tw`p-2 bg-black rounded-full w-10 h-10 mt-4`}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </Container>
    </>
  );
});
