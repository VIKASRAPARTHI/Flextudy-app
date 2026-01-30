import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const TREND_DATA = [
    { label: 'Ut 1', score: 86, active: true },
    { label: 'Ut 2', score: 75, active: true },
    { label: 'Ut 3', score: 92, active: true },
    { label: 'Ut 4', score: 89, active: true },
    { label: 'HY', score: 0, active: false },
    { label: 'Final', score: 0, active: false },
];

const SUBJECT_GROWTH = [
    { name: 'Mathematics', growth: '+ 10%', status: 'Overachiever', feedback: 'Exeptionally grasp over subject basics', color: '#0061FF' },
    { name: 'Science', growth: '+ 8%', status: 'Quick Learner', feedback: 'Excellent practical application skills', color: '#F59E0B' },
];

const MARKS_DATA = [
    {
        title: 'Half Yearly 1',
        date: 'August 22, 2020',
        totalPercentage: '80%',
        status: 'Supplementary (1)',
        statusColor: '#F59E0B',
        accentColor: '#0061FF',
        subjects: [
            { name: 'Math', marks: '92/100', result: 'Pass', grade: 'A+', gradeColor: '#0061FF' },
            { name: 'Science', marks: '86/100', result: 'Pass', grade: 'A', gradeColor: '#0061FF' },
            { name: 'English', marks: '82/100', result: 'Pass', grade: 'A', gradeColor: '#0061FF' },
            { name: 'Hindi', marks: '90/100', result: 'Pass', grade: 'A', gradeColor: '#0061FF' },
            { name: 'Social. Sc', marks: '32/100', result: 'Fail', grade: 'D', gradeColor: '#F59E0B' },
            { name: 'Comp. Sc', marks: '98/100', result: 'Pass', grade: 'A', gradeColor: '#0061FF' },
        ]
    },
    {
        title: 'Unit Test 3',
        date: 'August 22, 2020',
        totalPercentage: '86%',
        status: 'Passed',
        statusColor: '#0061FF',
        accentColor: '#F59E0B',
        subjects: [
            { name: 'Math', marks: '92/100', result: 'Pass', grade: 'A+', gradeColor: '#0061FF' },
            { name: 'Science', marks: '86/100', result: 'Pass', grade: 'A', gradeColor: '#0061FF' },
            { name: 'English', marks: '82/100', result: 'Pass', grade: 'A', gradeColor: '#0061FF' },
            { name: 'Hindi', marks: '90/100', result: 'Pass', grade: 'A', gradeColor: '#0061FF' },
            { name: 'Social. Sc', marks: '68/100', result: 'Pass', grade: 'B', gradeColor: '#0061FF' },
            { name: 'Comp. Sc', marks: '98/100', result: 'Pass', grade: 'A', gradeColor: '#0061FF' },
        ]
    }
];

const FEEDBACK_DATA = [
    {
        name: 'Amina Nasrin',
        title: 'Math teacher',
        time: '5 days ago',
        avatar: 'https://i.pravatar.cc/150?img=32',
        comment: 'He is is enthusiastic learner who seems to enjoy school, exhibits a positive outlook and attitude in the class. Could improve a bit in Social Studies.'
    },
    {
        name: 'Jaspreet Deshmukh',
        title: 'Science teacher',
        time: '5 days ago',
        avatar: 'https://i.pravatar.cc/150?img=44',
        comment: 'He is is enthusiastic learner who seems to enjoy school, exhibits a positive outlook and attitude in the class. Could improve a bit in Social Studies.'
    },
    {
        name: 'Sourav Agarwal',
        title: 'History teacher',
        time: '5 days ago',
        avatar: 'https://i.pravatar.cc/150?img=11',
        comment: 'He is is enthusiastic learner who seems to enjoy school, exhibits a positive outlook and attitude in the class. Could improve a bit in Social Studies.'
    },
    {
        name: 'Disha Chauhan',
        title: 'History teacher',
        time: '5 days ago',
        avatar: 'https://i.pravatar.cc/150?img=5',
        comment: 'He is is enthusiastic learner who seems to enjoy school, exhibits a positive outlook and attitude in the class. Could improve a bit in Social Studies.'
    }
];

const ACHIEVEMENTS_DATA = [
    { title: 'All India Math Olympiad', date: 'Feb 23, 2021', rank: 'Rank 17', iconColor: '#F59E0B', icon: 'calculator' },
    { title: 'Cultural Art & Craft Competition', date: 'Feb 23, 2021', rank: 'Rank 1', iconColor: '#0061FF', icon: 'brush' },
    { title: 'Music Competition', date: 'Feb 23, 2021', rank: 'Rank 3', iconColor: '#F59E0B', icon: 'musical-notes' },
    { title: 'Cultural Art & Craft Competition', date: 'Feb 23, 2021', rank: 'Rank 3', iconColor: '#0061FF', icon: 'musical-notes' },
];

