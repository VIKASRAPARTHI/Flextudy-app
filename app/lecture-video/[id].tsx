import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function LectureVideoScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    // Using a sample video for demonstration
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
                <Text className="text-xl font-nunito-extrabold text-white">Lecture Video</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100, paddingTop: 24 }}
                >
                    {/* Video Player Section */}
                    <View className="px-6 mb-6">
                        <View className="bg-black rounded-[32px] overflow-hidden shadow-lg" style={{ height: 220 }}>
                            <VideoView
                                style={{ width: '100%', height: 220 }}
                                player={player}
                                fullscreenOptions={{ enable: true }}
                                allowsPictureInPicture
                            />
                        </View>
                    </View>

                    {/* Features / Stats - Moved Here */}
                    <View className="px-6 flex-row flex-wrap mb-6">
                        <View className="flex-row items-center bg-blue-50 px-3 py-2 rounded-xl mr-3 mb-2">
                            <Ionicons name="time-outline" size={16} color="#0061FF" />
                            <Text className="ml-1.5 text-[#0061FF] font-nunito-bold text-xs">45 Mins</Text>
                        </View>
                        <View className="flex-row items-center bg-orange-50 px-3 py-2 rounded-xl mr-3 mb-2">
                            <Ionicons name="star-outline" size={16} color="#F59E0B" />
                            <Text className="ml-1.5 text-[#F59E0B] font-nunito-bold text-xs">4.8 Rating</Text>
                        </View>
                        <View className="flex-row items-center bg-green-50 px-3 py-2 rounded-xl mb-2">
                            <Ionicons name="eye-outline" size={16} color="#10B981" />
                            <Text className="ml-1.5 text-[#10B981] font-nunito-bold text-xs">1.2k Views</Text>
                        </View>
                    </View>

                    {/* Description Section */}
                    <View className="px-6 mb-8">
                        <Text className="text-2xl font-nunito-extrabold text-[#1E293B] mb-3">
                            Lecture {id}
                        </Text>
                        <Text className="text-sm font-nunito-bold text-[#64748B] leading-6 mb-6">
                            In this lecture, we will dive deep into the core concepts of the subject.
                            You will learn about the fundamental principles and how to apply them in real-world scenarios.
                            Make sure to take notes and pay attention to the examples provided.
                        </Text>

                        {/* Topics Learned - New Section */}
                        <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-3">
                            Topics Covered
                        </Text>
                        <View className="space-y-3">
                            {[
                                'Understanding the basic principles',
                                'Real-world application examples',
                                'Common pitfalls and how to avoid them',
                                'Advanced techniques for optimization',
                                'Q&A and troubleshooting'
                            ].map((topic, index) => (
                                <View key={index} className="flex-row items-center">
                                    <View className="w-1.5 h-1.5 rounded-full bg-[#0061FF] mr-3" />
                                    <Text className="text-sm font-nunito-bold text-[#64748B] flex-1">
                                        {topic}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Fixed Footer for Action Buttons */}
                <View className="px-6 py-5 bg-white border-t border-gray-100 flex-row items-center pb-8 absolute bottom-0 left-0 right-0">
                    <TouchableOpacity className="w-14 h-14 bg-gray-50 rounded-2xl items-center justify-center border border-gray-100 mr-4 shadow-sm">
                        <Ionicons name="share-social-outline" size={24} color="#64748B" />
                    </TouchableOpacity>

                    <TouchableOpacity className="w-14 h-14 bg-gray-50 rounded-2xl items-center justify-center border border-gray-100 mr-4 shadow-sm">
                        <Ionicons name="bookmark-outline" size={24} color="#64748B" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-1 h-14 bg-[#0061FF] rounded-2xl flex-row items-center justify-center shadow-lg shadow-blue-500/20">
                        <Ionicons name="download-outline" size={20} color="white" />
                        <Text className="text-white font-nunito-bold text-base ml-2">Download</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
