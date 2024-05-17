import { SafeAreaView } from 'react-native';
import tw from 'twrnc';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={tw`flex flex-1 p-6`}>{children}</SafeAreaView>;
};
