import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'

const Home = () => {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    // re call videos -> if any new video appeared
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-primary px-4 flex-1">
      <FlatList
        data={ [ {id:1}, {id:2}, {id:3} ] }
        // data={ [] }
        keyExtractor={ (item) => item.id }
        renderItem={ ( {item} ) => (
          <Text className="text-3xl text-white">  {item.id} </Text>
        )}
        ListHeaderComponent={ () => (
          <View className="my-2 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-sm text-gray-100"> Welcome back </Text>
                <Text className="text-2xl text-white"> NativeFrames </Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={require('../../assets/Logo.png')}
                  className="w-11 h-9"
                  resizeMode='contain'
                />
              </View>

            </View>

            <SearchInput/>

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg mb-3">
                Latest Videos
              </Text>

              <Trending posts={ [{id:1}, {id:2}, {id:3}] ?? [] } />

            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState 
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      
    </SafeAreaView>
  )
}

export default Home