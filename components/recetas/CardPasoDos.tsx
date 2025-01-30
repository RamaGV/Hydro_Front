// components/recetas/CardPasoDos.tsx

import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";
import Button from "../Button";
import InputField from "../InputField";

interface Etapa {
  duracion_dias: number;
  nombre: string;
  complete: boolean;
}

interface EtapaCardNombreProps {
  index: number;
  etapa: Etapa;
  isVisible: boolean;
  onConfirm: (index: number, etapa: Etapa) => void;
}

export default function EtapaCardNombre({
  index,
  etapa,
  isVisible,
  onConfirm,
}: EtapaCardNombreProps) {
  const [duracion_dias, setDuracionDias] = useState(etapa.duracion_dias);
  const [nombre, setNombre] = useState(etapa.nombre);
  const [editable, setEditable] = useState(false);

  const handleConfirm = () => {
    etapa.complete = true;
    onConfirm(index, etapa);
    setEditable(false);
  };

  const handleCancelar = () => {
    setEditable(false);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleDelete = (index: number) => {
    etapa.complete = false;
    onConfirm(index, etapa);
  };

  if (!isVisible) return null;

  return (
    <BlurView
      intensity={90}
      tint="dark"
      className=" mb-6 rounded-lg overflow-hidden"
    >
      <View className="p-4">
        <Text className="text-lg font-semibold text-white mb-2">
          Etapa {index + 1}
        </Text>

        {editable ? (
          <View className="mt-4">
            <InputField
              label="Nombre de la Etapa"
              placeholder="Ejemplo: Germinación"
              value={nombre}
              onChangeText={setNombre}
            />

            <Text className="text-white text-sm mb-2">Duración (días)</Text>
            <View className="bg-gray-800 rounded-lg border border-gray-400 mb-6">
              <Picker
                selectedValue={duracion_dias}
                onValueChange={(value) => setDuracionDias(Number(value))}
                dropdownIconColor="gray"
                className="text-white text-sm"
              >
                {[...Array(101).keys()].map((day) => (
                  <Picker.Item
                    key={day}
                    label={`${day} días`}
                    value={day}
                    color="white"
                  />
                ))}
              </Picker>
            </View>

            <View className="flex-row justify-around">
              <Button text="Cancelar" onPress={handleCancelar} color="gray" />
              <Button text="Confirmar" onPress={handleConfirm} color="green" />
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-around">
            <View className="flex-1 flex-row justify-around p-2">
              <Text className="text-white text-base">
                {nombre || "Sin nombre"}
              </Text>
              <Text className="text-white text-base">
                {duracion_dias || "0"} días
              </Text>
            </View>
            <View className="flex-1 flex-row justify-around m-4">
              {etapa.complete && (
                <Button
                  text={etapa.complete ? "Eliminar" : "+ Agregar"}
                  onPress={
                    etapa.complete ? () => handleDelete(index) : handleEdit
                  }
                  color={etapa.complete ? "red" : "green"}
                  style={etapa.complete ? "secondary" : "primary"}
                />
              )}
              <Button
                text={etapa.complete ? "Editar" : "+ Agregar"}
                onPress={handleEdit}
                color={etapa.complete ? "blue" : "green"}
                style={etapa.complete ? "secondary" : "primary"}
              />
            </View>
          </View>
        )}
      </View>
    </BlurView>
  );
}
