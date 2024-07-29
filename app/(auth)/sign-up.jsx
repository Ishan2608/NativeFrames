import React from 'react'
import { useState } from 'react'
import { Text, View, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect, router } from 'expo-router'
import { createUser } from '../../lib/appwrite';
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {

  const { setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext();
  if (isLoggedIn){
    return <Redirect href="./home" />
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email:'',
    password:''
  })

  const submit = async () => {
    
    if(form.username === "" || form.email === "" || form.password === ""){
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setIsSubmitting(true);

    try{
      const result = await createUser(form.email, form.password, form.username);

      // set it to global state
      setUser(result);
      setIsLoggedIn(true);

      // redirect to the home
      router.replace('/home');
    } catch (error){
      Alert.alert('Error', error.message);
    } finally{
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full flex-1 justify-center">
      <View className="px-8">
        <Image 
          source={require('../../assets/Logo.png')} 
          className="w-[100px] h-[80px] border-5 border-red" 
          resizeMode='contain'
        />
        <FormField title="Username" value={form.username} 
            handleChangeText={(e) => setForm({...form, username: e
          })}
        />
        <FormField title="Email" value={form.email} 
            handleChangeText={(e) => setForm({...form, email: e
          })}
        />
        <FormField title="Password" value={form.password} 
            handleChangeText={(e) => setForm({...form, password: e
          })}
        />
        <CustomButton 
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
          textStyles="text-xl"
        />

        <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-white">
              Already have a shopping Account?
              <Link 
                href="sign-in" 
                className='text-secondary ml-2'>
                  Log In
              </Link>
            </Text>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default SignUp
