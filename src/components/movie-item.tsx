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
                <Text>TV-MA</Text>
                <Text style={styles.movieDate}>{Movie.release_date}</Text>
            </View>

            <ProgressCircle percent={Movie.vote_average * 10}
                radius={30}
                borderWidth={3}
                color="#4DE75C"
                bgColor="#FFFFFF"
                outerCircleStyle={styles.votesCircle}
            >
                <Text style={{ fontSize: 18, color: "#837878" }}>{(Movie.vote_average * 10) + '%'}</Text>
            </ProgressCircle>
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
    votesCircle:{
        marginRight: 10
    },
    textContainer:{
        height: "100%",
        padding: 10,
        flexGrow: 1
    },
    movieDate:{
    },
    movieTitle:{
        fontSize: 18
    }
})

export default MovieItem;