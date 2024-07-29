import React from 'react'
import { Text, View, Image, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext();

  if (isLoggedIn){
    return <Redirect href="./home" />
  }

  const [form, setForm] = useState({
    email:'',
    password:''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    
    if(form.email === "" || form.password === ""){
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setIsSubmitting(true);

    try{
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      // set it to global state...
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
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
        <FormField title="Email" value={form.email} 
            handleChangeText={(e) => setForm({...form, email: e
          })}
        />
        <FormField title="Password" value={form.password} 
            handleChangeText={(e) => setForm({...form, password: e
          })}
        />
        <CustomButton 
          title="Sign In"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
          textStyles="text-xl"
        />

        <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-white">
              Don't have a shopping Account?
              <Link 
                href="sign-up" 
                className='text-secondary ml-2'>
                  Sign Up
              </Link>
            </Text>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default SignIn