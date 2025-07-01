import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  style?: any;
};

export default function Input({ value, onChangeText, placeholder, secureTextEntry, multiline = false, style }: InputProps) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={[styles.input, multiline && { minHeight: 70, textAlignVertical: 'top' }]}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  input: {
    fontSize: 16,
    color: '#222',
    paddingVertical: 12,
  },
});
