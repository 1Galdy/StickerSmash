import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioPlayer() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    if (isPlaying) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      setIsPlaying(false);
      return;
    }

    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../assets/Hello.mp3'));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
    setIsPlaying(true);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isPlaying) {
        setIsPlaying(false);
      }
    });
  }

  useEffect(() => {
    return () => {
      if (sound) {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title={isPlaying ? "Stop Sound" : "Play Sound"} onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
