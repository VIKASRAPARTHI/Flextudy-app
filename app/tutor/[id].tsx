import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 320;

const BATCHES = [
    {
        id: '1',
        code: 'ST-11 Grade XI',
        subject: 'Maths',
        schedule: 'Mon Thur Sat',
        time: '18:00-20:00 IST',
        image: 'https://i.pravatar.cc/150?img=32'
    },
    {
        id: '2',
        code: 'ST-13 Grade XII',
        subject: 'Maths',
        schedule: 'Tue Wed Fri',
        time: '18:00-20:00 IST',
        image: 'https://i.pravatar.cc/150?img=32'
    },
    {
        id: '3',
        code: 'ST-11 Grade XII',
        subject: 'Maths',
        schedule: 'Tue Wed Fri',
        time: '14:00-16:00 IST',
        image: 'https://i.pravatar.cc/150?img=32'
    },
    {
        id: '4',
        code: 'ST-12 Grade XI',
        subject: 'Maths',
        schedule: 'Mon Thur Sat',
        time: '14:00-16:00 IST',
        image: 'https://i.pravatar.cc/150?img=32'
    }
];

const DEMO_CLASSES = [
    {
        id: 'd1',
        title: 'Trigonometry Part - 1',
        subject: 'Maths Grade XI',
        lang: 'Eng',
        views: '283',
        image: 'https://i.pravatar.cc/150?img=32'
    },
    {
        id: 'd2',
        title: 'Sets & Algebra',
        subject: 'Maths Grade XII',
        lang: 'Eng',
        views: '445',
        image: 'https://i.pravatar.cc/150?img=32'
    }
];

