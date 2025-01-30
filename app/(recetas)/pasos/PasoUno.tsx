// app/(recetas)/pasos/PasoUno.tsx

import React, { useState } from "react";
import { View, Alert, TouchableOpacity, Text } from "react-native";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";

import IndicadorDeProceso from "@/components/recetas/IndicadorDeProgreso";
import HeaderBack from "@/components/HeaderBack";
import InputField from "@/components/InputField";

interface PasoUnoProps {
  nombreReceta: string;
  setNombreReceta: (value: string) => void;
  descripcion: string;
  setDescipcion: (value: string) => void;
  onNext: () => void;
}

export default function PasoUno({
  nombreReceta: nombreReceta,
  setNombreReceta: setNombreReceta,
  descripcion: description,
  setDescipcion: setDescription,
  onNext,
}: PasoUnoProps) {
  const [errors, setErrors] = useState({ name: "", description: "" });
  const router = useRouter();

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { name: "", description: "" };

    if (!nombreReceta.trim()) {
      newErrors.name = "El nombre de la receta es obligatorio.";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateInputs()) {
      onNext(); // Avanza al siguiente paso solo si es válido
    } else {
      Alert.alert("Error", "Por favor completa todos los campos.");
    }
  };

  return ( 
    <ImageBackground
      source={require("../../../assets/fondo.png")}
      className="flex-1 p-4"
      contentFit="cover"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <HeaderBack text="Nombre y descripción" onBack={() => router.push("/(recetas)")}  />
      <IndicadorDeProceso etapaActual={1} etapasTotales={3} />

      {/* Inputs */}
      <View className="mt-6 p-4">
        <InputField
          label="Nombre de la Receta"
          placeholder="Ingresa el nombre de la receta"
          value={nombreReceta}
          onChangeText={setNombreReceta}
          error={errors.name}
        />
        <InputField
          label="Descripción"
          placeholder="Escribe una breve descripción"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          error={errors.description}
        />
      </View>

      {/* Botón Siguiente */}
      <View className="absolute bottom-0 left-0 right-0 p-6">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-green-600 py-4 rounded-lg"
        >
          <Text className="text-center text-white text-lg font-bold">
            Siguiente
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
