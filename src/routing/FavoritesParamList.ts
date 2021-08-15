import { Media } from "../models/multi-search-result";

export type FavoritesParamList = {
    FavoriteList: {},
    MovieDetail: {
       movieId: number
    },
    TvShowDetail: {
        tvShowId: number
    }
}