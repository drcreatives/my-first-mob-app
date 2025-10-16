import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MovieDetailsProps {}

const MovieDetails = (props: MovieDetailsProps) => {
    const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>MovieDetails: {id}</Text>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {}
});
