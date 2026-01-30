import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const LESSONS = [
    // Course Video mock data
    { id: 1, title: 'Introduction video', duration: '22:00 Mins', status: 'completed', active: true },
    { id: 2, title: 'Advanced Fundamentals', duration: '45:00 Mins', status: 'completed' },
    { id: 3, title: 'Strategic Planning', duration: '30:00 Mins', status: 'locked' },
    { id: 4, title: 'Practical Execution', duration: '60:00 Mins', status: 'locked' },
    { id: 5, title: 'Case Study Highlights', duration: '40:00 Mins', status: 'locked' },
    { id: 6, title: 'Final Review', duration: '15:00 Mins', status: 'locked' },
    { id: 7, title: 'Q&A Session', duration: '25:00 Mins', status: 'locked' },
];

export default function CourseVideoScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const videoSource = require('../../assets/videos/video1.mp4');

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
    });

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
                <Text className="text-xl font-nunito-extrabold text-white">Course Video</Text>
                <TouchableOpacity className="w-10 h-10 items-center justify-center bg-white/20 rounded-full">
                    <Ionicons name="settings-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40, paddingTop: 30 }}
                >
                    {/* Video Player Section */}
                    <View className="px-6 mb-8">
                        <View className="bg-black rounded-[32px] overflow-hidden shadow-lg" style={{ height: 220 }}>
                            <VideoView
                                style={{ width: '100%', height: 220 }}
                                player={player}
                                fullscreenOptions={{ enable: true }}
                                allowsPictureInPicture
                            />
                        </View>
                    </View>

                    {/* Navigation Controls */}
                    <View className="px-6 flex-row mb-10 items-center">
                        <TouchableOpacity className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center border border-blue-100 mr-4 shadow-sm">
                            <Ionicons name="download-outline" size={20} color="#0061FF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-1 h-12 bg-[#0061FF] rounded-2xl flex-row items-center justify-center mr-3 shadow-lg shadow-blue-500/20"
                            activeOpacity={0.8}
                        >
                            <Ionicons name="chevron-back" size={16} color="white" />
                            <Text className="text-white font-nunito-bold text-sm ml-2">Previous</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-1 h-12 bg-gray-50 rounded-2xl flex-row items-center justify-center border border-gray-100 shadow-sm"
                            activeOpacity={0.7}
                        >
                            <Text className="text-gray-500 font-nunito-bold text-sm mr-2">Next</Text>
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    {/* Playlist Header */}
                    <View className="px-6 flex-row justify-between items-center mb-6">
                        <Text className="text-lg font-nunito-extrabold text-[#1E293B]">Course Playlist</Text>
                        <View className="bg-blue-50 px-3 py-1 rounded-lg">
                            <Text className="text-[#0061FF] font-nunito-extrabold text-[10px]">7 MODULES</Text>
                        </View>
                    </View>

                    {/* Lessons List */}
                    <View className="px-6">
                        {LESSONS.map((lesson) => (
                            <TouchableOpacity
                                key={lesson.id}
                                className={`bg-white rounded-[32px] p-4 mb-4 flex-row items-center border ${lesson.active ? 'border-blue-200' : 'border-gray-50'} shadow-sm`}
                                activeOpacity={0.7}
                            >
                                <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${lesson.active ? 'bg-[#0061FF]' : (lesson.status === 'completed' ? 'bg-blue-50' : 'bg-gray-50')}`}>
                                    <Ionicons
                                        name={lesson.status === 'locked' ? "lock-closed" : "play"}
                                        size={20}
                                        color={lesson.active ? "white" : (lesson.status === 'completed' ? "#0061FF" : "#94A3B8")}
                                        style={lesson.status !== 'locked' ? { marginLeft: 2 } : {}}
                                    />
                                </View>

                                <View className="flex-1">
                                    <Text className={`text-sm font-nunito-extrabold ${lesson.active ? 'text-[#0061FF]' : 'text-[#1E293B]'}`} numberOfLines={1}>
                                        {lesson.title}
                                    </Text>
                                    <View className="flex-row items-center mt-1">
                                        <Ionicons name="time-outline" size={10} color="#94A3B8" />
                                        <Text className="text-[10px] font-nunito-bold text-gray-400 ml-1">
                                            {lesson.duration}
                                        </Text>
                                    </View>
                                </View>

                                {lesson.status === 'completed' && !lesson.active && (
                                    <View className="bg-green-50 w-6 h-6 rounded-full items-center justify-center">
                                        <Ionicons name="checkmark-sharp" size={12} color="#22C55E" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
