import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'

import Movie from '../models/movie';
import utilities from '../utilities';



interface props {
    Movie: Movie
}

const MovieItem = ({ Movie }: props) => {
    return (
        <View style={styles.mainContainer}>
            <Image source={{
                uri: utilities.buildMediaUrl(Movie.poster_path, 500)
            }}
                style={styles.stretch} />

            <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{Movie.title}</Text>
                <Text style={styles.movieDate}>Year: {Movie.release_date?.substring(0, 4)}</Text>
            </View>

            <View style={styles.rateContainer}>
                <ProgressCircle percent={Movie.vote_average * 10}
                    radius={30}
                    borderWidth={3}
                    color="#4DE75C"
                    bgColor="#FFFFFF"
                >
                    <Text style={{ fontSize: 18, color: "#837878" }}>{(Movie.vote_average * 10) + '%'}</Text>
                </ProgressCircle>

                <Text style={styles.rateText}>{Movie.vote_count} votes</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    stretch: {
        width: 80,
        height: 80,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    mainContainer: {
        marginBottom: 5,
        flexDirection: 'row',
        borderColor: "#C4C4C4",
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 2,
        alignItems: 'center'
    },
    textContainer: {
        height: "100%",
        padding: 10,
        flexGrow: 1,
        maxWidth: "60%",
        maxHeight: 200,
        justifyContent: 'space-between'
    },
    movieDate: {
        fontFamily: "Roboto-Regular",
        color: "#5B5656"
    },
    movieTitle: {
        fontSize: 18,
        fontFamily: "Roboto-Medium"
    },
    rateContainer:{
        alignItems: 'center',
        justifyContent: 'space-around',
        marginRight: 10
    },
    rateText: {
        fontFamily: "Roboto-Regular",
        color: "#5B5656"
    }
})

export default MovieItem;