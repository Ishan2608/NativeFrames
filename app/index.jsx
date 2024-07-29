import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import 'react-native-url-polyfill/auto'

export const Index = () => {

  const {isLoading, isLoggedIn} = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />
  }

  return (
    <SafeAreaView className="bg-primary h-full">
        <View style={styles.container} className="px-10">
            {/* A image for the application */}
            <Image 
              source={require('../assets/Logo.png')} 
              className="w-[100px] h-[80px] border-5 border-red" 
              resizeMode='contain'/>

            {/* A welcoming heading for the user */}
            <Text className="text-white text-3xl text-center">
                Welcome to Frames.AI
            </Text>

            {/* A simple descriptive paragraph */}
            <Text className="text-white text-center">
              A place for you to create and share AI generated images and videos
            </Text>

            {/* A Button to take to authorization pages */}
            <CustomButton
              title="Continue with Email"
              handlePress = {() => router.push('sign-in')}
              containerStyles = ""
            />
        </View>
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1, // Ensures SafeAreaView takes up the full screen
    },
    container: {
      flex: 1,
      gap: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
});