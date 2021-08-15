import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { FavoriteContext } from "../context/favorites";
import { Media } from "../models/multi-search-result";

interface Props {
    Media: Media
}

const FavoriteButton = ({ Media }: Props) => {

    const {addFavorite, removeFavorite, isMediaInFavorites, favorites} = useContext(FavoriteContext);
    const [isFav, setIsFav] = useState<boolean>(false);
  
    const toggleFavorite = async () => {
      if (isFav) {
        await removeFavorite(Media);
      } else {
        await addFavorite(Media);
      }
    };

    useEffect(()=>{
        setIsFav(isMediaInFavorites(Media.id, Media.media_type));
    },[favorites]);
  
    return (
      <TouchableOpacity onPress={() => toggleFavorite()}>
      { isFav ? (
        <Icon name="favorite" color="red" size={30}></Icon>
      ) : (
        <Icon name="favorite-border" color="red" size={30}></Icon>
      )}
    </TouchableOpacity>
    );
  };

  export default FavoriteButton;