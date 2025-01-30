// app/components/dashboard/CultivoCard.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";

import { useCultivos } from "@/context/CultivosContext";
import { LinearGradient } from "expo-linear-gradient";

export default function CultivoCard({ imageUrl }: { imageUrl?: string }) {
  const { selectedCultivo } = useCultivos();
  const router = useRouter();

  const onPress = () => {
    router.push("/(cultivos)");
  };

  return (
    <>
      <BlurView
        intensity={5}
        tint="dark"
        className="w-36 h-36 m-1 rounded-xl overflow-hidden
            bg-gray-900 shadow-xl"
      >
        <TouchableOpacity onPress={onPress} className="flex-1">
          <View className="w-full h-1/3 ">
            <Image
              source={require("@/assets/defaultRecipe.png")}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
            <LinearGradient
              style={{ position: "absolute", width: "100%", height: "100%" }}
              locations={[0, 0.17, 0.27, 0.42, 0.53, 0.66, 0.8, 1]}
              colors={[
                "rgba(75, 75, 75, 0)",
                "rgba(68, 68, 68, 0.11)",
                "rgba(64, 64, 64, 0.3)",
                "rgba(58, 58, 58, 0.4)",
                "rgba(54, 54, 54, 0.5)",
                "rgba(47, 47, 47, 0.6)",
                "rgba(41, 41, 41, 0.8)",
                "rgba(32, 32, 32, 0.9)",
              ]}
            />
          </View>

          {/* Nombre del cultivo seleccionado o Redirije a seleccionar un cultivo */}
          <Text
            className="w-full items-center text-center py-1
            text-gray-500 font-bold border-b-2 border-gray-700"
          >
            Cultivo
          </Text>

          <View className="flex-row justify-around items-center py-5 pr-2">
            <Text className="text-center text-gray-300 ml-3">
              {selectedCultivo ? selectedCultivo.nombre : "Cargar Cultivo"}
            </Text>
            <Ionicons
              name={"chevron-forward-outline"}
              size={16}
              color={"#999"}
            />
          </View>
        </TouchableOpacity>
      </BlurView>
    </>
  );
}
