import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const ATTENDANCE_DATA = [
    {
        id: '1',
        subject: 'ADVANCED MATHEMATICS',
        faculty: 'Dr. Sarah Wilson',
        lastAttended: 'Jan 28, 2026',
        attended: 18,
        delivered: 20,
        percentage: 90,
    },
    {
        id: '2',
        subject: 'CLASSICAL MECHANICS',
        faculty: 'Prof. James Anderson',
        lastAttended: 'Jan 27, 2026',
        attended: 12,
        delivered: 18,
        percentage: 67,
    },
    {
        id: '3',
        subject: 'ORGANIC CHEMISTRY',
        faculty: 'Dr. Emily Chen',
        lastAttended: 'Jan 26, 2026',
        attended: 15,
        delivered: 15,
        percentage: 100,
    },
    {
        id: '4',
        subject: 'MODERN ENGLISH LIT',
        faculty: 'Prof. Robert Taylor',
        lastAttended: 'Jan 25, 2026',
        attended: 22,
        delivered: 25,
        percentage: 88,
    }
];

export default function AttendanceScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAttendance = ATTENDANCE_DATA.filter(item =>
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getAccentColor = (percent: number) => {
        return percent >= 75 ? '#0061FF' : '#F59E0B';
    };

    return (
        <View className="flex-1 bg-[#0061FF]">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="px-6 pt-12 pb-10">
                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center bg-white/20 rounded-full"
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-nunito-extrabold text-white">Attendance</Text>
                    <View className="w-10" />
                </View>

                {/* Aggregate Summary */}
                <View className="bg-white/10 rounded-3xl p-6 flex-row justify-between items-center border border-white/10">
                    <View>
                        <Text className="text-white/60 font-nunito-bold text-[10px] uppercase tracking-wider mb-1">Overall Presence</Text>
                        <Text className="text-white font-nunito-extrabold text-3xl">88.5%</Text>
                    </View>
                    <View className="bg-white px-4 py-2 rounded-xl shadow-sm">
                        <Text className="text-[#0061FF] font-nunito-extrabold text-xs">Good Standing</Text>
                    </View>
                </View>
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40, paddingTop: 30 }}
                >
                    <View className="px-6">

                        {/* Subject Cards */}
                        <Text className="text-[#1E293B] font-nunito-extrabold text-lg mb-6">Course Attendance</Text>

                        {filteredAttendance.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.9}
                                onPress={() => router.push({ pathname: "/attendance/[id]", params: { id: item.id } })}
                                className="bg-white rounded-[32px] mb-6 shadow-sm border border-gray-100 overflow-hidden flex-row"
                            >
                                <View style={{ backgroundColor: getAccentColor(item.percentage) }} className="w-1.5 h-full" />
                                <View className="flex-1 p-5">
                                    <View className="flex-row justify-between items-start mb-4">
                                        <Text className="text-[#1E293B] font-nunito-extrabold text-base leading-5 flex-1 pr-4" numberOfLines={2}>
                                            {item.subject}
                                        </Text>

                                        <View className="items-end">
                                            <Text style={{ color: getAccentColor(item.percentage) }} className="font-nunito-extrabold text-lg">
                                                {item.percentage}%
                                            </Text>
                                            <Text className="text-gray-400 font-nunito-bold text-[8px] uppercase">Attendance</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row justify-between items-center pt-4 border-t border-gray-50">
                                        <View className="flex-row items-center">
                                            <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center mr-3">
                                                <Ionicons name="person-outline" size={14} color="#64748B" />
                                            </View>
                                            <View>
                                                <Text className="text-gray-400 font-nunito-bold text-[8px] uppercase">Faculty</Text>
                                                <Text className="text-[#1E293B] font-nunito-bold text-[11px]">{item.faculty}</Text>
                                            </View>
                                        </View>

                                        <View className="items-end">
                                            <Text className="text-gray-400 font-nunito-bold text-[8px] uppercase">Ratio</Text>
                                            <Text className="text-[#1E293B] font-nunito-extrabold text-xs">
                                                {item.attended} / {item.delivered}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}

                        {filteredAttendance.length === 0 && (
                            <View className="items-center justify-center py-20">
                                <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center mb-4">
                                    <Ionicons name="calendar-outline" size={32} color="#CBD5E1" />
                                </View>
                                <Text className="text-gray-400 font-nunito-bold">No records found</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

