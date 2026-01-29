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
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            {/* Header Background Wave (Subtle) */}
            <View className="absolute top-0 left-0 right-0 h-48 bg-blue-50/50 rounded-b-[40px] -z-10" />

            {/* Header */}
            <View className="px-6 pt-12 pb-4 flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center bg-white rounded-full shadow-sm"
                >
                    <Ionicons name="chevron-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text className="text-xl font-nunito-extrabold text-[#1E293B]">Test Details</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                {/* Hero Card */}
                <View className="px-6 mt-4">
                    <View className="bg-white rounded-[32px] p-6 shadow-xl shadow-blue-500/10 border border-blue-50">
                        <Text className="text-2xl font-nunito-extrabold text-[#0061FF] mb-6">{test.title}</Text>

                        <View className="space-y-4">
                            <View className="flex-row items-center mb-4">
                                <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center">
                                    <Ionicons name="book-outline" size={20} color="#0061FF" />
                                </View>
                                <View className="ml-4">
                                    <Text className="text-gray-400 text-[10px] uppercase font-nunito-bold">Subject</Text>
                                    <Text className="text-[#1E293B] font-nunito-extrabold text-sm">{test.subject}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center mb-4">
                                <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center">
                                    <Ionicons name="calendar-outline" size={20} color="#0061FF" />
                                </View>
                                <View className="ml-4">
                                    <Text className="text-gray-400 text-[10px] uppercase font-nunito-bold">Date</Text>
                                    <Text className="text-[#1E293B] font-nunito-extrabold text-sm">{test.date}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center">
                                <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center">
                                    <Ionicons name="time-outline" size={20} color="#0061FF" />
                                </View>
                                <View className="ml-4">
                                    <Text className="text-gray-400 text-[10px] uppercase font-nunito-bold">Time</Text>
                                    <Text className="text-[#1E293B] font-nunito-extrabold text-sm">{test.time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Stats Row */}
                <View className="flex-row justify-between px-6 mt-8">
                    <View className="items-center w-[30%]">
                        <View className="w-14 h-14 bg-[#0061FF] rounded-full items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
                            <Ionicons name="stopwatch" size={24} color="white" />
                        </View>
                        <Text className="text-sm font-nunito-extrabold text-[#1E293B] text-center">{test.duration}</Text>
                        <Text className="text-[10px] font-nunito-bold text-gray-400 uppercase text-center">Duration</Text>
                    </View>

                    <View className="items-center w-[30%]">
                        <View className="w-14 h-14 bg-[#0061FF] rounded-full items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
                            <Ionicons name="ribbon" size={24} color="white" />
                        </View>
                        <Text className="text-sm font-nunito-extrabold text-[#1E293B] text-center">{test.marks} Marks</Text>
                        <Text className="text-[10px] font-nunito-bold text-gray-400 uppercase text-center">Total</Text>
                    </View>

                    <View className="items-center w-[30%]">
                        <View className="w-14 h-14 bg-[#0061FF] rounded-full items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
                            <Ionicons name="layers" size={24} color="white" />
                        </View>
                        <Text className="text-sm font-nunito-extrabold text-[#1E293B] text-center">{test.questions}</Text>
                        <Text className="text-[10px] font-nunito-bold text-gray-400 uppercase text-center">Questions</Text>
                    </View>
                </View>

                {/* Topics */}
                <View className="px-6 mt-10">
                    <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-4">Topics</Text>
                    <View className="flex-row flex-wrap">
                        {test.topics.map((topic, index) => (
                            <View key={index} className="bg-blue-50/50 border border-blue-100 px-4 py-2.5 rounded-full mr-2 mb-2 flex-row items-center">
                                <Text className="text-[#0061FF] font-nunito-bold text-xs mr-2">{topic}</Text>
                                <Ionicons name="checkmark-circle" size={14} color="#0061FF" />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Instructions */}
                <View className="px-6 mt-8">
                    <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-4">Instructions</Text>
                    {test.instructions.map((instruction, index) => (
                        <View key={index} className="flex-row mb-4 items-start">
                            <View className="w-2 h-2 rounded-full bg-[#0061FF] mt-1.5 mr-3" />
                            <Text className="flex-1 text-[#64748B] font-nunito-medium text-sm leading-5">
                                {instruction}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Start Button */}
            <View className="absolute bottom-0 left-0 right-0 p-6 bg-white shadow-2xl shadow-black">
                <TouchableOpacity
                    className="bg-[#0061FF] py-4 rounded-2xl items-center justify-center flex-row shadow-xl shadow-blue-500/40"
                    onPress={() => alert('Test Starting...')}
                >
                    <Text className="text-white font-nunito-extrabold text-lg mr-2">Start Test</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
