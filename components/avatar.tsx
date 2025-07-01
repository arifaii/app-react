import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type AvatarProps = {
  uri: string;
  size?: number;
  borderColor?: string;
};

export default function Avatar({ uri, size = 50, borderColor = '#2563eb' }: AvatarProps) {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, borderColor }]}>
      <Image source={{ uri }} style={[styles.image, { width: size - 6, height: size - 6, borderRadius: (size - 6) / 2 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
});
