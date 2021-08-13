import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { debounceTime, filter, Subject } from 'rxjs';

export interface SearchParams {
    onSearch?: (term: string) => void,
    onClear?: () => void
 }

const SearchComponent = ({ onSearch, onClear }: SearchParams) => {
    const [searchTerm, setSearchTerm] = useState("");

    const $subject = useRef(new Subject<string>());

    useEffect(()=>{
        const subscription = $subject.current.pipe(
            filter(text=>!!text),
            debounceTime(300)
        )
        .subscribe(text=>{
            onSearch && onSearch(text);
        });

        return () => subscription.unsubscribe();
    },[]);

    const changedText = (text: string) => {
        $subject.current.next(text);
        setSearchTerm(text);
    };
    return <>
        <SearchBar placeholder="Search" onChangeText={changedText} onClear={onClear} lightTheme={true} value={searchTerm}  />
    </>
};

export default SearchComponent;