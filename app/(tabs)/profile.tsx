import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
    const { signOut, user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.replace('/(auth)/login');
    };

    // Dynamic profile data from AuthContext
    const profile = {
        name: user?.user_metadata?.full_name || "Student",
        id: user?.id ? user.id.slice(0, 8).toUpperCase() : "11542556",
        email: user?.email || "student@example.com",
        address: user?.user_metadata?.address || "No Address Set",
        image: user?.user_metadata?.avatar_url || "https://i.pravatar.cc/300?img=11"
    };

    const menuItems = [
        { label: "Edit Profile", icon: "create-outline" as const },
        { label: "My Teacher's List", icon: "school-outline" as const },
        { label: "Boost My Profile", icon: "rocket-outline" as const },
        { label: "Saved Items", icon: "bookmark-outline" as const },
        { label: "Help", icon: "help-circle-outline" as const },
        { label: "Referral", icon: "share-social-outline" as const },
        { label: "Log Out", icon: "log-out-outline" as const, action: handleLogout, isLogout: true },
    ];

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header Gradient */}
            <LinearGradient
                colors={['#2563EB', '#3B82F6']} // Blue gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="h-52 rounded-b-[40px] pt-14 px-6"
            >
                {/* Top Nav Row */}
                <View className="flex-row justify-between items-center mb-6">
                    {/* Back button removed, placeholder for alignment */}
                    <View className="w-10 h-10" />

                    <Text className="text-white text-xl font-nunito-bold">My Profile</Text>

                    <TouchableOpacity className="w-10 h-10 items-center justify-center">
                        <Ionicons name="create-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* Content Container (Non-scrollable) */}
            <View className="flex-1 -mt-20">
                {/* Profile Card */}
                <View className="mx-5 bg-white rounded-[30px] p-5 flex-row shadow-sm shadow-black/5 mb-6">
                    <Image
                        source={{ uri: profile.image }}
                        className="w-28 h-28 rounded-2xl bg-gray-200"
                    />

                    <View className="ml-4 flex-1 justify-center space-y-1.5">
                        <Text className="text-blue-600 font-nunito-bold text-lg">{profile.name}</Text>

                        <Text className="text-blue-500 font-nunito-bold text-xs">
                            ID: <Text className="text-gray-600 font-nunito-medium">{profile.id}</Text>
                        </Text>

                        <Text className="text-blue-500 font-nunito-bold text-xs">
                            Mail: <Text className="text-gray-600 font-nunito-medium">{profile.email}</Text>
                        </Text>

                        <Text className="text-blue-500 font-nunito-bold text-xs">
                            Address: <Text className="text-gray-600 font-nunito-medium flex-wrap">{profile.address}</Text>
                        </Text>
                    </View>
                </View>

                {/* Menu List */}
                <View className="px-5 space-y-4">
                    {/* Using space-y-4 to add gap between items */}
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={item.action}
                            className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm shadow-gray-50 mb-3"
                        >
                            <View className="w-10 h-10 items-center justify-center">
                                <Ionicons
                                    name={item.icon}
                                    size={22}
                                    color={item.isLogout ? '#DC2626' : '#2563EB'}
                                />
                            </View>

                            <Text className={`flex-1 ml-3 font-nunito-bold text-base ${item.isLogout ? 'text-red-500' : 'text-gray-700'}`}>
                                {item.label}
                            </Text>

                            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bottom Nav Placeholder Area (Handled by TabBar but adding space) */}
                <View className="h-20" />
            </View>
        </View>
    );
}
