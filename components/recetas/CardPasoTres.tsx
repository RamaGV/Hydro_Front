// app/recetas/components/EtapaCardSensores.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../Button";
import { BlurView } from "expo-blur";
// import Slider from "../components/Slider";

interface SensorI {
  type: string;
  min: number; // valor actual mínimo
  max: number; // valor actual máximo
  minBase: number; // límite inferior (ej. 0 para pH)
  maxBase: number; // límite superior (ej. 14 para pH)
  selected: boolean;
}

interface Etapa {
  nombre: string;
  duracion_dias: number;
  ideal_conditions: SensorI[];
}

interface EtapaCardSensoresProps {
  etapa: Etapa;
  index: number;
  isVisible: boolean;
  onConfirm: (index: number, etapa: Etapa, confirm: boolean) => void;
}

function Sensor({
  sensor,
  onPress,
  selected,
}: {
  sensor: SensorI;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <TouchableOpacity
      className={`w-12 h-12 rounded-full border-2 ${
        selected ? "border-yellow-500 bg-yellow-600" : "border-gray-500"
      } flex items-center justify-center`}
      onPress={onPress}
    >
      <Text className={`text-center text-sm text-white`}>{sensor.type}</Text>
    </TouchableOpacity>
  );
}

export default function EtapaCardSensores({
  etapa,
  index,
  onConfirm,
}: EtapaCardSensoresProps) {
  const [editable, setEditable] = useState(false);
  const [sensorSelected, setSensorSelected] = useState<SensorI | null>(null);

  useEffect(() => {
    if (!sensorSelected) {
      setSensorSelected(etapa.ideal_conditions[index] || null);
    }
  }, [etapa, sensorSelected]);

  const handleConfirm = () => {
    onConfirm(index, etapa, true);
    setEditable(false);
  };

  const handleCancelar = () => {
    setEditable(false);
  };

  const handleSensorPress = (sensor: SensorI) => {
    setSensorSelected(sensor);
  };

  // Al cambiar el slider, actualizamos en tiempo real:
  const handleSliderChange = (newMin: number, newMax: number) => {
    if (!sensorSelected) return;
    // Actualizar en "sensorSelected"
    const updatedSensor = { ...sensorSelected, min: newMin, max: newMax };

    setSensorSelected(updatedSensor);

    // También en la lista de sensores de la etapa, para que se conserve
    const updatedConditions = etapa.ideal_conditions.map((s) =>
      s.type === updatedSensor.type ? updatedSensor : s,
    );
    etapa.ideal_conditions = updatedConditions;
  };

  return (
    <BlurView
      intensity={90}
      tint="dark"
      className="mb-6 p-4 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <TouchableOpacity
        className="flex-row justify-between items-center"
        onPress={() => setEditable(!editable)}
      >
        <Text className="text-center text-lg text-gray-200 font-bold">
          Etapa {index + 1}
        </Text>
        <Ionicons
          name={editable ? "chevron-down-outline" : "chevron-forward-outline"}
          size={16}
          color="#999"
        />
      </TouchableOpacity>

      <View className="flex-row justify-between items-center my-4">
        <Text className="text-base text-gray-400">{etapa.nombre}</Text>
        <Text className="text-base text-gray-400 ">
          {etapa.duracion_dias} días
        </Text>
      </View>

      {editable && (
        <View className="p-2">
          <Text className="text-gray-400 mb-4">Sensores</Text>

          <View className="flex-row justify-between p-2">
            {etapa.ideal_conditions.map((sensor, i) => (
              <Sensor
                key={i}
                sensor={sensor}
                onPress={() => handleSensorPress(sensor)}
                selected={sensorSelected?.type === sensor.type}
              />
            ))}
          </View>

          {sensorSelected && (
            <View className="">
              {/* <Slider
                rangeMin={sensorSelected.minBase}
                rangeMax={sensorSelected.maxBase}
                currentMin={sensorSelected.min}
                currentMax={sensorSelected.max}
                onChangeValues={handleSliderChange}
              /> */}
              <View className="flex-row justify-between px-4 mt-2">
                <Text className="text-gray-400">{`Min: ${sensorSelected.min.toFixed(1)}`}</Text>
                <Text className="text-gray-400">{`Max: ${sensorSelected.max.toFixed(1)}`}</Text>
              </View>
            </View>
          )}

          <View className="flex-row justify-around mt-4">
            <Button text="Cancelar" onPress={handleCancelar} color="gray" />
            <Button text="Confirmar" onPress={handleConfirm} color="green" />
          </View>
        </View>
      )}
    </BlurView>
  );
}
