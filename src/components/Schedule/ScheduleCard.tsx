import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

export interface ScheduleItem {
    id: string;
    title: string;
    tutorName: string;
    tutorImage: any;
    date: string;
    time: string;
    platform: string;
    status: 'upcoming' | 'completed';
    statusLabel: string;
    metaKey?: string;
    metaValue?: string;
    location?: string;
}

export default function ScheduleCard({ item }: { item: ScheduleItem }) {
    const isUpcoming = item.status === 'upcoming';

    return (
        <View className="bg-white p-4 rounded-3xl mb-4 border border-gray-100 shadow-sm shadow-gray-200">
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                    <Image
                        source={typeof item.tutorImage === 'string' ? { uri: item.tutorImage } : item.tutorImage}
                        className="w-12 h-12 rounded-2xl bg-gray-100 mr-3"
                    />
                    <View>
                        <Text className="text-gray-900 font-nunito-bold text-base">{item.title}</Text>
                        <Text className="text-gray-500 font-nunito-medium text-xs">{item.tutorName}</Text>
                    </View>
                </View>
                <View className={`px-3 py-1 rounded-full ${isUpcoming ? 'bg-blue-50' : 'bg-green-50'}`}>
                    <Text className={`text-[10px] font-nunito-extrabold ${isUpcoming ? 'text-blue-600' : 'text-green-600'}`}>
                        {item.statusLabel}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center justify-between pt-3 border-t border-gray-50">
                <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                    <Text className="text-gray-600 font-nunito-medium text-xs ml-1">{item.date}</Text>
                </View>
                <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={14} color="#6B7280" />
                    <Text className="text-gray-600 font-nunito-medium text-xs ml-1">{item.time}</Text>
                </View>
                <View className="flex-row items-center">
                    <Ionicons name={item.platform === 'Group' ? 'people-outline' : 'videocam-outline'} size={14} color="#6B7280" />
                    <Text className="text-gray-600 font-nunito-medium text-xs ml-1">{item.platform}</Text>
                </View>
            </View>
        </View>
    );
}
