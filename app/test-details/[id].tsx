import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const TEST_DETAILS = {
    '1': {
        title: 'Mathematics',
        subject: 'Advanced Math',
        date: 'Oct 28, 2023',
        time: '10:00 AM - 12:00 PM',
        duration: '120 Mins',
        marks: '100',
        questions: '50',
        topics: ['Algebra', 'Calculus', 'Geometry', 'Trigonometry', 'Statistics', 'Probability'],
        instructions: [
            'Read all questions carefully before answering.',
            'Each question carries equal marks.',
            'There is no negative marking for incorrect answers.',
            'Ensure stable internet connection throughout the test.',
            'Do not exit or minimize the app once the test starts.',
            'Review your answers before final submission.'
        ]
    },
    '2': {
        title: 'Physics Quiz 4',
        subject: 'Classical Mechanics',
        date: 'Oct 28, 2023',
        time: '11:30 AM - 12:15 PM',
        duration: '45 Mins',
        marks: '50',
        questions: '25',
        topics: ['Kinetics', 'Dynamics', 'Work & Energy'],
        instructions: [
            'Calculator is allowed.',
            'Show all working steps for descriptive questions.',
            'Maintain silence during the quiz.'
        ]
    }
};

export default function TestDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const test = TEST_DETAILS[id as keyof typeof TEST_DETAILS] || TEST_DETAILS['1'];

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
                <Text className="text-xl font-nunito-extrabold text-white">Test Details</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 140, paddingTop: 30 }}
                >
                    {/* Hero Info */}
                    <View className="px-6">
                        <View className="bg-blue-50/50 rounded-[32px] p-6 border border-blue-50">
                            <Text className="text-2xl font-nunito-extrabold text-[#0061FF] mb-6">{test.title}</Text>

                            <View className="flex-row items-center mb-4">
                                <View className="w-10 h-10 bg-white rounded-xl items-center justify-center shadow-sm">
                                    <Ionicons name="book-outline" size={20} color="#0061FF" />
                                </View>
                                <View className="ml-4">
                                    <Text className="text-gray-400 text-[10px] uppercase font-nunito-bold">Subject</Text>
                                    <Text className="text-[#1E293B] font-nunito-extrabold text-sm">{test.subject}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center mb-4">
                                <View className="w-10 h-10 bg-white rounded-xl items-center justify-center shadow-sm">
                                    <Ionicons name="calendar-outline" size={20} color="#0061FF" />
                                </View>
                                <View className="ml-4">
                                    <Text className="text-gray-400 text-[10px] uppercase font-nunito-bold">Date</Text>
                                    <Text className="text-[#1E293B] font-nunito-extrabold text-sm">{test.date}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center">
                                <View className="w-10 h-10 bg-white rounded-xl items-center justify-center shadow-sm">
                                    <Ionicons name="time-outline" size={20} color="#0061FF" />
                                </View>
                                <View className="ml-4">
                                    <Text className="text-gray-400 text-[10px] uppercase font-nunito-bold">Time</Text>
                                    <Text className="text-[#1E293B] font-nunito-extrabold text-sm">{test.time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View className="flex-row justify-between px-6 mt-8">
                        <View className="items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100 w-[30%]">
                            <Ionicons name="stopwatch-outline" size={24} color="#0061FF" />
                            <Text className="text-sm font-nunito-extrabold text-[#1E293B] mt-2">{test.duration}</Text>
                            <Text className="text-[9px] font-nunito-bold text-gray-400 uppercase">Duration</Text>
                        </View>

                        <View className="items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100 w-[30%]">
                            <Ionicons name="ribbon-outline" size={24} color="#F59E0B" />
                            <Text className="text-sm font-nunito-extrabold text-[#1E293B] mt-2">{test.marks}</Text>
                            <Text className="text-[9px] font-nunito-bold text-gray-400 uppercase">Marks</Text>
                        </View>

                        <View className="items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100 w-[30%]">
                            <Ionicons name="layers-outline" size={24} color="#0EA5E9" />
                            <Text className="text-sm font-nunito-extrabold text-[#1E293B] mt-2">{test.questions}</Text>
                            <Text className="text-[9px] font-nunito-bold text-gray-400 uppercase">Questions</Text>
                        </View>
                    </View>

                    {/* Topics */}
                    <View className="px-6 mt-10">
                        <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-4">Exam Topics</Text>
                        <View className="flex-row flex-wrap">
                            {test.topics.map((topic, index) => (
                                <View key={index} className="bg-blue-50/50 border border-blue-100 px-4 py-2 rounded-2xl mr-2 mb-2 flex-row items-center">
                                    <Text className="text-[#0061FF] font-nunito-bold text-xs">{topic}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Instructions */}
                    <View className="px-6 mt-8">
                        <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-4">Instructions</Text>
                        <View className="bg-gray-50/50 rounded-[32px] p-6 border border-gray-100">
                            {test.instructions.map((instruction, index) => (
                                <View key={index} className="flex-row mb-4 items-start last:mb-0">
                                    <View className="w-1.5 h-1.5 rounded-full bg-[#0061FF] mt-1.5 mr-3" />
                                    <Text className="flex-1 text-[#64748B] font-nunito-medium text-xs leading-5">
                                        {instruction}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Fixed Footer with Button */}
                <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
                    <TouchableOpacity
                        className="bg-[#0061FF] h-16 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/20"
                        activeOpacity={0.8}
                        onPress={() => alert('Test Starting...')}
                    >
                        <Text className="text-white font-nunito-extrabold text-lg">Start Examination</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
