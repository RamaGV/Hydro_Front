// app/(recetas)/crearReceta.tsx

import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useRouter } from "expo-router";
import PasoUno from "./pasos/PasoUno";
import PasoDos from "./pasos/PasoDos";
// import StepThree from "./steps/StepThree";

export default function CrearReceta() {
    const [nombreReceta, setNombreReceta] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [etapas, setEtapas] = useState([
        {
            nombre: "Germinación",
            duracion_dias: 15,
      ideal_conditions: [
        {
          type: "ph",
          minBase: 3,
          min: 5.3,
          max: 5.7,
          maxBase: 9,
          selected: false,
        },
        {
          type: "EC",
          minBase: 0,
          min: 1.7,
          max: 2.3,
          maxBase: 3,
          selected: false,
        },
        {
          type: "Temp",
          minBase: 15,
          min: 23,
          max: 27,
          maxBase: 30,
          selected: false,
        },
        {
          type: "Hum",
          minBase: 30,
          min: 70,
          max: 80,
          maxBase: 100,
          selected: false,
        },
      ],
      complete: false,
    },
    {
      nombre: "Crecimiento Vegetativo",
      duracion_dias: 25,
      ideal_conditions: [
        {
          type: "ph",
          minBase: 3,
          min: 5.3,
          max: 5.7,
          maxBase: 9,
          selected: false,
        },
        {
          type: "EC",
          minBase: 0,
          min: 1.7,
          max: 2.3,
          maxBase: 3,
          selected: false,
        },
        {
          type: "Temp",
          minBase: 15,
          min: 23,
          max: 27,
          maxBase: 30,
          selected: false,
        },
        {
          type: "Hum",
          minBase: 30,
          min: 70,
          max: 80,
          maxBase: 100,
          selected: false,
        },
      ],
      complete: false,
    },
    {
      nombre: "Prefloración",
      duracion_dias: 30,
      ideal_conditions: [
        {
          type: "ph",
          minBase: 3,
          min: 5.3,
          max: 5.7,
          maxBase: 9,
          selected: false,
        },
        {
          type: "EC",
          minBase: 0,
          min: 1.7,
          max: 2.3,
          maxBase: 3,
          selected: false,
        },
        {
          type: "Temp",
          minBase: 15,
          min: 23,
          max: 27,
          maxBase: 30,
          selected: false,
        },
        {
          type: "Hum",
          minBase: 30,
          min: 70,
          max: 80,
          maxBase: 100,
          selected: false,
        },
      ],
      complete: false,
    },
    {
      nombre: "Floración",
      duracion_dias: 40,
      ideal_conditions: [
        {
          type: "ph",
          minBase: 3,
          min: 5.3,
          max: 5.7,
          maxBase: 9,
          selected: false,
        },
        {
          type: "EC",
          minBase: 0,
          min: 1.7,
          max: 2.3,
          maxBase: 3,
          selected: false,
        },
        {
          type: "Temp",
          minBase: 15,
          min: 23,
          max: 27,
          maxBase: 30,
          selected: false,
        },
        {
          type: "Hum",
          minBase: 30,
          min: 70,
          max: 80,
          maxBase: 100,
          selected: false,
        },
      ],
      complete: false,
    },
  ]);
  const [paso, setPaso] = useState(1);

  const router = useRouter();

  const handleNext = () => {
    setPaso((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPaso((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleCreateRecipe = async () => {
    try {
      const response = await fetch("http://192.168.1.4:5000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombreReceta,
          description: descripcion,
          growth_etapas: etapas,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Receta creada exitosamente.");
        router.push("/(recetas)");
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Error",
          errorData.message || "No se pudo crear la receta.",
        );
      }
    } catch (error) {
      console.error("Error al crear la receta:", error);
      Alert.alert("Error", "Hubo un problema al crear la receta.");
    }
  };

  return (
    <View className="flex-1 bg-gray-900">
      {paso === 1 && (
        <PasoUno
          nombreReceta={nombreReceta}
          setNombreReceta={setNombreReceta}
          descripcion={descripcion}
          setDescipcion={setDescripcion}
          onNext={handleNext}
        />
      )}
      {paso === 2 && (
        <PasoDos
          etapas={etapas}
          setEtapas={setEtapas}
          onNext={handleNext}
          onBack={handlePrev}
        />
      )}
      {/* {step === 3 && (
        <StepThree
          etapas={etapas}
          setEtapas={setEtapas}
          onSubmit={handleCreateRecipe}
          onBack={handlePreviousStep}
        />
      )} */}
    </View>
  );
}
