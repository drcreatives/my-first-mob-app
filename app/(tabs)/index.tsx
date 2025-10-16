import MovieCard from "@/components/movie-card";
import SearchInput from "@/components/search-input";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useMovies } from "@/services/useMovies";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ImageSourcePropType, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { movies, loading, error } = useMovies();

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg as ImageSourcePropType}
        className="absolute z-0 inset-0 w-full h-full"
      />
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 100, minHeight: "100%" }}
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

        {/* Popular Movies Section */}
        <View className="mt-8">
          <Text className="text-white text-lg font-bold mb-3.5">
            Popular movies
          </Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#AB8BFF" className="my-10" />
          ) : error ? (
            <Text className="text-red-500 text-center my-10">{error}</Text>
          ) : (
            <FlatList
              data={movies.slice(0, 10)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ gap: 24 }}
              renderItem={({ item, index }) => (
                <MovieCard
                  movie={item}
                  variant="featured"
                  rank={index + 1}
                  onPress={() => router.push(`/movies/${item.id}`)}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
