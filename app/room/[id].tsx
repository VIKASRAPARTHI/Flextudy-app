import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import VideoGrid from '@/features/classroom/VideoGrid';
import Whiteboard from '@/features/classroom/Whiteboard';

export default function Classroom() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'video' | 'board'>('video');

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView className="flex-1 bg-gray-900">

                {/* Header */}
                <View className="flex-row justify-between items-center px-4 py-2">
                    <TouchableOpacity onPress={() => router.back()} className="bg-white/10 p-2 rounded-full">
                        <FontAwesome name="chevron-down" size={20} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-lg">Advanced Algebra</Text>
                    <View className="bg-red-500 px-3 py-1 rounded-md">
                        <Text className="text-white text-xs font-bold">REC</Text>
                    </View>
                </View>

                {/* Content Area */}
                <View className="flex-1">
                    {activeTab === 'video' ? <VideoGrid /> : <Whiteboard />}
                </View>

                {/* Controls */}
                <View className="bg-gray-800 p-4 pb-8 flex-row justify-between items-center px-8 border-t border-gray-700">
                    <TouchableOpacity className="p-3 bg-white/10 rounded-full">
                        <FontAwesome name="microphone" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-3 bg-white/10 rounded-full">
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`p-4 rounded-full ${activeTab === 'board' ? 'bg-primary' : 'bg-white/10'}`}
                        onPress={() => setActiveTab(activeTab === 'video' ? 'board' : 'video')}
                    >
                        <FontAwesome name="pencil-square-o" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="p-4 bg-red-500 rounded-full"
                        onPress={() => router.back()}
                    >
                        <FontAwesome name="phone" size={24} color="white" />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </>
    );
}
