import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';

type searchFn = (term: string) => void;
export interface SearchParams {
    onSearch?: searchFn
 }

const SearchComponent = ({ onSearch }: SearchParams) => {
    const [searchTerm, setSearchTerm] = useState("");

    const changedText = (text: string) => {
        setSearchTerm(text);
        onSearch && onSearch(text);
    };
    return <>
        <SearchBar placeholder="Search" onChangeText={changedText} lightTheme={true} value={searchTerm}  />
    </>
};

export default SearchComponent;