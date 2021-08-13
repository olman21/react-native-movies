import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';

export interface SearchParams {
    onSearch?: (term: string) => void,
    onClear?: () => void
 }

const SearchComponent = ({ onSearch, onClear }: SearchParams) => {
    const [searchTerm, setSearchTerm] = useState("");

    const changedText = (text: string) => {
        setSearchTerm(text);
        onSearch && onSearch(text);
    };
    return <>
        <SearchBar placeholder="Search" onChangeText={changedText} onClear={onClear} lightTheme={true} value={searchTerm}  />
    </>
};

export default SearchComponent;