import { View } from "react-native";
import BagScreen from "../components/bag/BagScreen";
import BottomNavBar from "../components/home/BottomNavBar";

export default function BagPage() {
    return (
        <View className="flex-1 bg-white">
            <BagScreen />
            <BottomNavBar activeTab="Bag" />
        </View>
    );
}
