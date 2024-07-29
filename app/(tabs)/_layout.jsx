import React from 'react'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; // Import specific icon set
import { useGlobalContext } from '../../context/GlobalProvider';
import { Redirect } from 'expo-router';

const TabsLayout = () => {

    const { loading, isLoggedIn } = useGlobalContext();

    if (!loading && !isLoggedIn) {
        return <Redirect href="/sign-in" />;
    }

  return (
    <>
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#F5004F",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 84,
                },
                headerStyle: {
                    backgroundColor: "#161622", // Dark background for the header
                },
                headerTintColor: "#F5004F", // Text color for the header
            }}
        >
            <Tabs.Screen name="home" options={{
                title: "Home", headerShown: true,
                tabBarIcon: ({color, focused})=>{
                    return <MaterialIcons name="home" size={28} color={focused ? color : "white"} />
                }
            }}/>
            <Tabs.Screen name="bookmark" options={{
                title: "Bookmark", headerShown: true,
                tabBarIcon: ({color, focused}) => {
                    return <MaterialIcons name="book" size={28} color={focused ? color : "white"} />
                }
            }}/>
            <Tabs.Screen name="create" options={{
                title: "Create", headerShown: true,
                tabBarIcon: ({color, focused}) => {
                    return <MaterialIcons name="video-library" size={28} color={focused ? color : "white"} />
                }
            }}/>
            <Tabs.Screen name="profile" options={{
                title: "Profile", headerShown: true,
                tabBarIcon: ({color, focused}) => {
                    return <MaterialIcons name="person" size={28} color={focused ? color : "white"} />
                }
            }}/>
        </Tabs>
        <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default TabsLayout
