// app/(profile)/login.tsx

import { View, Text, Alert } from "react-native";
import { useUser } from "@/context/UserContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Logo from "@/components/profile/Logo";
import Footer from "@/components/profile/Footer";
import axios from "axios";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Para manejar la navegación
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.4:5000/api/auth/login",
        {
          email,
          password,
        },
      );
      const { user } = response.data;
      Alert.alert("Éxito", "Inicio de sesión exitoso");
      setUser(user);
      router.push("/(dashboard)");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        console.error("Detalles del error:", error.response?.data);
      } else {
        console.error("Error desconocido:", error);
        Alert.alert("Error", "Algo salió mal. Inténtalo de nuevo.");
      }
    }
  };
  return (
    <View className="flex-1 w-full bg-gray-100 justify-center items-center">
      {/* Logo */}
      <Logo />

      {/* Título */}
      <Text className="text-2xl font-bold text-green-700 mb-6">Ingresar</Text>

      {/* Campos de Entrada */}
      <View className="w-4/5">
        <InputField
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Botón de Login */}
      <Button
        text="INGRESAR"
        style="bg-green-700 w-4/5 mb-4"
        onPress={handleLogin}
      />

      {/* Footer */}
      <Footer />
    </View>
  );
}
