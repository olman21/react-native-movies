import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Person from '../models/Person';
import utilities from '../utilities';

interface props {
  Person: Person;
}

const CastCard = ({Person}: props) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        source={{
          uri: utilities.buildMediaUrl(Person.profile_path, 300),
        }}
      />
      <Text style={styles.cardText}>{Person.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 13,
    overflow: 'hidden',
    width: 90,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    marginHorizontal: 5
  },
  cardImage: {
      width: "100%",
      height: 90,
      borderTopRightRadius: 13,
      borderTopLeftRadius: 13
  },
  cardText: {
      fontFamily: "Roboto-Medium",
      fontSize: 13,
      textAlign: "center",
      color: "#5B5656",
      marginTop: 5,
      marginHorizontal: 5
  }
});

export default CastCard;
