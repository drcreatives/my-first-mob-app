import { icons } from '@/constants/icons';
import { TMDB_CONFIG } from '@/services/api';
import { useMovieDetails } from '@/services/useMovieDetails';
import {
  formatBudget,
  formatRating,
  formatReleaseDate,
  formatReleaseYear,
  formatRevenue,
  formatRuntime,
  formatVoteCount,
  getRatingCategory
} from '@/utils/movie-helpers';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { movie, loading, error } = useMovieDetails(id || '');

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 bg-primary items-center justify-center px-5">
        <Text className="text-red-500 text-center">{error || 'Movie not found'}</Text>
      </View>
    );
  }

  const posterUrl = movie.poster_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/w500${movie.poster_path}`
    : null;

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Poster Image with Gradient Overlay */}
        <View className="relative w-full h-[447px] rounded-b-sm">
          {posterUrl ? (
            <Image
              source={{ uri: posterUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-dark-200" />
          )}
          
          {/* Status Bar Gradient */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']}
            className="absolute top-0 left-0 right-0 h-[74px]"
          />

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-5 w-12 h-12 rounded-full bg-dark-200/50 items-center justify-center"
          >
            <Image
              source={icons.arrow as ImageSourcePropType}
              className="w-5 h-5"
              tintColor={"#A8B5DB"}
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </TouchableOpacity>

          {/* Play Button - Positioned over image at bottom right */}
          <TouchableOpacity
            className="absolute right-[10px] bottom-[-27px] w-[50px] h-[50px] items-center justify-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 25,
            }}
          >
            <LinearGradient
              colors={['#D6C7FF', '#AB8BFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={icons.play as ImageSourcePropType}
                className="w-[21px] h-[23px]"
                tintColor="#FFFFFF"
                style={{ marginLeft: 3 }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Movie Info Section - 17px from bottom of image */}
        <View className="px-5 mt-[17px]">
          {/* Title and Metadata */}
          <View className="gap-1.5">
            <Text className="text-white text-xl font-bold leading-7">
              {movie.title}
            </Text>
            <View className="flex-row items-center gap-2.5">
              <Text className="text-[#A8B5DB] text-sm leading-6">
                {formatReleaseYear(movie.release_date)}
              </Text>
              <View className="w-[3px] h-[3px] rounded-full bg-[#A8B5DB]" />
              <Text className="text-[#A8B5DB] text-sm leading-6">
                {getRatingCategory(movie)}
              </Text>
              <View className="w-[3px] h-[3px] rounded-full bg-[#A8B5DB]" />
              <Text className="text-[#A8B5DB] text-sm leading-6">
                {formatRuntime(movie.runtime)}
              </Text>
            </View>
          </View>

          {/* Rating and Trending Buttons - 16px gap from title */}
          <View className="flex-row justify-start items-center gap-2.5 mt-4">
            {/* Rating Button */}
            <View className="bg-[#221F3D] rounded px-2.5 py-2 flex-row items-center gap-1.5">
              <Image
                source={icons.star as ImageSourcePropType}
                className="w-3.5 h-3.5"
                tintColor="#FFCD1A"
              />
              <Text className="text-[#A8B5DB] text-xs leading-3">
                {formatRating(movie.vote_average)}/10 ({formatVoteCount(movie.vote_count)})
              </Text>
            </View>

            {/* Trending Badge */}
            <View className="bg-[#221F3D] rounded px-2 py-2 flex-row items-center gap-1">
              <Image
                source={icons.trending as ImageSourcePropType}
                className="w-3.5 h-3.5"
                tintColor="#A8B5DB"
              />
              <Text className="text-[#A8B5DB] text-xs font-semibold leading-3">
                {movie.popularity > 100 ? '1' : Math.floor(movie.popularity / 10)}
              </Text>
            </View>
          </View>
        </View>

        {/* Detailed Info Sections - 135px from image bottom (599 - 464 = 135) */}
        <View className="px-5 mt-[30px] gap-6">
          {/* Overview */}
          {movie.overview && (
            <View className="gap-1">
              <Text className="text-[#A8B5DB] text-xs leading-[15.6px]">
                Overview
              </Text>
              <Text className="text-white text-sm leading-6">
                {movie.overview}
              </Text>
            </View>
          )}

          {/* Release Date and Status */}
          <View className="flex-row items-center gap-8">
            <View className="gap-1">
              <Text className="text-[#A8B5DB] text-xs leading-[15.6px]">
                Release date
              </Text>
              <Text className="text-[#D6C7FF] text-sm font-semibold leading-6">
                {formatReleaseDate(movie.release_date)} (Worldwide)
              </Text>
            </View>
            <View className="gap-1">
              <Text className="text-[#A8B5DB] text-xs leading-[15.6px]">
                Status
              </Text>
              <Text className="text-[#D6C7FF] text-sm font-semibold leading-6">
                {movie.status}
              </Text>
            </View>
          </View>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <View style={{ gap: 8 }}>
              <Text className="text-[#A8B5DB] text-xs leading-[15.6px]">
                Genres
              </Text>
              <View className="flex-row flex-wrap" style={{ gap: 9 }}>
                {movie.genres.map((genre) => (
                  <View
                    key={genre.id}
                    className="bg-[#221F3D] rounded px-2.5 py-1.5"
                  >
                    <Text className="text-white text-xs font-semibold leading-3">
                      {genre.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Countries */}
          {movie.production_countries && movie.production_countries.length > 0 && (
            <View className="gap-1">
              <Text className="text-[#A8B5DB] text-xs leading-[15.6px]">
                Countries
              </Text>
              <View className="flex-row flex-wrap items-center gap-2">
                {movie.production_countries.map((country, index) => (
                  <React.Fragment key={country.iso_3166_1}>
                    <Text className="text-[#D6C7FF] text-sm font-semibold leading-6">
                      {country.name}
                    </Text>
                    {index < movie.production_countries.length - 1 && (
                      <View className="w-[3px] h-[3px] rounded-full bg-[#A8B5DB]" />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
          )}

          {/* Budget and Revenue */}
          <View className="flex-row items-center gap-8">
            <View className="gap-1">
              <Text className="text-[#A8B5DB] text-xs leading-[15.6px]">
                Budget
              </Text>
              <Text className="text-[#D6C7FF] text-sm font-semibold leading-6">
                {formatBudget(movie.budget)}
              </Text>
            </View>
            <View className="gap-1">
              <Text className="text-[#A8B5DB] text-xs leading-[15.6px]">
                Revenue
              </Text>
              <Text className="text-[#D6C7FF] text-sm font-semibold leading-6">
                {formatRevenue(movie.revenue)}
              </Text>
            </View>
          </View>

          {/* Tagline */}
          {movie.tagline && (
            <View className="gap-1">
              <Text className="text-[#A8B5DB] text-xs leading-[15.6px]">
                Tagline
              </Text>
              <Text className="text-[#D6C7FF] text-sm font-semibold leading-6">
                {movie.tagline}
              </Text>
            </View>
          )}

          {/* Production Companies */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <View className="gap-1">
              <Text className="text-[#A8B5DB] text-xs leading-[15.6px]">
                Production Companies
              </Text>
              <View className="flex-row flex-wrap items-center gap-2">
                {movie.production_companies.map((company, index) => (
                  <React.Fragment key={company.id}>
                    <Text className="text-[#D6C7FF] text-sm font-semibold leading-6">
                      {company.name}
                    </Text>
                    {index < movie.production_companies.length - 1 && (
                      <View className="w-[3px] h-[3px] rounded-full bg-[#A8B5DB]" />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
          )}

          {/* Visit Homepage Button */}
          {movie.homepage && (
            <TouchableOpacity
              onPress={() => movie.homepage && Linking.openURL(movie.homepage)}
              className="rounded overflow-hidden"
            >
              <LinearGradient
                colors={['#D6C7FF', '#AB8BFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-2.5 px-5 flex-row items-center justify-center gap-1"
              >
                <Text className="text-[#121212] text-xs font-semibold text-center leading-3">
                  Visit Homepage
                </Text>
                <Image
                  source={icons.arrow as ImageSourcePropType}
                  className="w-4 h-4"
                  tintColor="#121212"
                />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
