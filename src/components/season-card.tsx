import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Season from '../models/season';
import utilities from '../utilities';

interface Props {
  Season: Season;
}

const SeasonCard = ({Season}: Props) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        source={{
          uri: utilities.buildMediaUrl(Season.poster_path, 300),
        }}
      />
      <Text style={styles.cardText}>{Season.name}</Text>
      <Text style={styles.cardText}>
          <Text style={styles.episodeNumber}>Episodes: </Text>
          {Season.episode_count}
          </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 13,
    overflow: 'hidden',
    width: 100,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    marginHorizontal: 5,
    paddingBottom: 5
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
  },
  cardText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    textAlign: 'center',
    color: '#5B5656',
    marginTop: 5,
    marginHorizontal: 5,
  },
  episodeNumber:{
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    textAlign: 'center',
  }
});

export default SeasonCard;
