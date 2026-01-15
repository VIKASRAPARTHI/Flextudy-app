import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function TutorDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Mock data fetching using ID
    const tutor = {
        name: 'Sarah Wilson',
        subject: 'Mathematics',
        bio: 'Certified Math teacher with 5+ years of experience. I make Algebra and Calculus easy to understand.',
        rating: 4.9,
        students: 120,
        price: 25,
    };

    return (
        <>
            <Stack.Screen options={{ title: tutor.name, headerBackTitle: 'Back' }} />
            <ScrollView className="flex-1 bg-white">
                {/* Header Profile */}
                <View className="items-center py-8 bg-blue-50">
                    <View className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
                    <Text className="text-2xl font-bold text-gray-900">{tutor.name}</Text>
                    <Text className="text-primary font-medium text-lg">{tutor.subject} Expert</Text>

                    <View className="flex-row gap-6 mt-4">
                        <View className="items-center">
                            <View className="bg-white p-2 rounded-full mb-1">
                                <FontAwesome name="star" size={16} color="#FBBF24" />
                            </View>
                            <Text className="font-bold">{tutor.rating}</Text>
                            <Text className="text-gray-500 text-xs">Rating</Text>
                        </View>
                        <View className="items-center">
                            <View className="bg-white p-2 rounded-full mb-1">
                                <FontAwesome name="users" size={16} color="#3B82F6" />
                            </View>
                            <Text className="font-bold">{tutor.students}+</Text>
                            <Text className="text-gray-500 text-xs">Students</Text>
                        </View>
                    </View>
                </View>

                <View className="p-6">
                    <Text className="text-xl font-bold text-gray-900 mb-2">About</Text>
                    <Text className="text-gray-600 leading-6 mb-6">{tutor.bio}</Text>

                    <Text className="text-xl font-bold text-gray-900 mb-4">Availability</Text>
                    <ScrollView horizontal className="flex-row gap-2 mb-8">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                            <View key={day} className="bg-gray-50 p-3 rounded-xl items-center w-16 border border-gray-100">
                                <Text className="text-gray-500 font-medium mb-1">{day}</Text>
                                <Text className="font-bold text-gray-900 text-xs">4 Slots</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Bottom Booking Bar */}
            <View className="p-4 border-t border-gray-100 bg-white safe-bottom">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-gray-500">Hourly Rate</Text>
                    <Text className="text-2xl font-bold text-primary">${tutor.price}</Text>
                </View>
                <TouchableOpacity
                    className="bg-primary w-full py-4 rounded-xl"
                    onPress={() => router.push('/booking/confirm')} // TODO: Create booking flow
                >
                    <Text className="text-white text-center font-bold text-lg">Book Now</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
