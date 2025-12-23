import { View } from "react-native";
import FavoritesScreen from "../components/favorites/FavoritesScreen";
import BottomNavBar from "../components/home/BottomNavBar";

export default function FavoritesPage() {
    return (
        <View className="flex-1 bg-white">
            <FavoritesScreen />
            <BottomNavBar activeTab="Favorites" />
        </View>
    );
}
