import { icons } from "@/constants/icons";
import { TMDB_CONFIG } from "@/services/api";
import { Movie } from "@/services/useMovies";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

interface MovieCardProps {
  movie: Movie;
  variant?: "featured" | "default";
  onPress?: () => void;
  rank?: number;
}

const MovieCard = ({ movie, variant = "default", onPress, rank }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/w500${movie.poster_path}`
    : null;
    console.log("posterUrl:", posterUrl);

  const rating = movie.vote_average.toFixed(1);
  const genres = "Action • Movie"; // You can map genre_ids to actual genre names later

  if (variant === "featured") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="gap-2.5 w-[116px]"
        style={{
          shadowColor: "rgba(206, 206, 251, 0.02)",
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 1,
          shadowRadius: 32,
        }}
      >
        {/* Image Container with Number Overlay */}
        <View className="w-[116px] h-[167px] relative">
          {posterUrl ? (
            <Image
              source={{ uri: posterUrl }}
              className="w-full h-full rounded"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full rounded bg-dark-100" />
          )}

          {/* Rating Badge */}
          <View
            className="absolute top-1.5 right-2 bg-white/30 rounded-[3px] px-1 py-1 gap-2.5"
            style={{
              backdropFilter: "blur(4px)",
            }}
          >
            <View className="flex-row items-center">
              <Image
                source={icons.star as ImageSourcePropType}
                className="w-2 h-2 mr-1"
                tintColor="#FFCD1A"
              />
              <Text className="text-white text-[8px] font-bold leading-none">
                {rating}
              </Text>
            </View>
          </View>

          {/* Large Number Overlay */}
          {rank !== undefined && (
            <View className="absolute -left-2.5 bottom-0" style={{ width: 50, height: 40 }}>
              <MaskedView
                style={{ width: 50, height: 40 }}
                maskElement={
                  <Text
                    className="text-[44px] font-black leading-[40px]"
                  >
                    {rank}
                  </Text>
                }
              >
                <LinearGradient
                  colors={["#FAF9F7", "#9B9EA7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{ 
                    width: 50, 
                    height: 40,
                    shadowColor: "rgba(0, 0, 0, 0.25)",
                    shadowOffset: { width: 4, height: 4 },
                    shadowOpacity: 1,
                    shadowRadius: 10,
                  }}
                />
              </MaskedView>
            </View>
          )}
        </View>

        {/* Title & Description */}
        <View className="gap-2">
          <Text
            className="text-white text-xs font-bold leading-4"
            numberOfLines={2}
          >
            {movie.title}
          </Text>
          <View className="gap-1">
            <Text className="text-light-300 text-[10px] font-medium leading-[14px]">
              {genres}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Default variant
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="w-[110px] gap-3"
      style={{
        shadowColor: "rgba(206, 206, 251, 0.02)",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 32,
      }}
    >
      {/* Image */}
      {posterUrl ? (
        <Image
          source={{ uri: posterUrl }}
          className="w-[104px] h-[151px] rounded"
          resizeMode="cover"
        />
      ) : (
        <View className="w-[104px] h-[151px] rounded bg-dark-100" />
      )}

      {/* Title & Description */}
      <View className="gap-2">
        <Text
          className="text-white text-xs font-bold leading-4"
          numberOfLines={2}
        >
          {movie.title}
        </Text>
        <View className="gap-1">
          {/* Rating */}
          <View className="flex-row items-center gap-0.5">
            <Image
              source={icons.star as ImageSourcePropType}
              className="w-2.5 h-2.5"
              tintColor="#FFCD1A"
            />
            <Text className="text-white text-[10px] font-bold leading-none w-4">
              {rating}
            </Text>
          </View>
          {/* Genre */}
          <Text className="text-light-300 text-[10px] font-medium leading-[14px]">
            {genres}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
