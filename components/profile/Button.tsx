// app/components/Button.tsx

import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  style?: string;
  color?: string;
}

const colorButton: Record<string, string> = {
  green: "bg-green-700",
  blue: "bg-blue-600",
  yellow: "bg-yellow-600",
  red: "bg-red-600",
  gray: "bg-gray-600",
};

const styleButton: Record<string, string> = {
  primary: "opacity-100",
  secondary: "opacity-50",
};

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  color,
  style = "primary",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`py-2 px-6 rounded-lg ${colorButton[color]} ${styleButton[style]}`}
    >
      <Text className="text-center text-white text-base">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
