import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <MaterialIcons name='camera-enhance' size={80} color="white"/>
      <Text className="text-xl text-white text-center mt-2"> {title} </Text>
      <Text className="text-sm text-gray-100"> {subtitle} </Text>

      <CustomButton 
        title="Create Video"
        handlePress={()=> router.push('/create')}
        containerStyles="w-full my-5"
      />
    </View>
  )
}

export default EmptyState