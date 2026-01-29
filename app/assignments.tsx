import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const HOMEWORK_DATA = [
    { id: 1, subject: 'Math', icon: '🧮', description: 'Exercises 21—23, p.15', status: 'Assigned', statusColor: 'bg-[#FFF7ED]', textColor: 'text-[#FF6600]' },
    { id: 2, subject: 'History', icon: '🏛️', description: 'Read Chapter 4 and summarize key events...', status: 'Completed', statusColor: 'bg-[#ECFDF5]', textColor: 'text-[#10B981]' },
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
        <View className="flex-1 bg-[#F8FAFC]">
            <StatusBar barStyle="dark-content" />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Header Section */}
                <View className="px-6 pt-12 pb-4">
                    <TouchableOpacity onPress={() => router.back()} className="mb-6 w-10 h-10 items-center justify-center">
                        <Ionicons name="chevron-back" size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text className="text-3xl font-nunito-extrabold text-[#1E293B]">My study</Text>
                </View>

                {/* Homework Section */}
                <View className="px-6 mt-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-nunito-bold text-[#1E293B]">Homework</Text>
                        <TouchableOpacity
                            onPress={() => router.push('/homework')}
                            className="w-8 h-8 rounded-full bg-white shadow-sm items-center justify-center"

                        >
                            <Ionicons name="arrow-forward" size={18} color="#1E293B" />
                        </TouchableOpacity>
                    </View>

                    {HOMEWORK_DATA.map((item) => (
                        <TouchableOpacity key={item.id} className="bg-white rounded-[32px] p-5 mb-4 shadow-sm flex-row items-center border border-white">
                            <View className="w-12 h-12 bg-[#F8FAFC] rounded-2xl items-center justify-center mr-4">
                                <Text className="text-2xl">{item.icon}</Text>
                            </View>
                            <View className="flex-1">
                                <View className="flex-row justify-between items-center mb-1">
                                    <Text className="text-lg font-nunito-bold text-[#1E293B]">{item.subject}</Text>
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
                <View className="px-6 mt-4 flex-row justify-between">
                    <TouchableOpacity
                        onPress={() => router.push('/lectures')}
                        className="w-[48%] bg-[#0061FF] rounded-[32px] p-5 h-56 justify-between shadow-xl shadow-blue-500/20"
                    >
                        <View>
                            <View className="w-20 h-20 mb-4 items-center justify-center">
                                <View className="absolute bg-white/20 w-16 h-16 rounded-full" />
                                <Ionicons name="book" size={40} color="white" />
                            </View>
                            <Text className="text-white font-nunito-extrabold text-lg leading-tight">Lectures</Text>
                        </View>
                        <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center self-end">
                            <Ionicons name="arrow-forward" size={20} color="white" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/tests')}
                        className="w-[48%] bg-[#F29393] rounded-[32px] p-5 h-56 justify-between shadow-xl shadow-red-500/10"
                    >
                        <View>
                            <View className="w-20 h-20 mb-4 items-center justify-center">
                                <View className="absolute bg-white/20 w-16 h-16 rounded-full" />
                                <Ionicons name="color-palette" size={40} color="white" />
                            </View>
                            <Text className="text-white font-nunito-extrabold text-lg leading-tight">Tests</Text>
                        </View>
                        <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center self-end">
                            <Ionicons name="arrow-forward" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Exam Results Section */}
                <View className="px-6 mt-10">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-nunito-bold text-[#1E293B]">Exam results</Text>
                        <TouchableOpacity className="w-8 h-8 rounded-full bg-white shadow-sm items-center justify-center">
                            <Ionicons name="arrow-forward" size={18} color="#1E293B" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-white rounded-[40px] p-6 shadow-2xl shadow-black/5">
                        <View className="flex-row justify-between items-center mb-8">
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 bg-yellow-400 rounded-xl items-center justify-center mr-3">
                                    <Ionicons name="star" size={20} color="white" />
                                </View>
                                <Text className="text-lg font-nunito-extrabold text-[#1E293B]">Average TYT score</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="arrow-up" size={20} color="#10B981" />
                                <Text className="text-3xl font-nunito-extrabold text-[#1E293B] ml-1">350.5</Text>
                            </View>
                        </View>

                        {/* Custom Chart */}
                        <View className="h-48 flex-row items-end justify-between px-2 pt-10">
                            {CHART_DATA.map((item, index) => {
                                const isHighlighted = index === 5; // Highlight "3 Jan"
                                return (
                                    <View key={index} className="flex-1 items-center">
                                        {isHighlighted && (
                                            <View className="absolute -top-12 bg-white px-2 py-1.5 rounded-xl shadow-lg border border-gray-100 z-10 items-center">
                                                <Text className="text-[8px] text-[#94A3B8] font-nunito-bold">3 Jan, 2025</Text>
                                                <Text className="text-[10px] text-[#1E293B] font-nunito-extrabold">342.5</Text>
                                            </View>
                                        )}
                                        <LinearGradient
                                            colors={isHighlighted ? ['#0061FF', '#60A5FA'] : ['#F1F5F9', '#F8FAFC']}
                                            style={{ height: `${item.score}%`, width: 32, borderRadius: 10 }}
                                            className="shadow-sm"
                                        />
                                        <Text className="text-[8px] text-[#94A3B8] font-nunito-bold mt-3">{item.day}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
