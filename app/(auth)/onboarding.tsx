import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Onboarding() {
    const router = useRouter();

    return (
        <View className="flex-1 items-center justify-center bg-white p-4">
            <Text className="text-3xl font-bold text-primary mb-4">Welcome to Tutox</Text>
            <Text className="text-lg text-gray-600 text-center mb-8">
                Find the best tutors nearby or start teaching today.
            </Text>

            <TouchableOpacity
                className="bg-primary px-8 py-3 rounded-full"
                onPress={() => router.push('/(auth)/role-selection')}
            >
                <Text className="text-white font-bold text-lg">Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}
