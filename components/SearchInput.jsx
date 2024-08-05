// Native Components
import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Alert } from 'react-native'

// Icons
import { MaterialIcons } from '@expo/vector-icons';

// Routing Functions
import { usePathname, router } from 'expo-router';

const SearchInput = ({initialQuery}) => {

    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <View className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-md focus:border-secondary items-center flex-row space-x-4">
            <TextInput 
                className="text-base mt-0.5 text-white flex-1"
                value={query}
                placeholder="Search Title"
                placeholderTextColor={'#cdcde0'}
                onChangeText={ (e) => setQuery(e) }
            />
            <TouchableOpacity onPress={()=>{
                if(!query){
                    return Alert.alert("Missing Query", "Please input some text to search across database");
                }
                if(pathName.startsWith('/search')) router.setParams({ query })
                else router.push(`/search/${query}`)
            }}>
                <MaterialIcons name="search" color='#F5004F' size={24} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput