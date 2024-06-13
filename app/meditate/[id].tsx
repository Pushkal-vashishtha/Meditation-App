import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import meditation_Images from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";
import { TimerContext } from "@/context/timerContext";

const Meditate = () => {
  const { id } = useLocalSearchParams();

 // const [secRemaining, setSecRemaining] = useState(10);
 const {duration:secRemaining, setDuration} = useContext(TimerContext)
  const [isMeditating, setISMeditaing] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isAudio, setAudio] = useState(false);
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (secRemaining === 0) {
      setISMeditaing(false);
      return;
    }
    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secRemaining, isMeditating]);

  useEffect(()=>{
    return ()=>{
      setDuration(10);
      audioSound?.unloadAsync();
    }
  },[audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (secRemaining === 0) setDuration(10);

    setISMeditaing(!isMeditating);

    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();
    if (status?.isLoaded && !isAudio) {
      await sound.playAsync();
      setAudio(true);
    } else {
      await sound.pauseAsync();
      setAudio(false);
    }
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };
  
  const handleAdjustDuration =()=>{
    if(isMeditating) toggleMeditationSessionStatus();
    router.push('/(modal)/adjust-meditation-duration')
  }
  const formatedTimeMinutes = String(Math.floor(secRemaining / 60)).padStart(
    2,
    "0"
  );
  const formatedTimeSeconds = String(secRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditation_Images[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0 ,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-10 left-6 z-8"
          >
            <AntDesign name="leftcircleo" size={39} color="white" />
          </Pressable>
          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full h-44 w-44 justify-center items-center ">
              <Text className="text-3xl text-blue-800 font-rmono">
                {formatedTimeMinutes}:{formatedTimeSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
          <CustomButton
              title="Adjust Duration"
              onPress={handleAdjustDuration}
              
            />
            <CustomButton
              title={isMeditating ? "Stop":"Start Meditating"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-4"
            />
            
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
