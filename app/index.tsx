import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import beachImage from '@/assets/meditation-images/beach.webp';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import AppGradient from '@/components/AppGradient';
const App = () => {

  const router = useRouter();
  return (
    <View className='flex-1'>
      <ImageBackground
        source={beachImage}
        resizeMode='cover'
        className='flex-1'
      >
        <AppGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}>
          
            <SafeAreaView className='flex-1 mx-5 my-12 justify-between'>
              <View>
                <Text className='text-center text-white font-bold  text-2xl'>Simple Meditation</Text>
                <Text className='text-center text-white text-regular text-l mt-3'>Simplifying Mediataion for Everyone</Text>
              </View>
              <StatusBar style="dark" />
              <View>
                <CustomButton onPress={()=>router.push('/nature-meditate')}
                  title="Get Started"/>
              </View>
            </SafeAreaView>

        </AppGradient>
      </ImageBackground>
    </View>
  );
}

export default App;
