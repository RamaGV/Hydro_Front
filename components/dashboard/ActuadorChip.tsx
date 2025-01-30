// app/dashboard/components/ControlChip.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import IconWater from "@/assets/control/iconWater.svg";
import IconFlow from "@/assets/control/iconFlow.svg";
import IconPh from "@/assets/control/iconPh.svg";

interface ControlChipProps {
  controlType: string;
  onPress?: () => void;
  isSelected?: boolean;
}

const controlConfig: Record<string | number, { label: string; Icon: any }> = {
  flujo: {
    label: "Flujo",
    Icon: IconFlow,
  },
  agua: {
    label: "Agua",
    Icon: IconWater,
  },
  phPlus: {
    label: "pH+",
    Icon: IconPh,
  },
  phMinus: {
    label: "pH-",
    Icon: IconPh,
  },
};

export default function ControlIndicator({
  controlType,
  onPress,
  isSelected = false,
}: ControlChipProps) {
  const { label, Icon } = controlConfig[controlType];

  return (
    <View className="items-center">
      <TouchableOpacity>
        <Icon width={50} height={50} />
      </TouchableOpacity>
      <Text className="text-green-400 text-center text-xs">{label}</Text>:
    </View>
  );
}
