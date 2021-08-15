import React, {useState, useEffect, createContext} from 'react';
import {FAV_STORAGE_KEY} from '@env';
import {Media} from '../models/multi-search-result';
import AsyncStorage from '@react-native-community/async-storage';
import MediaType from '../models/media-type';

interface FavoriteContextState {
  favorites: Media[];
  addFavorite: (media: Media) => Promise<void>;
  removeFavorite: ({id, media_type}: Media) => Promise<void>;
  isMediaInFavorites: (id:number, mediaType:MediaType) => boolean;
}

const contextDefaultValues: FavoriteContextState = {
  favorites: [],
  addFavorite: () => Promise.resolve(),
  removeFavorite: () => Promise.resolve(),
  isMediaInFavorites: () => false
};

export const FavoriteContext =
  createContext<FavoriteContextState>(contextDefaultValues);

interface Props {
  children: JSX.Element;
}

const getFavoritesFromStorage = async () => {
  const storedFavs = await AsyncStorage.getItem(FAV_STORAGE_KEY);
  if (storedFavs) {
    const favs = JSON.parse(storedFavs) as Media[];
    return favs;
  }

  return [];
};

const saveFavoritesToStorage = async (favs: Media[]) => {
  await AsyncStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favs));
};

const FavoriteContextProvider = ({children}: Props) => {
  const [favorites, setFavorites] = useState<Media[]>([]);

  const addFavorite = async (media: Media) => {
    const favs = [...favorites, media];
    await saveFavoritesToStorage(favs);
    setFavorites(favs);
  };

  const removeFavorite = async ({id, media_type}: Media) => {
    const favs = favorites.filter(f => !(f.id === id && f.media_type === media_type));
    await saveFavoritesToStorage(favs);
    setFavorites(favs);
  };

  const isMediaInFavorites = (id:number, mediaType:MediaType) => favorites.some(f=>f.id === id && f.media_type === mediaType);

  useEffect(() => {
    (async function () {
      const storedFavs = await getFavoritesFromStorage();
      setFavorites(storedFavs);
    })();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isMediaInFavorites
      }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
