import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const SUBJECTS = ['All', 'Math', 'Turkish', 'History', 'Physics', 'Biology'];

const LECTURES = [
    {
        id: 1,
        title: 'Quantum Mechanics - Lecture 3',
        subject: 'Physics',
        subjectColor: '#F29393',
        date: 'Oct 26, 2024',
        duration: '1h 15m',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
    },
    {
        id: 2,
        title: 'Ancient Civilizations Overview',
        subject: 'History',
        subjectColor: '#10B981',
        date: 'Oct 24, 2024',
        duration: '45m',
        thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
    },
    {
        id: 3,
        title: 'Calculus: Integration by Parts',
        subject: 'Math',
        subjectColor: '#0061FF',
        date: 'Oct 22, 2024',
        duration: '1h 05m',
        thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80',
    },
    {
        id: 4,
        title: 'Grammar: Types of Verbs',
        subject: 'Turkish',
        subjectColor: '#FF6600',
        date: 'Oct 20, 2024',
        duration: '35m',
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    },
];

export default function LecturesScreen() {
    const router = useRouter();
    const [selectedSubject, setSelectedSubject] = useState('All');

    const filteredLectures = selectedSubject === 'All'
        ? LECTURES
        : LECTURES.filter(l => l.subject === selectedSubject);

    return (
        <View className="flex-1 bg-[#F8FAFC]">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="px-6 pt-12 pb-4">
                <TouchableOpacity onPress={() => router.back()} className="mb-4 w-10 h-10 items-center justify-center">
                    <Ionicons name="chevron-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text className="text-3xl font-nunito-extrabold text-[#1E293B]">Recorded Lectures</Text>
            </View>

            {/* Subject Filter */}
            <View className="mt-4 mb-4">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                >
                    {SUBJECTS.map((subject) => (
                        <TouchableOpacity
                            key={subject}
                            onPress={() => setSelectedSubject(subject)}
                            className={`px-6 py-2.5 rounded-full mr-3 shadow-sm ${selectedSubject === subject ? 'bg-[#0061FF]' : 'bg-white'}`}
                        >
                            <Text className={`font-nunito-bold text-sm ${selectedSubject === subject ? 'text-white' : 'text-[#64748B]'}`}>
                                {subject}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {filteredLectures.map((lecture) => (
                    <TouchableOpacity
                        key={lecture.id}
                        className="bg-white rounded-[32px] p-4 mb-5 shadow-sm flex-row items-center border border-white"
                        activeOpacity={0.9}
                    >
                        {/* Thumbnail */}
                        <View className="w-28 h-28 rounded-2xl overflow-hidden relative mr-4 bg-gray-100">
                            <Image source={{ uri: lecture.thumbnail }} className="w-full h-full" />
                            <View className="absolute inset-0 bg-black/10 items-center justify-center">
                                <View className="w-10 h-10 rounded-full bg-white/30 items-center justify-center border border-white/40">
                                    <Ionicons name="play" size={20} color="white" />
                                </View>
                            </View>
                        </View>

                        {/* Info */}
                        <View className="flex-1 justify-center">
                            <Text style={{ color: lecture.subjectColor }} className="text-[10px] font-nunito-bold uppercase mb-1">
                                {lecture.subject}
                            </Text>
                            <Text className="text-base font-nunito-extrabold text-[#1E293B] mb-2 leading-tight" numberOfLines={2}>
                                {lecture.title}
                            </Text>
                            <View className="flex-row items-center">
                                <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
                                <Text className="text-[#94A3B8] font-nunito-medium text-[11px] ml-1 mr-4">
                                    {lecture.date}
                                </Text>
                                <Ionicons name="time-outline" size={14} color="#94A3B8" />
                                <Text className="text-[#94A3B8] font-nunito-medium text-[11px] ml-1">
                                    {lecture.duration}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
