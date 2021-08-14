import React from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import MediaType from '../models/media-type';
import Movie from '../models/movie';
import {Media} from '../models/multi-search-result';
import Person from '../models/Person';
import TVShow from '../models/tvshow';
import utilities from '../utilities';

interface props {
  Media: Media;
}

const PosterImage = ({Media}: props) => {
  let item: Media;
  let path = '';
  switch (Media.media_type) {
    case MediaType.Movie:
    case MediaType.Tv:
      item = Media as Movie;
      path = item.poster_path;
      break;
    case MediaType.Person:
      item = Media as Person;
      path = item.profile_path;
      break;
  }

  return (
    <Image
      source={{
        uri: utilities.buildMediaUrl(path, 500),
      }}
      style={styles.stretch}
    />
  );
};

const InfoContent = ({Media}: props) => {
  let item: Media;
  let title = '';
  let footText;
  switch (Media.media_type) {
    case MediaType.Movie:
      item = Media as Movie;
      title = item.title;
      footText = (
        <Text style={styles.movieDate}>
          Year: {item.release_date?.substring(0, 4)}
        </Text>
      );
      break;
    case MediaType.Tv:
      item = Media as TVShow;
      title = item.name;
      footText = (
        <Text style={styles.movieDate}>
          Year: {item.first_air_date?.substring(0, 4)}
        </Text>
      );
      break;
    case MediaType.Person:
      item = Media as Person;
      title = item.name;
      footText = item.known_for && item.known_for.length > 0 && (
        <Text style={styles.movieDate}>
          <Text style={styles.labelText}>Known For: </Text>
          {item.known_for.map(k => k.title).join(', ')}
        </Text>
      );
      break;
  }

  return (
    <View style={styles.textContainer}>
      <Text style={styles.movieTitle}>{title}</Text>
      {footText}
    </View>
  );
};

const getVoteData = (media: Media) => {
  if (
    media.media_type === MediaType.Movie ||
    media.media_type === MediaType.Tv
  ) {
    const voteAvg = (media as Movie).vote_average;
    const voteTotal = (media as Movie).vote_count;

    return {
      voteAvg,
      voteTotal,
    };
  }

  return null;
};

const mediaLabelColor = (media: Media) => {
    switch (media.media_type) {
        case MediaType.Movie:
          return "#01AE13";
          case MediaType.Tv:
              return "#B80000";
        case MediaType.Person:
            return "#474343"
        default:
            return "#000000";
      }
}

const MovieItem = ({Media}: props) => {
  const voteData = getVoteData(Media);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.stretch}>
        <PosterImage Media={Media} />
        <View style={{
            ...styles.labelWrapper,
            backgroundColor: mediaLabelColor(Media)
        }} >
          <Text style={styles.mediaLabel}>{Media.media_type}</Text>
        </View>
      </View>
      <InfoContent Media={Media} />

      {voteData && (
        <View style={styles.rateContainer}>
          <ProgressCircle
            percent={voteData.voteAvg * 10}
            radius={30}
            borderWidth={3}
            color="#4DE75C"
            bgColor="#FFFFFF">
            <Text style={{fontSize: 18, color: '#837878'}}>
              {voteData.voteAvg * 10 + '%'}
            </Text>
          </ProgressCircle>

          <Text style={styles.rateText}>{voteData.voteTotal} votes</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stretch: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
  },
  mainContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    height: '100%',
    padding: 10,
    flexGrow: 1,
    maxWidth: '60%',
    maxHeight: 200,
    justifyContent: 'space-between',
  },
  movieDate: {
    fontFamily: 'Roboto-Regular',
    color: '#5B5656',
  },
  movieTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  rateContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 10,
  },
  rateText: {
    fontFamily: 'Roboto-Regular',
    color: '#5B5656',
  },
  labelText: {
    fontFamily: 'Roboto-Bold',
    color: '#302E2E',
  },
  mediaLabel: {
    color: '#FFFFFF',
    height: 18,   
    textAlign: 'center',
    fontFamily: "Roboto-Medium"
  },
  labelWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 8,
  },
});

export default MovieItem;
