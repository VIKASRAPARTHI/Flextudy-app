import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const LESSONS = [
    // Course Guide mock data
    { id: 1, title: 'Introduction video', duration: '22:00 Mins', status: 'completed' },
    { id: 2, title: 'Advanced Fundamentals', duration: '45:00 Mins', status: 'locked' },
    { id: 3, title: 'Strategic Planning', duration: '30:00 Mins', status: 'locked' },
    { id: 4, title: 'Practical Execution', duration: '60:00 Mins', status: 'locked' },
    { id: 5, title: 'Case Study Highlights', duration: '40:00 Mins', status: 'locked' },
    { id: 6, title: 'Final Review', duration: '15:00 Mins', status: 'locked' },
];

export default function CourseGuideScreen() {
    const router = useRouter();
    const { id, owned } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState<'Study Plan' | 'Assignment'>('Study Plan');

    // Convert owned to boolean
    const isOwned = owned === 'true';

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
                <Text className="text-xl font-nunito-extrabold text-white">Course Guide</Text>
                <TouchableOpacity className="w-10 h-10 items-center justify-center bg-white/20 rounded-full">
                    <Ionicons name="share-social-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 110, paddingTop: 30 }}
                >
                    {/* Tab Selector */}
                    <View className="px-6 mb-8">
                        <View className="flex-row bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                            {['Study Plan', 'Assignment'].map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    style={{ flex: 1 }}
                                    className={`py-3 rounded-xl items-center ${activeTab === tab ? 'bg-white shadow-sm border border-gray-100' : ''}`}
                                    onPress={() => setActiveTab(tab as any)}
                                >
                                    <Text className={`text-sm font-nunito-bold ${activeTab === tab ? 'text-[#0061FF]' : 'text-gray-400'}`}>
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {activeTab === 'Study Plan' ? (
                        <View className="px-6">
                            <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-6">Course Modules</Text>

                            {LESSONS.map((lesson) => (
                                <TouchableOpacity
                                    key={lesson.id}
                                    className="bg-white rounded-[32px] p-4 mb-4 flex-row items-center border border-gray-50 shadow-sm"
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        if (lesson.id === 1 || isOwned) {
                                            router.push(`/course-video/${id}` as any);
                                        }
                                    }}
                                >
                                    <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${lesson.status === 'completed' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                                        <Ionicons
                                            name={lesson.status === 'locked' ? "lock-closed" : "play"}
                                            size={20}
                                            color={lesson.status === 'completed' ? "#0061FF" : "#94A3B8"}
                                            style={lesson.status === 'completed' ? { marginLeft: 2 } : {}}
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-sm font-nunito-extrabold text-[#1E293B]" numberOfLines={1}>
                                            {lesson.title}
                                        </Text>
                                        <View className="flex-row items-center mt-1">
                                            <Ionicons name="time-outline" size={10} color="#94A3B8" />
                                            <Text className="text-[10px] font-nunito-bold text-gray-400 ml-1">
                                                {lesson.duration}
                                            </Text>
                                        </View>
                                    </View>

                                    {lesson.status === 'completed' && (
                                        <View className="bg-green-50 w-6 h-6 rounded-full items-center justify-center">
                                            <Ionicons name="checkmark-sharp" size={12} color="#22C55E" />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <View className="px-6 py-20 items-center justify-center">
                            <View className="w-16 h-16 bg-gray-50 rounded-full items-center justify-center mb-4">
                                <Ionicons name="document-text-outline" size={32} color="#CBD5E1" />
                            </View>
                            <Text className="text-gray-400 font-nunito-bold">No assignments posted yet</Text>
                        </View>
                    )}
                </ScrollView>

                {/* Fixed Bottom Bar if not owned */}
                {!isOwned && (
                    <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex-row">
                        <TouchableOpacity className="w-14 h-14 bg-gray-50 rounded-2xl items-center justify-center border border-gray-100 mr-4">
                            <Ionicons name="bookmark-outline" size={24} color="#1E293B" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 bg-[#0061FF] h-14 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/20"
                            onPress={() => alert('Proceeding to Checkout...')}
                        >
                            <Text className="text-white font-nunito-extrabold text-base">Enroll Now</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}
