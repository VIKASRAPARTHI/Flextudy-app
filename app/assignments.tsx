import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const HOMEWORK_DATA = [
    { id: 1, subject: 'Math', icon: '🧮', description: 'Exercises 21—23, p.15', status: 'Assigned', statusColor: 'bg-orange-50', textColor: 'text-[#F59E0B]' },
    { id: 2, subject: 'History', icon: '🏛️', description: 'Read Chapter 4 and summarize key events...', status: 'Completed', statusColor: 'bg-blue-50', textColor: 'text-[#0061FF]' },
];

const CHART_DATA = [
    { day: '02.10', score: 30 },
    { day: '20.10', score: 45 },
    { day: '10.11', score: 60 },
    { day: '25.11', score: 50 },
    { day: '08.12', score: 70 },
    { day: '03.01', score: 85 },
    { day: '26.01', score: 65 },
    { day: '12.02', score: 90 },
];

export default function AssignmentsScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#0061FF]">
            <StatusBar barStyle="light-content" />

            {/* Sticky Header */}
            <View className="px-6 pt-12 pb-6 flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center bg-white/20 rounded-full"
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-nunito-extrabold text-white">Assignments</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, paddingTop: 30 }}>
                    {/* Homework Section */}
                    <View className="px-6">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-xl font-nunito-extrabold text-[#1E293B]">Homework</Text>
                            <TouchableOpacity
                                onPress={() => router.push('/homework')}
                                className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
                            >
                                <Ionicons name="arrow-forward" size={18} color="#1E293B" />
                            </TouchableOpacity>
                        </View>

                        {HOMEWORK_DATA.map((item) => (
                            <TouchableOpacity key={item.id} className="bg-white rounded-[32px] p-5 mb-4 shadow-sm flex-row items-center border border-gray-100">
                                <View className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center mr-4">
                                    <Text className="text-2xl">{item.icon}</Text>
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-center mb-1">
                                        <Text className="text-lg font-nunito-extrabold text-[#1E293B]">{item.subject}</Text>
                                        <View className={`${item.statusColor} px-3 py-1 rounded-full`}>
                                            <Text className={`${item.textColor} font-nunito-bold text-[10px] uppercase`}>{item.status}</Text>
                                        </View>
                                    </View>
                                    <Text className="text-[#64748B] font-nunito-medium text-xs leading-5" numberOfLines={1}>
                                        {item.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Modules Grid */}
                    <View className="px-6 mt-6 flex-row justify-between">
                        <TouchableOpacity
                            onPress={() => router.push('/lectures')}
                            className="w-[48%] bg-[#0061FF] rounded-[32px] p-5 h-52 justify-between shadow-xl shadow-blue-500/20"
                        >
                            <View>
                                <View className="w-14 h-14 mb-4 items-center justify-center bg-white/20 rounded-2xl">
                                    <Ionicons name="book" size={28} color="white" />
                                </View>
                                <Text className="text-white font-nunito-extrabold text-lg leading-tight">Lectures</Text>
                            </View>
                            <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center self-end">
                                <Ionicons name="arrow-forward" size={16} color="white" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push('/tests')}
                            className="w-[48%] bg-[#F59E0B] rounded-[32px] p-5 h-52 justify-between shadow-xl shadow-orange-500/10"
                        >
                            <View>
                                <View className="w-14 h-14 mb-4 items-center justify-center bg-white/20 rounded-2xl">
                                    <Ionicons name="color-palette" size={28} color="white" />
                                </View>
                                <Text className="text-white font-nunito-extrabold text-lg leading-tight">Tests</Text>
                            </View>
                            <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center self-end">
                                <Ionicons name="arrow-forward" size={16} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Exam Results Section */}
                    <View className="px-6 mt-10">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-xl font-nunito-extrabold text-[#1E293B]">Exam results</Text>
                            <TouchableOpacity
                                onPress={() => router.push({ pathname: '/progress', params: { tab: 'Marks' } })}
                                className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
                            >
                                <Ionicons name="arrow-forward" size={18} color="#1E293B" />
                            </TouchableOpacity>
                        </View>

                        <View className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex-row">
                            <View className="w-1.5 h-full bg-[#F59E0B]" />
                            <View className="flex-1 p-6">
                                <View className="flex-row justify-between items-end mb-4">
                                    <View>
                                        <Text className="text-gray-900 font-nunito-extrabold text-lg">Unit Test 3</Text>
                                        <Text className="text-gray-400 font-nunito-bold text-[10px] mt-1">August 22, 2020</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-gray-900 font-nunito-extrabold text-lg">86%</Text>
                                        <Text className="text-[#0061FF] font-nunito-bold text-[8px] uppercase">Passed</Text>
                                    </View>
                                </View>
                                <View className="flex-row justify-between items-center pt-4 border-t border-gray-50">
                                    <View>
                                        <Text className="text-gray-500 font-nunito-bold text-xs">Mathematics</Text>
                                        <Text className="text-gray-500 font-nunito-bold text-[10px]">92/100</Text>
                                    </View>
                                    <Text className="text-[#0061FF] font-nunito-extrabold text-xs">Grade A+</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
