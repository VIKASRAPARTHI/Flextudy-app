import React, { useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Mock Data matching the design
const CHAT_DATA = [
    {
        id: '1',
        name: 'Larry Machigo',
        message: 'Ok. Let me check',
        time: '09:38 AM',
        avatar: 'https://i.pravatar.cc/150?u=1',
        isPinned: true,
        unread: 0,
        isTyping: false,
        type: 'chat',
    },
    {
        id: '2',
        name: 'Natalie Nora',
        message: 'Natalie is typing...',
        time: '',
        avatar: 'https://i.pravatar.cc/150?u=2',
        isPinned: false,
        unread: 2,
        isTyping: true,
        type: 'chat',
    },
    {
        id: 'g1',
        name: 'Math Study Group',
        message: 'Larry: Did anyone solve q3?',
        time: '10:00 AM',
        avatar: 'https://ui-avatars.com/api/?name=Math+Group&background=6366F1&color=fff',
        isPinned: false,
        unread: 5,
        isTyping: false,
        type: 'group',
    },
    {
        id: '3',
        name: 'Jennifer Jones',
        message: 'Voice message',
        time: '02:03 AM',
        avatar: 'https://i.pravatar.cc/150?u=3',
        isPinned: false,
        unread: 0,
        isTyping: false,
        isVoice: true,
        type: 'chat',
    },
    {
        id: 'g2',
        name: 'Physics Project',
        message: 'Meeting at 5 PM',
        time: 'Yesterday',
        avatar: 'https://ui-avatars.com/api/?name=Physics+Project&background=F59E0B&color=fff',
        isPinned: true,
        unread: 0,
        isTyping: false,
        type: 'group',
    },
    {
        id: '4',
        name: 'Larry Machigo',
        message: 'See you tomorrow, take...',
        time: 'Yesterday',
        avatar: 'https://i.pravatar.cc/150?u=4',
        isPinned: false,
        unread: 0,
        isTyping: false,
        type: 'chat',
    },
    {
        id: '5',
        name: 'Sofia',
        message: 'Oh... thank you so...',
        time: '26 May',
        avatar: 'https://i.pravatar.cc/150?u=5',
        isPinned: false,
        unread: 0,
        isTyping: false,
        type: 'chat',
    },
    {
        id: '6',
        name: 'Haider Lve',
        message: 'Sticker',
        time: '12 Jun',
        avatar: 'https://i.pravatar.cc/150?u=6',
        isPinned: false,
        unread: 0,
        isTyping: false,
        isSticker: true,
        type: 'chat',
    },
    {
        id: '7',
        name: 'Mr, elon',
        message: 'Cool --))))',
        time: '12 Jun',
        avatar: 'https://i.pravatar.cc/150?u=7',
        isPinned: false,
        unread: 0,
        isTyping: false,
        type: 'chat',
    },
];

export default function Chat() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('Chats');
    const router = useRouter();

    const filteredData = CHAT_DATA.filter(item => {
        if (activeTab === 'Chats') return item.type === 'chat';
        if (activeTab === 'Groups') return item.type === 'group';
        return true;
    });

    const renderItem = ({ item }: { item: typeof CHAT_DATA[0] }) => (
        <TouchableOpacity
            onPress={() => router.push({
                pathname: item.type === 'group' ? '/group/[id]' : '/chat/[id]',
                params: {
                    id: item.id,
                    name: item.name,
                    avatar: item.avatar
                }
            })}
            className="flex-row items-center py-4 px-5 border-b border-gray-50 active:bg-gray-50"
        >
            {/* Avatar */}
            <Image
                source={{ uri: item.avatar }}
                className="w-14 h-14 rounded-full bg-gray-200"
            />

            {/* Content */}
            <View className="flex-1 ml-4 justify-center">
                <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-gray-900 font-nunito-bold text-lg text-left">
                        {item.name}
                        {item.isPinned && (
                            <Ionicons name="pricetag" size={14} color="#6366F1" style={{ marginLeft: 6, transform: [{ rotate: '45deg' }] }} />
                        )}
                    </Text>
                    <Text className="text-gray-400 font-nunito-medium text-xs">
                        {item.time}
                    </Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center flex-1 mr-2">
                        {item.isVoice && (
                            <Ionicons name="mic" size={14} color="#6366F1" style={{ marginRight: 4 }} />
                        )}
                        {item.isSticker && (
                            <Ionicons name="happy" size={14} color="#F59E0B" style={{ marginRight: 4 }} />
                        )}
                        <Text
                            className={`font-nunito-medium text-sm text-left ${item.isTyping ? 'text-indigo-600 italic' : 'text-gray-500'}`}
                            numberOfLines={1}
                        >
                            {item.message}
                        </Text>
                    </View>

                    {item.unread > 0 && (
                        <View className="bg-indigo-600 rounded-full w-5 h-5 items-center justify-center">
                            <Text className="text-white text-xs font-bold">{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white">
            <LinearGradient
                colors={['#0061FF', '#F0F9FF', '#FFFFFF']}
                locations={[0, 0.3, 0.6]}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }}
            />
            <SafeAreaView className="flex-1 pt-12">
                {/* Header Actions */}
                <View className="flex-row justify-end items-center px-6 pb-2">
                    <View className="flex-row gap-1">
                        <TouchableOpacity className="p-2">
                            <Ionicons name="search-outline" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2">
                            <Ionicons name="ellipsis-vertical" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Custom Tabs */}
                <View className="px-5 mb-4">
                    <View className="flex-row bg-white/20 p-1.5 rounded-[20px] border border-white/10">
                        {['Chats', 'Groups'].map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <Pressable
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 12,
                                        borderRadius: 16,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: isActive ? 'white' : 'transparent',
                                    }}
                                >
                                    <Text style={{
                                        fontFamily: 'Nunito-Bold',
                                        fontSize: 14,
                                        color: isActive ? '#0061FF' : 'white'
                                    }}>
                                        {tab}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                {/* List Container - White rounded sheet effect? 
                    The reference image shows the list on a white card.
                    Let's wrap the list in a white container with rounded top corners.
                */}
                <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden pt-2">
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* FAB */}
                <TouchableOpacity
                    className="absolute bottom-24 right-5 w-14 h-14 bg-[#0061FF] rounded-full items-center justify-center shadow-lg shadow-indigo-200"
                    style={{ elevation: 5 }}
                >
                    <Ionicons name="add" size={28} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}
