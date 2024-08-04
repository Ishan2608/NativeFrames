import React from 'react'
import { useState } from 'react'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'


const Home = () => {
  const {data:posts, refetch} = useAppWrite(getAllPosts);
  const {data:latest} = useAppWrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }


  return (
    <SafeAreaView className="bg-primary px-4 flex-1">
      <FlatList
        data={ posts }
        keyExtractor={ (item) => item.$id }
        renderItem={ ( {item} ) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
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

              <Trending posts={latest ?? [] } />

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