export default function ProgressScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ tab?: string }>();
    const [activeTab, setActiveTab] = useState('Performance');

    useEffect(() => {
        if (params.tab && ['Marks', 'Performance', 'Feedback', 'Achievement'].includes(params.tab)) {
            setActiveTab(params.tab);
        }
    }, [params.tab]);

    const tabs = ['Marks', 'Performance', 'Feedback', 'Achievement'];

    const renderHeader = () => (
        <View className="pt-12 pb-6 px-6">
            <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center bg-white/20 rounded-full"
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 items-center justify-center">
                    <Ionicons name="notifications-outline" size={24} color="white" />
                    <View className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full border border-blue-800" />
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between">
                <View className="flex-1">
                    <TouchableOpacity className="flex-row items-center mb-4">
                        <Text className="text-white text-2xl font-nunito-extrabold mr-2">Samir Mishra</Text>

                    </TouchableOpacity>

                    <View className="flex-row items-center mb-2">
                        <Text className="text-white/80 font-nunito-bold text-xs uppercase tracking-wider">Class 8th  |  Year 2020-2021</Text>
                    </View>
                    <Text className="text-white/80 font-nunito-bold text-xs mb-4">Claymore High School</Text>

                    <View className="flex-row items-center">
                        <Text className="text-white/60 font-nunito-bold text-xs mr-2">Attendance</Text>
                        <Text className="text-orange-400 font-nunito-extrabold text-xs">45/50</Text>
                    </View>
                </View>

                <View className="items-center">
                    <View className="w-24 h-24 items-center justify-center">
                        <View className="w-24 h-24 rounded-full border-[6px] border-blue-900/50 absolute" />
                        <View className="w-24 h-24 rounded-full border-[6px] border-orange-400 absolute border-t-transparent border-l-transparent" style={{ transform: [{ rotate: '-45deg' }] }} />
                        <View className="items-center">
                            <View className="flex-row items-end">
                                <Text className="text-white font-nunito-extrabold text-lg">75</Text>
                                <Text className="text-white font-nunito-extrabold text-[10px] mb-1.5 ml-0.5">%</Text>
                            </View>
                            <Text className="text-white/60 font-nunito-bold text-[8px] uppercase">Overall</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center mt-4 bg-white/10 px-3 py-1 rounded-full">
                        <Ionicons name="trophy-outline" size={12} color="#F59E0B" />
                        <Text className="text-white font-nunito-extrabold text-[10px] ml-1">Rank 10</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderMarks = () => (
        <View>
            {MARKS_DATA.map((exam, idx) => (
                <View key={idx} className="mb-10">
                    <View className="flex-row justify-between items-end mb-4">
                        <View>
                            <Text className="text-gray-900 font-nunito-extrabold text-lg">{exam.title}</Text>
                            <Text className="text-gray-400 font-nunito-bold text-[10px] mt-1">{exam.date}</Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-gray-900 font-nunito-extrabold text-lg">{exam.totalPercentage}</Text>
                            <Text style={{ color: exam.statusColor }} className="font-nunito-bold text-[8px] uppercase">{exam.status}</Text>
                        </View>
                    </View>

                    <View className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex-row">
                        <View style={{ backgroundColor: exam.accentColor }} className="w-1.5 h-full" />
                        <View className="flex-1 p-6">
                            {exam.subjects.map((sub, sIdx) => (
                                <View key={sIdx} className={`flex-row justify-between items-center py-2.5 ${sIdx !== exam.subjects.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <Text className="text-gray-500 font-nunito-bold text-xs flex-1">{sub.name}</Text>
                                    <Text className="text-gray-900 font-nunito-bold text-xs w-20 text-center">{sub.marks}</Text>
                                    <Text className="text-gray-500 font-nunito-bold text-xs w-16 text-center">{sub.result}</Text>
                                    <Text style={{ color: sub.gradeColor }} className="font-nunito-extrabold text-xs w-10 text-right">{sub.grade}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );

    const renderPerformance = () => (
        <View>
            <View className="mb-10">
                <View className="flex-row items-center justify-between mb-6">
                    <Text className="text-gray-900 font-nunito-extrabold text-lg">Overview</Text>
                    <Text className="text-blue-600 font-nunito-bold text-xs">Total Growth + 1.8%</Text>
                </View>

                <View className="bg-gray-50/50 rounded-[32px] p-6 border border-gray-100">
                    <View className="h-44 flex-row items-end justify-between px-2">
                        {TREND_DATA.map((data, index) => (
                            <View key={index} className="items-center flex-1">
                                {data.active && (
                                    <Text className="text-orange-500 font-nunito-extrabold text-[10px] mb-2">{data.score}%</Text>
                                )}
                                <View
                                    style={{ height: data.score > 0 ? `${data.score}%` : '4%' }}
                                    className={`w-6 rounded-full ${data.active ? 'bg-blue-100' : 'bg-gray-100'}`}
                                >
                                    {data.active && (
                                        <LinearGradient
                                            colors={['#93C5FD', '#3B82F6']}
                                            className="h-full w-full rounded-full opacity-30"
                                        />
                                    )}
                                </View>
                                <Text className="text-gray-400 font-nunito-bold text-[10px] mt-4">{data.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View>
                <Text className="text-gray-900 font-nunito-extrabold text-lg mb-6">Subject growth</Text>
                {SUBJECT_GROWTH.map((subject, index) => (
                    <View key={index} className="flex-row mb-6">
                        <View className="w-24 pt-4">
                            <Text className="text-gray-600 font-nunito-extrabold text-xs mb-2">{subject.name}</Text>
                            <View className="flex-row items-center">
                                <Ionicons name="trending-up" size={16} color="#0061FF" />
                                <Text className="text-blue-600 font-nunito-bold text-xs ml-1">{subject.growth}</Text>
                            </View>
                        </View>

                        <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row">
                            <View style={{ backgroundColor: subject.color }} className="w-1 h-full rounded-full mr-4" />
                            <View className="flex-1">
                                <Text style={{ color: subject.color }} className="font-nunito-extrabold text-xs mb-1">{subject.status} :</Text>
                                <Text className="text-gray-400 font-nunito-medium text-xs leading-4">{subject.feedback}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );

    const renderFeedback = () => (
        <View>
            {FEEDBACK_DATA.map((item, idx) => (
                <View key={idx} className="mb-8">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-xl" />
                            <View className="ml-3">
                                <Text className="text-gray-900 font-nunito-extrabold text-sm">{item.name}</Text>
                                <Text className="text-gray-400 font-nunito-bold text-[10px]">{item.title}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-300 font-nunito-bold text-[10px]">{item.time}</Text>
                    </View>
                    <Text className="text-gray-600 font-nunito-medium text-sm leading-6">
                        {item.comment}
                    </Text>
                    {idx !== FEEDBACK_DATA.length - 1 && (
                        <View className="h-px bg-gray-50 mt-8" />
                    )}
                </View>
            ))}
        </View>
    );

    const renderAchievements = () => (
        <View>
            {ACHIEVEMENTS_DATA.map((item, idx) => (
                <View key={idx} className="flex-row items-center mb-8">
                    <View style={{ backgroundColor: item.iconColor }} className="w-16 h-16 rounded-[24px] items-center justify-center mr-6 shadow-sm shadow-black/5">
                        <Ionicons name={item.icon as any} size={28} color="white" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-gray-900 font-nunito-extrabold text-sm mb-1">{item.title}</Text>
                        <Text className="text-gray-400 font-nunito-bold text-[10px] mb-2">{item.date}</Text>
                        <View className="flex-row items-center">
                            <Ionicons name="trophy" size={14} color={item.iconColor} />
                            <Text style={{ color: item.iconColor }} className="font-nunito-extrabold text-xs ml-2">{item.rank}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={['#2563EB', '#1D4ED8', '#1E3A8A']}
                className="absolute left-0 right-0 top-0 h-[450px]"
            />

            {renderHeader()}

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl shadow-black/20 overflow-hidden">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60, paddingTop: 30 }}
                >
                    <View className="px-6">
                        <View className="flex-row items-center justify-between mb-6">
                            <View>
                                <Text className="text-gray-900 font-nunito-extrabold text-xl">Progress Report</Text>
                                <Text className="text-gray-400 font-nunito-bold text-[10px] mt-1">Last Updated : Feb 16, 2021</Text>
                            </View>
                            <TouchableOpacity>
                                <Text className="text-blue-600 font-nunito-bold text-xs">Download Report</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-10 overflow-visible">
                            {tabs.map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    className={`mr-3 px-5 py-2.5 rounded-xl ${activeTab === tab ? 'bg-blue-600' : 'bg-transparent'}`}
                                >
                                    <Text className={`font-nunito-bold text-xs ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {activeTab === 'Performance' && renderPerformance()}
                        {activeTab === 'Marks' && renderMarks()}
                        {activeTab === 'Feedback' && renderFeedback()}
                        {activeTab === 'Achievement' && renderAchievements()}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
