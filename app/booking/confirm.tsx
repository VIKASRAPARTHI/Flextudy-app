import { Stack, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function BookingConfirm() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{ title: 'Confirm Booking', headerBackTitle: 'Tutor' }} />
            <ScrollView className="flex-1 bg-gray-50 p-6">

                <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                    <Text className="text-gray-500 mb-2">You are booking</Text>
                    <Text className="text-xl font-bold text-gray-900 mb-1">Sarah Wilson</Text>
                    <Text className="text-primary font-medium">Mathematics • Demo Class</Text>
                </View>

                <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                    <View className="flex-row justify-between mb-4">
                        <Text className="text-gray-600">Date</Text>
                        <Text className="font-bold text-gray-900">Tue, 12 Oct</Text>
                    </View>
                    <View className="flex-row justify-between mb-4">
                        <Text className="text-gray-600">Time</Text>
                        <Text className="font-bold text-gray-900">10:00 AM - 11:00 AM</Text>
                    </View>
                    <View className="h-[1px] bg-gray-100 my-2" />
                    <View className="flex-row justify-between mt-2">
                        <Text className="text-gray-800 font-bold">Total Price</Text>
                        <Text className="text-primary font-bold text-xl">$25.00</Text>
                    </View>
                </View>

                <Text className="text-gray-500 text-sm text-center mb-8">
                    By confirming, you agree to our Terms of Service.
                </Text>

                <TouchableOpacity
                    className="bg-primary w-full py-4 rounded-xl"
                    onPress={() => router.replace('/booking/success')}
                >
                    <Text className="text-white text-center font-bold text-lg">Confirm & Pay</Text>
                </TouchableOpacity>

            </ScrollView>
        </>
    );
}
