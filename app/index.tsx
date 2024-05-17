import { Stack, Link } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';

const options = [
  {
    id: '1',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '2',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatsScreen',
  },
];

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Container>
        <Image
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
        />
        <FlatList
          data={options}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={tw`pl-6 pb-8 pt-4 pr-2 bg-gray-200 m-2 w-40`}>
              <View>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 120, height: 120, resizeMode: 'contain' }}
                />
                <Text style={tw`mt-2 text-center font-semibold text-lg`}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Container>
    </>
  );
}
