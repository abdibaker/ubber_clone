import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import tw from 'twrnc';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
}

export const Button = forwardRef<TouchableOpacity, ButtonProps>(({ onPress, title }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      style={tw`items-center bg-indigo-500 rounded-[28px] shadow-md p-2`}
      onPress={onPress}>
      <Text style={tw`text-white text-lg font-semibold text-center`}>{title}</Text>
    </TouchableOpacity>
  );
});
