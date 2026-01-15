import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function BookingSuccess() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-1 bg-white items-center justify-center p-8">
                <View className="bg-green-100 p-6 rounded-full mb-6">
                    <FontAwesome name="check" size={48} color="#10B981" />
                </View>

                <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">Booking Confirmed!</Text>
                <Text className="text-gray-500 text-center mb-12">
                    You have successfully booked a session with Sarah Wilson. A confirmation email has been sent.
                </Text>

                <TouchableOpacity
                    className="bg-primary w-full py-4 rounded-xl mb-4"
                    onPress={() => router.replace('/(tabs)/schedule')}
                >
                    <Text className="text-white text-center font-bold text-lg">View Schedule</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="p-4"
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text className="text-gray-500 font-semibold">Back to Home</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
