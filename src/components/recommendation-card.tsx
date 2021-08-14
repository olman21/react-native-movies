import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Movie from '../models/movie';
import utilities from '../utilities';

interface props {
  ImagePath: string;
  Title: string;
}

const RecommendationCard = ({ImagePath, Title}: props) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        source={{
          uri: utilities.buildMediaUrl(ImagePath, 300),
        }}
      />
      <Text style={styles.cardText}>{Title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 13,
    overflow: 'hidden',
    width: 155,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  cardImage: {
    width: '100%',
    height: 90,
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
  },
  cardText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    textAlign: 'center',
    color: '#5B5656',
    marginVertical: 5,
  },
});

export default RecommendationCard;
