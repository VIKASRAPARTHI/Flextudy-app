import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const teachers = [
    {
        id: 1,
        name: 'Shohag Hasan',
        subject: 'Mathematics',
        location: 'Uttara, Sector 06, Dhaka',
        rating: 5.0,
        students: '1.2k',
        image: 'https://i.pravatar.cc/150?img=11'
    },
    {
        id: 2,
        name: 'Hridoy Ahmed',
        subject: 'English Language',
        location: 'Gulshan 02, Dhaka',
        rating: 4.8,
        students: '850',
        image: 'https://i.pravatar.cc/150?img=12'
    },
];

export default function PopularTeachers() {
    const router = useRouter();

    return (
        <View className="mb-8">
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-xl font-nunito-extrabold text-[#1E293B]">Popular Teachers</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/tutors')}>
                    <Text className="text-sm font-nunito-bold text-[#0061FF]">See all</Text>
                </TouchableOpacity>
            </View>

            {teachers.map((teacher) => (
                <TouchableOpacity
                    key={teacher.id}
                    className="bg-white rounded-[32px] p-4 flex-row items-center mb-4 border border-gray-100 shadow-sm"
                    activeOpacity={0.9}
                    onPress={() => router.push({ pathname: "/tutor/[id]", params: { id: teacher.id } })}
                >
                    <View className="relative">
                        <Image source={{ uri: teacher.image }} className="w-16 h-16 rounded-2xl bg-gray-50" />
                        <View className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                            <Ionicons name="checkmark-circle" size={14} color="#0061FF" />
                        </View>
                    </View>

                    <View className="flex-1 ml-4">
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="text-base font-nunito-bold text-[#1E293B]" numberOfLines={1}>{teacher.name}</Text>
                            <View className="flex-row items-center bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-100">
                                <Ionicons name="star" size={12} color="#F59E0B" />
                                <Text className="text-[11px] font-nunito-extrabold text-orange-600 ml-1">{teacher.rating.toFixed(1)}</Text>
                            </View>
                        </View>

                        <View className="flex-row items-center mb-2">
                            <Text className="text-xs font-nunito-semibold text-gray-500">{teacher.subject}</Text>
                            <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
                            <Text className="text-xs font-nunito-medium text-gray-400">{teacher.students} Students</Text>
                        </View>

                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={12} color="#94A3B8" />
                            <Text className="text-[11px] font-nunito-medium text-gray-400 ml-1" numberOfLines={1}>{teacher.location}</Text>
                        </View>
                    </View>

                    <View className="bg-gray-50 w-10 h-10 rounded-full items-center justify-center ml-2 border border-gray-100">
                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}
