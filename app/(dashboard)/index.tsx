// app/(dashboard)/index.tsx

import React, { useEffect } from "react";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { View } from "react-native";

import { useSensores } from "@/context/SensoresContext";
import { useCultivos } from "@/context/CultivosContext";

import SensorSeccion from "@/components/dashboard/SensorSeccion";
import CultivoCard from "@/components/dashboard/CultivoCard";
import EtapasCard from "@/components/dashboard/EtapasCard";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export default function DashboardScreen() {
  const { selectedCultivo } = useCultivos();
  const { fetchSensores } = useSensores();

  useEffect(() => {
    fetchSensores();
  }, [selectedCultivo, fetchSensores]);

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      className="flex-1 "
      contentFit="cover"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      {/* Barra Superior */}
      <TopBar />
      {(selectedCultivo && (
        <>
          <View className="flex-row justify-around p-4">
            <EtapasCard />
            <CultivoCard />
          </View>
          <SensorSeccion />
          {/* <ActuadorSeccion /> */}
        </>
      )) || (
        <>
          <View className="flex-1 justify-center items-center">
            <Button
              text="Seleccionar Cultivo"
              onPress={() => router.push("/(cultivos)")}
              color="green"
            />
          </View>
        </>
      )}
      <Footer />
    </ImageBackground>
  );
}
