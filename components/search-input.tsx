import { icons } from "@/constants/icons";
import * as React from "react";
import {
    Image,
    ImageSourcePropType,
    TextInput,
    View
} from "react-native";

interface SearchInputProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchInput = ({ placeholder, onPress, value, onChangeText }: SearchInputProps) => {
  return (
    <View
      className="flex-row items-center gap-2.5 px-3.5 py-2 w-full rounded-[30px] bg-dark-200"
      style={{
        shadowColor: "rgba(206, 206, 251, 0.02)",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 32,
      }}
    >
      <Image
        source={icons.search as ImageSourcePropType}
        className="size-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        className="flex-1 text-sm text-light-200 font-normal"
        placeholder={placeholder}
        placeholderTextColor="#A8B5DB"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onPress}
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchInput;
