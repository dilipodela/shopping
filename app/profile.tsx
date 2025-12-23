import { View } from "react-native";
import BottomNavBar from "../components/home/BottomNavBar";
import ProfileScreen from "../components/profile/ProfileScreen";

export default function ProfilePage() {
    return (
        <View className="flex-1 bg-white">
            <ProfileScreen />
            <BottomNavBar activeTab="Profile" />
        </View>
    );
}
