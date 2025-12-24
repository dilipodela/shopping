import { Stack } from "expo-router";
import { useState } from "react";
import SideDrawer from "../components/common/SideDrawer";
import ProductDetailModal from "../components/product/ProductDetailModal";
import SplashScreen from "../components/SplashScreen";
import { BagProvider } from "../context/BagContext";
import { DrawerProvider } from "../context/DrawerContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ProductDetailProvider } from "../context/ProductDetailContext";
import "./global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  return (
    <FavoritesProvider>
      <BagProvider>
        <ProductDetailProvider>
          <DrawerProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                animationDuration: 250
              }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
              <ProductDetailModal />
              <SideDrawer />
              {isSplashVisible && <SplashScreen onFinish={() => setSplashVisible(false)} />}
            </GestureHandlerRootView>
          </DrawerProvider>
        </ProductDetailProvider>
      </BagProvider>
    </FavoritesProvider>
  );
}
