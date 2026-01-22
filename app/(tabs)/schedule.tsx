import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

import FilterChips from '@/components/Schedule/FilterChips';
import ScheduleCard, { ScheduleItem } from '@/components/Schedule/ScheduleCard';

const SCOPES = ['Upcoming', 'Completed'];

const UPCOMING_THIS_WEEK: ScheduleItem[] = [
    {
        id: '1',
        title: 'Algebra II',
        tutorName: 'Ms. Carter',
        tutorImage: require('../../assets/images/teacher1.png'), // Using our preferred image
        date: 'Today',
        time: '4:00–4:45 PM',
        platform: 'Zoom',
        status: 'upcoming',
        statusLabel: 'Starts in 35m',
        metaKey: 'Homework due',
        metaValue: 'Quadratic practice set'
    },
    {
        id: '2',
        title: 'Chemistry',
        tutorName: 'Dr. Patel',
        tutorImage: 'https://i.pravatar.cc/150?img=11',
        date: 'Thu',
        time: '5:30–6:15 PM',
        location: 'Classroom 12B',
        platform: 'Group',
        status: 'upcoming',
        statusLabel: 'In 2 days',
        metaKey: 'Prep',
        metaValue: 'Lab safety worksheet'
    },
    {
        id: '3',
        title: 'English',
        tutorName: 'Sara K.',
        tutorImage: 'https://i.pravatar.cc/150?img=9',
        date: 'Fri',
        time: '3:00–3:45 PM',
        platform: 'Google Meet',
        status: 'upcoming',
        statusLabel: 'In 3 days',
        metaKey: 'Focus',
        metaValue: 'Essay outline review'
    }
];

const UPCOMING_NEXT_WEEK: ScheduleItem[] = [
    {
        id: '4',
        title: 'Physics',
        tutorName: 'Juan M.',
        tutorImage: 'https://i.pravatar.cc/150?img=3',
        date: 'Mon',
        time: '4:30–5:15 PM',
        platform: 'Zoom',
        status: 'upcoming',
        statusLabel: 'In 6 days',
        metaKey: 'Topic',
        metaValue: 'Kinematics problems'
    }
];

const COMPLETED_RECENT: ScheduleItem[] = [
    {
        id: '5',
        title: 'Biology',
        tutorName: 'Ava Chen',
        tutorImage: 'https://i.pravatar.cc/150?img=20',
        date: 'Mon • Sep 2',
        time: '4:00–4:45 PM',
        platform: 'Zoom',
        status: 'completed',
        statusLabel: 'Completed'
    },
    {
        id: '6',
        title: 'Geometry',
        tutorName: 'Mr. Lee',
        tutorImage: 'https://i.pravatar.cc/150?img=60',
        date: 'Fri • Aug 30',
        time: '3:00–3:45 PM',
        location: 'Classroom 5A', // Example of physical location
        platform: 'Group',
        status: 'completed',
        statusLabel: 'Completed'
    }
];

const COMPLETED_EARLIER: ScheduleItem[] = [
    {
        id: '7',
        title: 'History',
        tutorName: 'Ms. Carter',
        tutorImage: require('../../assets/images/teacher1.png'),
        date: 'Tue • Aug 20',
        time: '2:00–2:45 PM',
        platform: 'Google Meet',
        status: 'completed',
        statusLabel: 'Completed'
    },
    {
        id: '8',
        title: 'Algebra I',
        tutorName: 'Dr. Patel',
        tutorImage: 'https://i.pravatar.cc/150?img=11',
        date: 'Mon • Aug 12',
        time: '4:00–4:45 PM',
        location: 'Classroom 12B',
        platform: 'Group',
        status: 'completed',
        statusLabel: 'Completed'
    }
];

export default function Schedule() {
    const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed'>('Upcoming');

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
                    {/* Title Header */}
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-2xl font-nunito-extrabold text-white">Schedule</Text>
                        <TouchableOpacity className="p-2">
                            <Ionicons name="search-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Tabs Segmented Control */}
                    <View className="flex-row bg-white/20 p-1.5 rounded-[20px] border border-white/10">
                        {SCOPES.map((scope) => {
                            const isActive = activeTab === scope;
                            return (
                                <Pressable
                                    key={scope}
                                    onPress={() => setActiveTab(scope as any)}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 12,
                                        borderRadius: 16,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: isActive ? 'white' : 'transparent',
                                    }}
                                >
                                    <Text style={{
                                        fontFamily: 'Nunito-Bold',
                                        fontSize: 14,
                                        color: isActive ? '#0061FF' : 'white'
                                    }}>
                                        {scope}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                {/* Content Sheet */}
                <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
                    <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 30 }} showsVerticalScrollIndicator={false}>
                        {activeTab === 'Upcoming' ? (
                            <View className="px-6">
                                {/* This Week */}
                                <Text className="text-lg font-nunito-extrabold text-gray-900 mb-4">This week</Text>
                                {UPCOMING_THIS_WEEK.map(item => <ScheduleCard key={item.id} item={item} />)}

                                {/* Next Week */}
                                <Text className="text-lg font-nunito-extrabold text-gray-900 mb-4 mt-2">Next week</Text>
                                {UPCOMING_NEXT_WEEK.map(item => <ScheduleCard key={item.id} item={item} />)}
                            </View>
                        ) : (
                            <>
                                {/* Filter Chips - Specific for Completed */}
                                <View className="pt-2">
                                    <FilterChips
                                        filters={[
                                            { label: 'Past 30 days', icon: 'calendar-outline' },
                                            { label: 'Subject', icon: 'filter-outline' },
                                            { label: 'Tutor', icon: 'person-outline' },
                                        ]}
                                    />
                                </View>

                                <View className="px-6 mt-4">
                                    {/* Recently Completed */}
                                    <Text className="text-lg font-nunito-extrabold text-gray-900 mb-4">Recently completed</Text>
                                    {COMPLETED_RECENT.map(item => <ScheduleCard key={item.id} item={item} />)}

                                    {/* Earlier */}
                                    <Text className="text-lg font-nunito-extrabold text-gray-900 mb-4 mt-2">Earlier</Text>
                                    {COMPLETED_EARLIER.map(item => <ScheduleCard key={item.id} item={item} />)}
                                </View>
                            </>
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