export default function TutorProfile() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState('Batches');

    return (
        <View className="flex-1 bg-[#F0F9FF]">
            <StatusBar barStyle="dark-content" />

            {/* Full Screen Gradient Blur Background */}
            <LinearGradient
                colors={['#0061FF', '#F0F9FF', '#FFFFFF']}
                locations={[0, 0.3, 0.6]}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }}
            />

            {/* FIXED HEADER SECTION (Doesn't move) */}
            <View style={{ height: HEADER_HEIGHT, width: '100%', position: 'absolute', top: 0, zIndex: 0 }}>
                {/* Decorative Circles */}
                <View className="absolute top-20 left-[-50] w-60 h-60 rounded-full bg-blue-500/10" />
                <View className="absolute top-10 right-[-30] w-40 h-40 rounded-full bg-blue-500/10" />

                {/* Tutor Portrait - Fixed */}
                <View className="absolute bottom-0 self-center items-center justify-end w-full h-[240px]">
                    <Image
                        source={require('../../assets/images/teacher1.png')}
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* SCROLLABLE CONTENT */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={true}
                className="flex-1"
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT - 30 }}
            >
                {/* Content Sheet - Scrolls over the header */}
                <View className="flex-1 bg-white rounded-t-[40px] px-6 pt-8 pb-12 shadow-2xl min-h-[600px]">
                    {/* Basic Info */}
                    <View className="items-center mb-6">
                        <Text className="text-3xl font-nunito-extrabold text-[#1F2937]">Harshini</Text>
                        <Text className="text-base font-nunito-bold text-blue-500 mt-1">Maths Tutor</Text>
                        <Text className="text-sm font-nunito-bold text-gray-400">Scholar From NIIT Madras</Text>
                    </View>

                    {/* About Section */}
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-lg font-nunito-extrabold text-[#1F2937]">About ME</Text>
                        <View className="flex-row items-center">
                            <View className="border border-gray-100 px-3 py-1 rounded-md mr-3 bg-gray-50">
                                <Text className="text-xs font-nunito-bold text-gray-500 uppercase">Eng</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="star" size={16} color="#FBBF24" />
                                <Text className="ml-1 text-sm font-nunito-bold text-gray-500">4.8</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-sm font-nunito-medium text-gray-500 leading-5 mb-8">
                        Sharing is who I am, and teaching is where I am at my best, because I've been sides of that equation and getting to deliver useful training is my meaningful way to be a part of the creative community.
                    </Text>

                    {/* Stats Grid */}
                    <View className="flex-row justify-between mb-8">
                        <View className="items-center">
                            <Text className="text-[10px] font-nunito-bold text-gray-400 uppercase mb-1">Classes for</Text>
                            <Text className="text-base font-nunito-extrabold text-[#1F2937]">XI,XII</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-[10px] font-nunito-bold text-gray-400 uppercase mb-1">Total Students</Text>
                            <Text className="text-base font-nunito-extrabold text-[#1F2937]">2304</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-[10px] font-nunito-bold text-gray-400 uppercase mb-1">Mode</Text>
                            <Text className="text-base font-nunito-extrabold text-[#1F2937]">Online</Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-[10px] font-nunito-bold text-gray-400 uppercase mb-1">Fee</Text>
                            <Text className="text-lg font-nunito-extrabold text-[#0061FF]">₹ 2499/Month</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <TouchableOpacity className="w-full bg-[#0095FF] py-4 rounded-2xl items-center mb-4 shadow-md shadow-blue-100">
                        <Text className="text-white font-nunito-extrabold text-lg">Hire Now</Text>
                    </TouchableOpacity>

                    <View className="flex-row gap-3 mb-12">
                        <TouchableOpacity className="flex-1 border border-gray-100 py-2.5 rounded-xl items-center bg-gray-50">
                            <Text className="text-gray-600 font-nunito-bold text-base">Follow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 border border-gray-100 py-2.5 rounded-xl items-center bg-gray-50">
                            <Text className="text-gray-600 font-nunito-bold text-base">Message</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Tabs */}
                    <View className="flex-row border-b border-gray-100 mb-6">
                        <TouchableOpacity
                            onPress={() => setActiveTab('Batches')}
                            className={`pb-2 mr-8 ${activeTab === 'Batches' ? 'border-b-2 border-[#0061FF]' : ''}`}
                        >
                            <Text className={`text-base font-nunito-extrabold ${activeTab === 'Batches' ? 'text-[#0061FF]' : 'text-gray-300'}`}>Batches</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('Demo')}
                            className={`pb-2 ${activeTab === 'Demo' ? 'border-b-2 border-[#0061FF]' : ''}`}
                        >
                            <Text className={`text-base font-nunito-extrabold ${activeTab === 'Demo' ? 'text-[#0061FF]' : 'text-gray-300'}`}>Free Demo Classes</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Batch List / Demo Classes */}
                    {activeTab === 'Batches' ? (
                        BATCHES.map(batch => (
                            <View key={batch.id} className="flex-row items-center mb-6">
                                <View className="relative">
                                    <LinearGradient
                                        colors={['#0061FF', '#60A5FA']}
                                        className="w-16 h-12 rounded-xl items-center justify-end overflow-hidden"
                                    >
                                        <View className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/10" />
                                        <Image source={require('../../assets/images/teacher1.png')} className="w-12 h-12" />
                                    </LinearGradient>
                                </View>
                                <View className="flex-1 ml-4 justify-center">
                                    <Text className="text-base font-nunito-extrabold text-[#1F2937] leading-tight">{batch.code}</Text>
                                    <Text className="text-sm font-nunito-bold text-gray-400">{batch.subject}</Text>
                                </View>
                                <View className="items-end justify-center">
                                    <Text className="text-[10px] font-nunito-bold text-gray-400">{batch.schedule}</Text>
                                    <Text className="text-[10px] font-nunito-bold text-gray-400">{batch.time}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mx-[-24px]">
                            <View className="flex-row px-6">
                                {DEMO_CLASSES.map(demo => (
                                    <View key={demo.id} className="w-64 mr-6">
                                        <View className="relative w-full h-40 rounded-3xl overflow-hidden mb-4">
                                            <LinearGradient
                                                colors={['#0061FF', '#60A5FA']}
                                                className="absolute inset-0 items-center justify-end"
                                            >
                                                <View className="absolute top-[-20] left-[-20] w-32 h-32 rounded-full bg-white/10" />
                                                <Image source={require('../../assets/images/teacher1.png')} className="w-32 h-32" />
                                            </LinearGradient>

                                            {/* View Count */}
                                            <View className="absolute bottom-4 left-4 flex-row items-center">
                                                <Ionicons name="eye-outline" size={14} color="white" />
                                                <Text className="text-white text-[10px] font-nunito-bold ml-1">{demo.views}</Text>
                                            </View>

                                            {/* Play Icon */}
                                            <View className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md items-center justify-center">
                                                <Ionicons name="play" size={16} color="white" />
                                            </View>
                                        </View>

                                        <View className="flex-row items-center mb-1">
                                            <Text className="text-sm font-nunito-extrabold text-[#1F2937] mr-2">{demo.subject}</Text>
                                            <View className="border border-gray-100 px-2 py-0.5 rounded-md bg-gray-50">
                                                <Text className="text-[10px] font-nunito-bold text-gray-400 uppercase">{demo.lang}</Text>
                                            </View>
                                        </View>
                                        <Text className="text-lg font-nunito-extrabold text-[#1F2937]">{demo.title}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    )}
                </View>
            </ScrollView>

            {/* Fixed Back Button Icon - Moved outside ScrollView for interactivity */}
            <SafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
                <View className="px-6 pt-10 flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2"
                    >
                        <Ionicons name="chevron-back" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
