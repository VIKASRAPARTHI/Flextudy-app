import { useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const router = useRouter();

    const handleLogin = () => {
        // TODO: Implement Auth
        router.replace('/(tabs)');
    }

    return (
        <View className="flex-1 justify-center bg-white p-6">
            <Text className="text-3xl font-nunito-extrabold text-primary mb-2">Welcome Back</Text>
            <Text className="text-gray-500 font-nunito-medium mb-8">Sign in to continue</Text>

            <View className="mb-4">
                <Text className="mb-2 font-nunito-medium text-gray-700">Email / Phone</Text>
                <TextInput
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl font-nunito-regular"
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                />
            </View>

            <TouchableOpacity
                className="w-full bg-primary p-4 rounded-xl mt-4"
                onPress={handleLogin}
            >
                <Text className="text-white text-center font-nunito-semibold text-lg">Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}
