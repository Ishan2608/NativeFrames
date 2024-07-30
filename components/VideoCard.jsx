import React from 'react'
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Video, ResizeMode } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

const VideoCard = ( {video: {title, thumbnail, video}, creator: { username, avatar }} ) => {
    const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">

                <View className="border border-secondary rounded-lg justify-center items-center p-0.5  w-[48px] h-[46px]">
                    <Image 
                        source={{uri:avatar}} 
                        className="w-full h-full rounded-lg" 
                        resizeMode='cover'    
                    />
                </View>

                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white text-sm" numberOfLines={1}> {title} </Text>
                    <Text className="text-xs text-gray-100 font-regular" numberOfLines={1}> {username} </Text>
                </View>
            </View>

            <View className="pt-2">
                <MaterialIcons name="menu" size={24} color="#F5004F"/>
            </View>
        </View>

        {play ? (
            <Video
                source={{ uri: video }}
                className="w-full h-60 rounded-xl mt-3"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                    setPlay(false);
                    }
                }}
            />
        ) : (
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={()=> setPlay(true)}
                className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">

                <Image source={{uri: thumbnail}} 
                    className="w-full h-full rounded-xl mt-3"
                    resizeMode='cover'
                />

                <MaterialIcons name="play-circle-fill" size={25} color="#F5004F" className="absolute" resizeMode="contain"/>

            </TouchableOpacity>
        )}

    </View>
  )
}

export default VideoCard