import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const teachers = [
    { id: 1, name: 'Shohag Hasan', subject: 'Mathematics', location: 'Uttara, Sector 06, Dhaka', rating: 5 },
    { id: 2, name: 'Hridoy Ahmed', subject: 'English', location: 'Gulshan 02, Dhaka', rating: 4.5 },
];

export default function PopularTeachers() {
    const router = useRouter();
    return (
        <View className="mb-8">
            <View className="flex-row justify-between items-center mb-5 px-1">
                <Text className="text-xl font-nunito-extrabold text-gray-900">Popular Teachers</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/tutors')}>
                    <Text className="text-primary font-nunito-bold text-sm">See all</Text>
                </TouchableOpacity>
            </View>

            <View>
                {teachers.map((teacher) => (
                    <View key={teacher.id} className="bg-white p-4 rounded-3xl flex-row items-center justify-between mb-5 shadow-sm shadow-gray-100 border border-gray-50">
                        <View className="flex-row items-center flex-1">
                            <Image
                                source={{ uri: `https://i.pravatar.cc/150?img=${teacher.id + 10}` }}
                                className="w-16 h-16 rounded-2xl bg-gray-100"
                            />
                            <View className="ml-4 flex-1">
                                <Text className="text-base font-nunito-bold text-gray-900 mb-1">{teacher.name}</Text>
                                <View className="flex-row items-center mb-1">
                                    <View className="bg-blue-50 px-2 py-0.5 rounded-md mr-2">
                                        <Text className="text-primary text-[10px] font-nunito-extraBold uppercase">{teacher.subject}</Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center">
                                    <Ionicons name="location-outline" size={12} color="#9CA3AF" />
                                    <Text className="text-gray-400 text-xs ml-1 font-nunito-medium flex-1" numberOfLines={1}>{teacher.location}</Text>
                                </View>
                            </View>
                        </View>

                        <View className="items-end justify-between h-16 pl-2">
                            <View className="flex-row bg-yellow-50 px-1.5 py-0.5 rounded-lg border border-yellow-100">
                                <Ionicons name="star" size={10} color="#F59E0B" style={{ marginTop: 1 }} />
                                <Text className="ml-1 text-[10px] font-nunito-bold text-yellow-700">{teacher.rating}</Text>
                            </View>
                            <TouchableOpacity className="bg-primary px-5 py-2 rounded-full shadow-lg shadow-blue-200">
                                <Text className="text-white text-xs font-nunito-bold">Hire</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
