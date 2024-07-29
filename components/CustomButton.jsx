import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
        className={`bg-secondary px-6 py-3 rounded-md ${containerStyles} ${isLoading ? 'opacity-50': ''}`}
    >
        <Text className={`text-md text-center text-primary ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton