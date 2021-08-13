import React, { useState } from 'react';
import SearchComponent from './search';
import axios from 'axios';

import utilities from '../utilities';
import MovieSearchResult from '../models/movie-search-result';
import { FlatList } from 'react-native';
import MovieItem from './movie-item';
import { useEffect } from 'react';




const MovieList = () => {

    const [moviesResult, setMoviesResult] = useState<MovieSearchResult>();

    const searchMovies = async (text: string) =>{
        const apiUrl = utilities.buildApiUrl("search/movie", { query: encodeURI(text) });
        try{
            const movies = await axios.get<MovieSearchResult>(apiUrl);
            return movies.data;
        }
        catch(error){
            console.error(error);
            throw error;
        }
    };
    
    const loadPopular = async () => {
        const apiUrl = utilities.buildApiUrl("movie/popular");
        try{
            const movies = await axios.get<MovieSearchResult>(apiUrl);
            return movies.data;
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }
    
    useEffect(()=>{
        (async function(){
            const popular = await loadPopular();
            setMoviesResult(popular);
        })();
    },[]);

    return <>
        <SearchComponent onSearch={text=>{
            (async function(){
                const searched = await searchMovies(text);
                setMoviesResult(searched);
            })();           
        }}
        onClear={async () => {
            console.log("onClear")
            const popular = await loadPopular();
            setMoviesResult(popular);
        }}  />
        <FlatList data={moviesResult?.results}
                  renderItem={({ item }) => <MovieItem Movie={item}></MovieItem>}
                  keyExtractor={item => item.id.toString() }>

        </FlatList>
    </>
};

export default MovieList;