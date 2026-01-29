import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const ATTENDANCE_DATA = [
    {
        id: '1',
        code: 'MATH101',
        subject: 'ADVANCED MATHEMATICS',
        group: 'Group: 1',
        faculty: 'Dr. Sarah Wilson',
        seating: 'Room 302, Phase 2',
        lastAttended: 'Jan 28, 2026',
        attended: 18,
        delivered: 20,
        percentage: 90,
        section: 'SEC-A24',
        rollNo: 'FX2026A12'
    },
    {
        id: '2',
        code: 'PHYS201',
        subject: 'CLASSICAL MECHANICS',
        group: 'Group: 2',
        faculty: 'Prof. James Anderson',
        seating: 'Lab 10, Science Block',
        lastAttended: 'Jan 27, 2026',
        attended: 12,
        delivered: 18,
        percentage: 67,
        section: 'SEC-B12',
        rollNo: 'FX2026A12'
    },
    {
        id: '3',
        code: 'CHEM105',
        subject: 'ORGANIC CHEMISTRY',
        group: 'Group: 1',
        faculty: 'Dr. Emily Chen',
        seating: 'Hall 4, Chemistry Wing',
        lastAttended: 'Jan 26, 2026',
        attended: 15,
        delivered: 15,
        percentage: 100,
        section: 'SEC-A24',
        rollNo: 'FX2026A12'
    },
    {
        id: '4',
        code: 'ENG102',
        subject: 'MODERN ENGLISH LIT',
        group: 'Group: 3',
        faculty: 'Prof. Robert Taylor',
        seating: 'Main Auditorium',
        lastAttended: 'Jan 25, 2026',
        attended: 22,
        delivered: 25,
        percentage: 88,
        section: 'SEC-C08',
        rollNo: 'FX2026A12'
    }
];

export default function AttendanceScreen() {
    const router = useRouter();

    const getRingColor = (percent: number) => {
        if (percent >= 85) return '#10B981'; // Green
        if (percent >= 75) return '#0061FF'; // Brand Blue
        return '#F97316'; // Orange
    };

    return (
        <View className="flex-1 bg-[#F8FAFC]">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="px-6 pt-12 pb-4 flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center bg-white rounded-full shadow-sm"
                >
                    <Ionicons name="chevron-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text className="text-xl font-nunito-extrabold text-[#1E293B]">Attendance</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Aggregate Bar */}
                <View className="px-6 mt-4">
                    <View className="bg-white rounded-2xl p-4 flex-row justify-between items-center shadow-sm border border-gray-100">
                        <Text className="text-[#1E293B] font-nunito-extrabold text-sm tracking-wider uppercase">Aggregate Attendance</Text>
                        <LinearGradient
                            colors={['#F97316', '#FCA5A5']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="px-4 py-1 rounded-lg"
                        >
                            <Text className="text-white font-nunito-extrabold text-sm">88%</Text>
                        </LinearGradient>
                    </View>
                </View>

                {/* Subject Cards */}
                <View className="px-6 mt-6">
                    {ATTENDANCE_DATA.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.8}
                            onPress={() => router.push({ pathname: "/attendance/[id]", params: { id: item.id } })}
                            className="bg-white rounded-3xl mb-6 shadow-sm border border-gray-100 overflow-hidden"
                        >
                            {/* Card Top Section */}
                            <View className="p-5">
                                <View className="flex-row justify-between items-start mb-4">
                                    <View className="flex-1">
                                        <Text className="text-gray-400 font-nunito-bold text-[10px] mb-1">{item.code}</Text>
                                        <Text className="text-[#1E293B] font-nunito-extrabold text-sm leading-5">{item.subject}</Text>
                                    </View>
                                    {/* Group Ribbon style */}
                                    <View className="bg-orange-100 px-3 py-1 rounded-bl-xl rounded-tr-xl flex-row items-center">
                                        <Text className="text-orange-600 font-nunito-bold text-[10px] uppercase">{item.group}</Text>
                                    </View>
                                </View>

                                <View className="h-px bg-gray-50 mb-4" />

                                <View className="flex-row items-center justify-between">
                                    <View className="space-y-2 flex-1">
                                        <View className="flex-row items-center">
                                            <Text className="text-gray-400 font-nunito-medium text-xs w-28">Faculty:</Text>
                                            <Text className="text-[#1E293B] font-nunito-bold text-xs">{item.faculty}</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Text className="text-gray-400 font-nunito-medium text-xs w-28">Faculty Seating:</Text>
                                            <Text className="text-gray-500 font-nunito-medium text-xs">{item.seating}</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Text className="text-gray-400 font-nunito-medium text-xs w-28">Last Attended:</Text>
                                            <Text className="text-gray-500 font-nunito-medium text-xs">{item.lastAttended}</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Text className="text-gray-400 font-nunito-medium text-xs w-28">Attended/Delivered:</Text>
                                            <Text className="text-gray-500 font-nunito-medium text-xs">{item.attended}/{item.delivered}</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Text className="text-gray-400 font-nunito-medium text-xs w-28">Duty Leaves:</Text>
                                            <Text className="text-gray-500 font-nunito-medium text-xs">0</Text>
                                        </View>
                                    </View>

                                    {/* Percentage Circle Ring */}
                                    <View className="w-16 h-16 items-center justify-center">
                                        <View className="w-16 h-16 rounded-full border-4 border-gray-100 items-center justify-center">
                                            <View
                                                className="w-16 h-16 rounded-full border-4 absolute border-t-transparent border-r-transparent"
                                                style={{
                                                    borderColor: getRingColor(item.percentage),
                                                    transform: [{ rotate: `${(item.percentage / 100) * 360 - 90}deg` }]
                                                }}
                                            />
                                            <Text className="text-[#1E293B] font-nunito-extrabold text-xs">{item.percentage}%</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Card Bottom Section (Standard academic info) */}
                            <View className="bg-blue-50/50 px-5 py-3 flex-row justify-between items-center">
                                <View className="flex-row items-center">
                                    <Text className="text-blue-400 font-nunito-bold text-[10px] uppercase">Section: </Text>
                                    <Text className="text-blue-600 font-nunito-bold text-[10px]">{item.section}</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Text className="text-orange-400 font-nunito-bold text-[10px] uppercase">Roll No: </Text>
                                    <Text className="text-orange-600 font-nunito-bold text-[10px]">{item.rollNo}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
