import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const ATTENDANCE_LOGS = [
    { id: '1', date: '17', month: 'NOV', arrival: '08:10 AM', departure: '10:19 AM', status: 'Present' },
    { id: '2', date: '16', month: 'NOV', arrival: '08:10 AM', departure: '10:19 AM', status: 'Present' },
    { id: '3', date: '15', month: 'NOV', arrival: '08:10 AM', departure: '10:19 AM', status: 'Present' },
    { id: '4', date: '14', month: 'NOV', arrival: '00:00', departure: '00:00', status: 'Absent' },
    { id: '5', date: '13', month: 'NOV', arrival: '08:10 AM', departure: '10:19 AM', status: 'Present' },
    { id: '6', date: '12', month: 'NOV', arrival: '08:10 AM', departure: '10:19 AM', status: 'Present' },
];

export default function SubjectAttendanceDetails() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    return (
        <View className="flex-1 bg-white">
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
                <TouchableOpacity className="w-10 h-10 items-center justify-center">
                    <Ionicons name="menu-outline" size={24} color="#1E293B" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Month Selector Card */}
                <View className="mt-4 mb-6">
                    <View className="bg-white border border-gray-100 rounded-3xl p-5 flex-row justify-between items-center shadow-sm">
                        <View className="flex-row items-center">
                            <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mr-4">
                                <Ionicons name="calendar" size={20} color="#0061FF" />
                            </View>
                            <Text className="text-[#1E293B] font-nunito-extrabold text-base">November, 2025</Text>
                        </View>
                        <TouchableOpacity className="flex-row items-center">
                            <Text className="text-[#0061FF] font-nunito-bold text-xs mr-1">Export</Text>
                            <Ionicons name="download-outline" size={14} color="#0061FF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Daily Logs */}
                {ATTENDANCE_LOGS.map((log) => (
                    <View key={log.id} className="bg-white border border-gray-100 rounded-3xl mb-4 flex-row overflow-hidden shadow-sm">
                        {/* Date Left Section */}
                        <View className={`w-20 items-center justify-center py-4 ${log.status === 'Present' ? 'bg-green-50' : 'bg-red-50'}`}>
                            <Text className={`text-xl font-nunito-extrabold ${log.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>{log.date}</Text>
                            <Text className={`text-[10px] font-nunito-bold ${log.status === 'Present' ? 'text-green-600/60' : 'text-red-600/60'}`}>{log.month}</Text>
                        </View>

                        {/* Mid Section (Arrival/Departure) */}
                        <View className="flex-1 p-4 justify-center">
                            <View className="flex-row items-center mb-2">
                                <Text className="text-gray-300 font-nunito-bold text-[10px] uppercase w-20">Arrival</Text>
                                <Text className="text-[#1E293B] font-nunito-extrabold text-xs">{log.arrival}</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="text-gray-300 font-nunito-bold text-[10px] uppercase w-20">Departure</Text>
                                <Text className="text-[#1E293B] font-nunito-extrabold text-xs">{log.departure}</Text>
                            </View>
                        </View>

                        {/* Status Right Section */}
                        <View className="pr-4 justify-center">
                            <View className={`px-4 py-1.5 rounded-full ${log.status === 'Present' ? 'bg-green-500 shadow-green-500/30' : 'bg-red-500 shadow-red-500/30'}`}>
                                <Text className="text-white font-nunito-extrabold text-[10px]">{log.status}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
