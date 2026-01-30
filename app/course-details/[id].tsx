import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function CourseDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState('Details');

    // Mock data based on the provided image
    const course = {
        title: 'Job Preparation Full Course',
        instructor: 'HM Zaman',
        rating: 4.9,
        reviews: 233,
        price: 50,
        description: 'Lorem ipsum dolor sit amet consectetur. Venenatis mi adipiscing morbi ullamcorper cras imperdiet adipiscing. Vitae cras risus sed nunc semper et. Elementum duis gravida mauris vitae placerat quis orci ultrices odio. Diam faucibus varius nec auctor blandit volutpat ornare maecenas. Massa iaculis vivamus diam habitant tellus proin augue. Magna dictum ultricies donec amet nam libero. Velit lectus vitae sed et. Sed volutpat aliquet at eget viverra ac pretium cras.',
        image: 'https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg' // Placeholder for the illustration
    };

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
                <Text className="text-xl font-nunito-extrabold text-white">Course Details</Text>
                <TouchableOpacity
                    onPress={() => setIsFavorite(!isFavorite)}
                    className="w-10 h-10 items-center justify-center bg-white/20 rounded-full"
                >
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={22}
                        color={isFavorite ? "#EF4444" : "white"}
                    />
                </TouchableOpacity>
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    {/* Hero Image Container */}
                    <View className="px-6 pt-8">
                        <View className="w-full h-64 bg-[#EFF6FF] rounded-[32px] items-center justify-center border border-blue-50">
                            <Image
                                source={{ uri: course.image }}
                                className="w-[80%] h-[80%]"
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    {/* Info Section */}
                    <View className="px-6 mt-8">
                        <Text className="text-2xl font-nunito-extrabold text-[#1E293B] mb-2">{course.title}</Text>

                        <View className="flex-row items-center mb-6">
                            <Text className="text-gray-400 font-nunito-semibold text-sm">By </Text>
                            <Text className="text-[#0061FF] font-nunito-bold text-sm">{course.instructor}</Text>
                            <View className="flex-1" />
                            <View className="bg-orange-50 px-3 py-1 rounded-lg flex-row items-center border border-orange-100">
                                <Ionicons name="star" size={14} color="#F59E0B" />
                                <Text className="ml-1 text-sm font-nunito-extrabold text-[#F59E0B]">{course.rating}</Text>
                            </View>
                        </View>

                        {/* Stats Row */}
                        <View className="flex-row justify-between mb-8">
                            <View className="items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100 w-[30%]">
                                <Ionicons name="people-outline" size={20} color="#0061FF" />
                                <Text className="text-sm font-nunito-extrabold text-[#1E293B] mt-2">2.5k+</Text>
                                <Text className="text-[9px] font-nunito-bold text-gray-400 uppercase">Students</Text>
                            </View>
                            <View className="items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100 w-[30%]">
                                <Ionicons name="time-outline" size={20} color="#F59E0B" />
                                <Text className="text-sm font-nunito-extrabold text-[#1E293B] mt-2">12h 30m</Text>
                                <Text className="text-[9px] font-nunito-bold text-gray-400 uppercase">Duration</Text>
                            </View>
                            <View className="items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100 w-[30%]">
                                <Ionicons name="ribbon-outline" size={20} color="#0EA5E9" />
                                <Text className="text-sm font-nunito-extrabold text-[#1E293B] mt-2">Expert</Text>
                                <Text className="text-[9px] font-nunito-bold text-gray-400 uppercase">Level</Text>
                            </View>
                        </View>

                        {/* Custom Tabs */}
                        <View className="flex-row bg-gray-50 p-1.5 rounded-2xl border border-gray-100 mb-8">
                            {['Details', 'Lessons', 'Reviews'].map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    style={{ flex: 1 }}
                                    className={`py-2.5 rounded-xl items-center ${activeTab === tab ? 'bg-white shadow-sm border border-gray-100' : ''}`}
                                    onPress={() => setActiveTab(tab)}
                                >
                                    <Text className={`text-xs font-nunito-bold ${activeTab === tab ? 'text-[#0061FF]' : 'text-gray-400'}`}>
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Description */}
                        {activeTab === 'Details' && (
                            <View>
                                <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-3">About Course</Text>
                                <Text className="text-sm font-nunito-medium text-gray-500 leading-6">
                                    {course.description}
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Fixed Bottom Bar */}
                <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex-row items-center">
                    <View className="mr-6">
                        <Text className="text-gray-400 font-nunito-bold text-[10px] uppercase">Course Price</Text>
                        <Text className="text-2xl font-nunito-extrabold text-[#1E293B]">${course.price}</Text>
                    </View>
                    <TouchableOpacity
                        className="flex-1 bg-[#0061FF] h-14 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/20"
                        onPress={() => router.push(`/course-guide/${id}` as any)}
                    >
                        <Text className="text-white font-nunito-extrabold text-base">Course Guide</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
