// app/dashboard/components/BottomNavBar.tsx

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BottomNavBar() {
  return (
    <View className="bg-gray-900 flex-row justify-around items-center py-3 absolute bottom-0 w-full">
      {/* Botón Home */}
      <TouchableOpacity
        className="items-center"
        onPress={() => console.log("Home")}
      >
        <Ionicons name="home-outline" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs mt-1">Home</Text>
      </TouchableOpacity>

      {/* Botón Messages */}
      <TouchableOpacity
        className="items-center"
        onPress={() => console.log("Messages")}
      >
        <Ionicons name="chatbubble-outline" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs mt-1">Messages</Text>
      </TouchableOpacity>

      {/* Botón Camera */}
      <TouchableOpacity
        className="items-center"
        onPress={() => console.log("Camera")}
      >
        <Ionicons name="camera-outline" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs mt-1">Camera</Text>
      </TouchableOpacity>

      {/* Botón Settings */}
      <TouchableOpacity
        className="items-center"
        onPress={() => console.log("Settings")}
      >
        <Ionicons name="settings-outline" size={24} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs mt-1">Settings</Text>
      </TouchableOpacity>
    </View>
  );
}
