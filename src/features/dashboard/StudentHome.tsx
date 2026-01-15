import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function StudentHome() {
    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="bg-primary pt-16 pb-8 px-6 rounded-b-[30px]">
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-blue-100 text-lg">Hello,</Text>
                        <Text className="text-white text-2xl font-bold">Alex Johnson</Text>
                    </View>
                    <View className="bg-white/20 p-2 rounded-full">
                        <FontAwesome name="bell" size={24} color="white" />
                    </View>
                </View>

                <View className="bg-white flex-row items-center px-4 py-3 rounded-xl">
                    <FontAwesome name="search" size={20} color="#9CA3AF" />
                    <TextInput
                        className="flex-1 ml-3 text-gray-800"
                        placeholder="Search for tutors, subjects..."
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
            </View>

            <View className="p-6">
                <Text className="text-xl font-bold text-gray-900 mb-4">Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-8">
                    {['Mathematics', 'Science', 'English', 'Music', 'Coding'].map((cat, index) => (
                        <TouchableOpacity key={index} className="bg-white mr-4 px-6 py-3 rounded-full border border-gray-100 shadow-sm">
                            <Text className="text-gray-700 font-medium">{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-gray-900">Nearby Tutors</Text>
                    <TouchableOpacity>
                        <Text className="text-primary font-semibold">See All</Text>
                    </TouchableOpacity>
                </View>

                {/* Dummy Tutor Card */}
                <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4">
                    <View className="flex-row items-center mb-3">
                        <View className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
                        <View>
                            <Text className="text-lg font-bold text-gray-900">Sarah Wilson</Text>
                            <Text className="text-gray-500 text-sm">Mathematics Specialist</Text>
                        </View>
                        <View className="ml-auto flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            <FontAwesome name="star" size={14} color="#FBBF24" />
                            <Text className="ml-1 font-bold text-yellow-700">4.9</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                        <Text className="text-primary font-bold text-lg">$25<Text className="text-gray-400 text-sm font-normal">/hr</Text></Text>
                        <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
                            <Text className="text-white font-semibold">Book Demo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4">
                    <View className="flex-row items-center mb-3">
                        <View className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
                        <View>
                            <Text className="text-lg font-bold text-gray-900">David Chen</Text>
                            <Text className="text-gray-500 text-sm">Physics & Chemistry</Text>
                        </View>
                        <View className="ml-auto flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            <FontAwesome name="star" size={14} color="#FBBF24" />
                            <Text className="ml-1 font-bold text-yellow-700">4.8</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                        <Text className="text-primary font-bold text-lg">$30<Text className="text-gray-400 text-sm font-normal">/hr</Text></Text>
                        <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
                            <Text className="text-white font-semibold">Book Demo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}
