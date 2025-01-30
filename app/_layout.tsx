// app/_layout.tsx

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { MedidasSensoresProvider } from "@/context/MedidasSensoresContext";
import { ActuadoresProvider } from "@/context/ActuadoresContext";
import { SensoresProvider } from "@/context/SensoresContext";
import { CultivosProvider } from "@/context/CultivosContext";
import { RecetasProvider } from "@/context/RecetasContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RecetasProvider>
          <CultivosProvider>
            <SensoresProvider>
              <ActuadoresProvider>
                <MedidasSensoresProvider>
                  <Stack>
                    <Stack.Screen
                      name="index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(dashboard)/index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(cultivos)/index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(cultivos)/crearCultivo"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(recetas)/index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(recetas)/crearReceta"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                  <StatusBar style="auto" />
                </MedidasSensoresProvider>
              </ActuadoresProvider>
            </SensoresProvider>
          </CultivosProvider>
        </RecetasProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
