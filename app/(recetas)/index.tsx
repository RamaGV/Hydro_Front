// app/recetas/index.tsx

import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useRecetas } from "../../context/RecetasContext";
import RecetaCard from "../../components/recetas/RecetaCard";
import { ImageBackground } from "expo-image";
import Footer from "../../components/Footer";

export default function RecetasScreen() {
  const { recetas: recipes } = useRecetas();
  const router = useRouter();

  const handleSelect = (recipeId: string) => {
    const recipe = recipes.find((r) => r._id === recipeId);
    if (recipe) {
    //   router.push(`/recetas/${recipe._id}`);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      className="flex-1"
      contentFit="cover"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      {/* Título */}
      <View className="p-4 bg-gray-900 border-b-2 border-gray-800 shadow-lg">
        <Text className="text-center text-2xl font-bold text-gray-200">
          Recetas Disponibles
        </Text>
      </View>

      {/* Lista de recetas */}
      <FlatList
        className="p-4 shadow-xl shadow-gray-800"
        data={recipes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <RecetaCard receta={item} onPress={() => handleSelect(item._id)} />
        )}
        ListFooterComponent={
          <TouchableOpacity
            className="bg-blue-700 p-4 rounded-lg mt-6 shadow-md items-center"
            onPress={() => router.push("/(recetas)/crearReceta")}
          >
            <Text className="text-xl font-bold text-white">
              + Crear Nueva Receta
            </Text>
          </TouchableOpacity>
        }
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-8">
            No hay recetas disponibles
          </Text>
        }
      />
      <Footer />
    </ImageBackground>
  );
}
