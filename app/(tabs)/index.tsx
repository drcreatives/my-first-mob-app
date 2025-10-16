import SearchInput from "@/components/search-input";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ImageSourcePropType, ScrollView, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg as ImageSourcePropType}
        className="absolute z-0 inset-0 w-full h-full"
      />
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={icons.logo as ImageSourcePropType}
          className="w-12 h-10 mx-auto mt-20 mb-6"
        />
        
        <SearchInput 
          placeholder="Search through 300+ movies online"
          onPress={() => { router.push('/search') }}
        />
      </ScrollView>
    </View>
  );
}
