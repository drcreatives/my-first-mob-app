import { icons } from "@/constants/icons";
import * as React from "react";
import {
    Image,
    ImageSourcePropType,
    Text,
    TouchableOpacity
} from "react-native";

interface SearchInputProps {
  placeholder: string;
  onPress?: () => void;
}

const SearchInput = ({ placeholder, onPress }: SearchInputProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
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
        className="w-4 h-4"
        tintColor="#AB8BFF"
      />
      <Text className="flex-1 text-sm text-light-200 leading-7 font-normal">
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchInput;
