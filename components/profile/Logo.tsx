// app/components/Logo.tsx

import React from "react";
import { View, Image } from "react-native";

const Logo = () => {
  return (
    <View className="mb-6">
      <Image
        source={{ uri: "https://via.placeholder.com/100" }}
        className="w-24 h-24 bg-slate-500 rounded-full"
      />
    </View>
  );
};

export default Logo;
