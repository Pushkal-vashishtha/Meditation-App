import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AppGradient from '@/components/AppGradient'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { TimerContext } from '@/context/timerContext'

const AdjustMeditationDuration = () => {

    const {setDuration} = useContext(TimerContext);
    const handlePress = (duration:number) =>{
        setDuration(duration);
        router.back();
    }

  return (
    <View className='flex-1 relative'>
        <AppGradient colors={["#161e2e" ,"#0a4d4a","#766e67"]}>
            <Text>Adjust</Text>
            <Pressable onPress={() =>  router.back()}
            className="absolute top-10 left-6 z-8"
          >
            <AntDesign name="leftcircleo" size={39} color="white" />

            </Pressable>
            <View className='justify-center h-4/5'>
            <Text className='text-center font-bold text-xl text-white mb-8'>Adjust your Duration</Text>
            <View>

                <CustomButton
                title="10 seconds"
                onPress={()=>handlePress(10)}
                containerStyles='mb-5'/>
                <CustomButton
                title="5 minutes"
                onPress={()=>handlePress(5*60)}
                containerStyles='mb-5'/>
                <CustomButton
                title="10 minutes"
                onPress={()=>handlePress(10*60)}
                containerStyles='mb-5'/><CustomButton
                title="20 minutes"
                onPress={()=>handlePress(20*60)}
                containerStyles='mb-5'/>
                
            </View>
            </View>
        </AppGradient>
    </View>
  )
}

export default AdjustMeditationDuration;