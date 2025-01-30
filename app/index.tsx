// app/index.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-700">
      <Text className="text-2xl font-bold">
        Bienvenido a HydroEdge
      </Text>
      <Button title="Ir a Login" onPress={() => router.push("/(recetas)")} />
    </View>
  );
}
