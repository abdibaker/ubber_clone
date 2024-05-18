import { Icon } from '@rneui/themed';
import { router } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'twrnc';

import { Container } from '~/components/Container';
import useNavStore from '~/stores/navStore';

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

export default function Home() {
  const origin = useNavStore((s) => s.origin);
  const setOrigin = useNavStore((s) => s.setOrigin);

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
            setOrigin(details.geometry.location, data.description);
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
              disabled={!origin || item.id !== '1'}
              onPress={() => router.navigate(item.screen)}>
              <View style={tw`${!origin || item.id !== '1' ? 'opacity-20' : ''}`}>
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
}
