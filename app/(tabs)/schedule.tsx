import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { FilterChips } from '../../components/Schedule/FilterChips';
import ScheduleCard from '../../components/Schedule/ScheduleCard';

const UPCOMING_SCHEDULE = [
    {
        id: '1',
        title: 'Mathematics',
        instructor: 'Dr. Sarah Wilson',
        time: '10:00 AM - 11:30 AM',
        date: '22 Jan 2026',
        type: 'Live Class',
        status: 'Upcoming',
        image: 'https://i.pravatar.cc/150?img=32' // Will be updated to teacher1.png logic if needed
    },
    {
        id: '2',
        title: 'Physics',
        instructor: 'Prof. James Bond',
        time: '02:00 PM - 03:30 PM',
        date: '22 Jan 2026',
        type: 'Live Class',
        status: 'Upcoming',
        image: 'https://i.pravatar.cc/150?img=32'
    }
];

const COMPLETED_SCHEDULE = [
    {
        id: '3',
        title: 'Chemistry',
        instructor: 'Dr. Elena Gilbert',
        time: '09:00 AM - 10:30 AM',
        date: '21 Jan 2026',
        type: 'Recorded',
        status: 'Completed',
        image: 'https://i.pravatar.cc/150?img=32'
    }
];

const TABS = ['Upcoming', 'Completed'];

export default function Schedule() {
    const [activeTab, setActiveTab] = useState('Upcoming');

    const scheduleData = activeTab === 'Upcoming' ? UPCOMING_SCHEDULE : COMPLETED_SCHEDULE;

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={['#0061FF', '#F0F9FF', '#FFFFFF']}
                locations={[0, 0.3, 0.6]}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }}
            />

            <View className="flex-1 pt-12">
                {/* Header Section */}
                <View className="px-5 pb-6">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-2xl font-nunito-extrabold text-white">Schedule</Text>
                        <TouchableOpacity className="w-10 h-10 items-center justify-center">
                            <Ionicons name="search-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <FilterChips
                        tabs={TABS}
                        activeTab={activeTab}
                        onTabPress={setActiveTab}
                    />
                </View>

                {/* Content Sheet */}
                <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className="flex-1"
                        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 30, paddingBottom: 100 }}
                    >
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-lg font-nunito-extrabold text-gray-900">
                                {activeTab} Classes
                            </Text>
                        </View>

                        {scheduleData.map((item) => (
                            <ScheduleCard key={item.id} {...item} />
                        ))}

                        {scheduleData.length === 0 && (
                            <View className="items-center justify-center py-20">
                                <Text className="text-gray-400 font-nunito-bold text-base">No {activeTab.toLowerCase()} classes found</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
