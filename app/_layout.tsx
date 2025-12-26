import { DancingScript_700Bold, useFonts } from "@expo-google-fonts/dancing-script";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import OnboardingScreen from "../components/common/OnboardingScreen";
import SideDrawer from "../components/common/SideDrawer";
import ProductDetailModal from "../components/product/ProductDetailModal";
import SplashScreen from "../components/SplashScreen";
import { BagProvider } from "../context/BagContext";
import { DrawerProvider } from "../context/DrawerContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ProductDetailProvider } from "../context/ProductDetailContext";
import { UserActivityProvider } from "../context/UserActivityContext";
import "./global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      // FOR TESTING: Force show onboarding
      // const value = await AsyncStorage.getItem('hasSeenOnboarding');
      // setHasSeenOnboarding(value === 'true');
      setHasSeenOnboarding(false);
    } catch (e) {
      setHasSeenOnboarding(false);
    }
  };

  const handleOnboardingFinish = () => {
    setHasSeenOnboarding(true);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FavoritesProvider>
      <BagProvider>
        <ProductDetailProvider>
          <DrawerProvider>
            <UserActivityProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                {hasSeenOnboarding === false ? (
                  <OnboardingScreen onFinish={handleOnboardingFinish} />
                ) : (
                  <>
                    <Stack screenOptions={{
                      headerShown: false,
                      animation: 'slide_from_right',
                      animationDuration: 250
                    }}>
                      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                    <ProductDetailModal />
                    <SideDrawer />
                  </>
                )}
                {isSplashVisible && <SplashScreen onFinish={() => setSplashVisible(false)} />}
              </GestureHandlerRootView>
            </UserActivityProvider>
          </DrawerProvider>
        </ProductDetailProvider>
      </BagProvider>
    </FavoritesProvider>
  );
}
