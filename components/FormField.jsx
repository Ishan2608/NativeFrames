import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className="space-y-2">
            <Text className="text-base text-gray-100">{title}</Text>
            <View className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-md focus:border-secondary items-center flex-row">
                <TextInput 
                    className="flex-1 text-white"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={'#7b8b'}
                    onChangeText={handleChangeText}
                    secureTextEntry={title==='Password' && !showPassword}
                />
                {title === 'Password' && (
                    <TouchableOpacity 
                        onPress={()=>{
                            setShowPassword(!showPassword)
                        }
                    }>
                        <MaterialIcons 
                            name={!showPassword ? 'visibility' : 'visibility-off'} 
                            color='#F5004F' 
                            size={24}
                        />
                    </TouchableOpacity>
                )}
            </View>
        
        </View>
    )
}

export default FormField