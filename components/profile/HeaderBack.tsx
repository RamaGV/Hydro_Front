// app/components/HeaderBack.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

interface HeaderBackProps {
  text: string;
  hrefAtras?: string;
  onBack?: () => void;
}

const HeaderBack: React.FC<HeaderBackProps> = ({ text, hrefAtras, onBack }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center pb-6">
      <TouchableOpacity
        onPress={() => (onBack ? onBack() : router.push(hrefAtras))}
      >
        <Ionicons name="arrow-back-outline" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Text className="flex-1 text-center text-2xl font-bold text-gray-200 mr-4">
        {text}
      </Text>
    </View>
  );
};

export default HeaderBack;
