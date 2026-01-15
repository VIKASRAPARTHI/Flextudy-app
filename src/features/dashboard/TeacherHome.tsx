import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function TeacherHome() {
    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="bg-white p-6 pt-16 rounded-b-[30px] shadow-sm">
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-gray-500 text-lg">Welcome back,</Text>
                        <Text className="text-gray-900 text-2xl font-bold">Prof. Sarah</Text>
                    </View>
                    <View className="bg-gray-100 p-2 rounded-full">
                        <FontAwesome name="bell" size={24} color="#4B5563" />
                    </View>
                </View>

                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <Text className="text-blue-600 font-medium mb-1">Upcoming</Text>
                        <Text className="text-3xl font-bold text-blue-900">03</Text>
                        <Text className="text-blue-500 text-sm">Classes today</Text>
                    </View>
                    <View className="flex-1 bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <Text className="text-orange-600 font-medium mb-1">Pending</Text>
                        <Text className="text-3xl font-bold text-orange-900">12</Text>
                        <Text className="text-orange-500 text-sm">Requests</Text>
                    </View>
                </View>
            </View>

            <View className="p-6">
                <Text className="text-xl font-bold text-gray-900 mb-4">Next Class</Text>

                <View className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 border-l-4 border-l-primary">
                    <View className="flex-row justify-between items-start mb-3">
                        <View>
                            <Text className="text-lg font-bold text-gray-900">Advanced Algebra</Text>
                            <Text className="text-gray-500">with John Doe</Text>
                        </View>
                        <View className="bg-blue-100 px-3 py-1 rounded-full">
                            <Text className="text-primary font-bold text-xs">10:00 AM</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="bg-primary w-full py-3 rounded-xl mt-2 flex-row justify-center items-center">
                        <FontAwesome name="video-camera" size={16} color="white" style={{ marginRight: 8 }} />
                        <Text className="text-white font-bold">Join Class</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-xl font-bold text-gray-900 mb-4">Pending Requests</Text>
                {[1, 2].map((i) => (
                    <View key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4">
                        <View className="flex-row items-center mb-3">
                            <View className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
                            <View>
                                <Text className="text-base font-bold text-gray-900">Emily Watson</Text>
                                <Text className="text-gray-500 text-xs">Simulated Request</Text>
                            </View>
                        </View>
                        <View className="flex-row gap-3">
                            <TouchableOpacity className="flex-1 bg-green-500 py-2 rounded-lg">
                                <Text className="text-white text-center font-semibold">Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 bg-gray-100 py-2 rounded-lg">
                                <Text className="text-gray-700 text-center font-semibold">Decline</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

            </View>
        </ScrollView>
    );
}
