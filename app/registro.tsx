import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();

  const [age, setAge] = useState('');
  const [dni, setDni] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onRegister = () => {
    if (
      !age.trim() ||
      !dni.trim() ||
      !profession.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim()
    ) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Aquí podrías agregar la lógica real de registro (API, Firebase, etc)
   Alert.alert('Registro exitoso');
  router.replace('/home'); // Redirige al home
  };

  const goToLogin = () => {
    router.push('/');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.box}>
          <Text style={styles.title}>Crear Cuenta</Text>

          <TextInput
            style={styles.input}
            placeholder="Edad"
            placeholderTextColor="#a1a1a1"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />

          <TextInput
            style={styles.input}
            placeholder="DNI"
            placeholderTextColor="#a1a1a1"
            keyboardType="default"
            value={dni}
            onChangeText={setDni}
          />

          <TextInput
            style={styles.input}
            placeholder="Profesión"
            placeholderTextColor="#a1a1a1"
            keyboardType="default"
            value={profession}
            onChangeText={setProfession}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#a1a1a1"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#a1a1a1"
            secureTextEntry
            autoComplete="password"
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#a1a1a1"
            secureTextEntry
            autoComplete="password"
            textContentType="password"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          />

          <TouchableOpacity style={styles.button} onPress={onRegister} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToLogin} activeOpacity={0.7}>
            <Text style={styles.linkText}>¿Ya tienes cuenta? Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3f7',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    shadowColor: '#00000033',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    marginBottom: 20,
    fontSize: 17,
    color: '#334155',
    backgroundColor: '#f8fafc',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#2563ebaa',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  buttonText: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: '700',
  },
  linkText: {
    color: '#2563eb',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
