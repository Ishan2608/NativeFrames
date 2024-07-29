import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const SearchInput = ({value, placeholder, handleChangeText}) => {
    return (
        <View className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-md focus:border-secondary items-center flex-row space-x-4">
            <TextInput 
                className="text-base mt-0.5 text-white flex-1"
                value={value}
                placeholder={placeholder}
                placeholderTextColor={'#7b8b'}
                onChangeText={handleChangeText}
            />
            <TouchableOpacity>
                <MaterialIcons name="search" color='#F5004F' size={24} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput