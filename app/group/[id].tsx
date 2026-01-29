import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const INITIAL_MESSAGES = [
    {
        id: '1',
        text: 'Hey 👋',
        sender: 'them',
        time: '10:00 AM',
    },
    {
        id: '2',
        text: 'Are you available for a New UI Project',
        sender: 'them',
        time: '10:05 AM',
    },
    {
        id: '3',
        text: 'Hello!',
        sender: 'me',
        time: '10:06 AM',
    },
    {
        id: '4',
        text: 'yes, have some space for the new task',
        sender: 'me',
        time: '10:07 AM',
    },
    {
        id: '5',
        text: 'Cool, should I share the details now?',
        sender: 'them',
        time: '10:10 AM',
    },
    {
        id: '6',
        text: 'Yes Sure, please',
        sender: 'me',
        time: '10:11 AM',
    },
    {
        id: '7',
        text: 'Great, here is the SOW of the Project',
        sender: 'them',
        time: '10:12 AM',
    },
    {
        id: '8',
        text: 'UI Brief.docx',
        sender: 'them',
        time: '10:12 AM',
        isAttachment: true,
        size: '269.18 KB'
    },
];

export default function GroupDetail() {
    const { id, name, avatar } = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (!inputText.trim()) return;
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                text: inputText,
                sender: 'me',
                time: 'Now',
            },
        ]);
        setInputText('');
    };

    // Reverse messages for inverted list (Index 0 is Visual Bottom)
    const invertedMessages = [...messages].reverse();

    const renderMessage = ({ item }: { item: typeof INITIAL_MESSAGES[0] }) => {
        const isMe = item.sender === 'me';

        if (item.isAttachment) {
            return (
                <View className="flex-row mb-6">
                    <View className="bg-gray-100 p-4 rounded-2xl rounded-tl-none w-[70%] flex-row items-center border border-gray-200">
                        <View className="w-10 h-10 bg-[#0061FF]/10 rounded-full items-center justify-center mr-3">
                            <Ionicons name="document-text-outline" size={20} color="#0061FF" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-900 font-none text-base font-nunito-bold">{item.text}</Text>
                            <Text className="text-gray-500 text-xs">{item.size}</Text>
                        </View>
                        <TouchableOpacity className="w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                            <Ionicons name="download-outline" size={16} color="#4B5563" />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return (
            <View className={`flex-row mb-6 ${isMe ? 'justify-end' : 'justify-start'}`}>
                <View
                    className={`p-4 rounded-[24px] max-w-[80%] ${isMe
                        ? 'bg-[#0061FF] rounded-tr-none shadow-sm'
                        : 'bg-gray-100 rounded-tl-none border border-gray-100'
                        }`}
                >
                    <Text
                        className={`font-nunito-medium text-base ${isMe ? 'text-white' : 'text-gray-900'
                            }`}
                    >
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="relative z-10 pt-8 pb-4 border-b border-gray-50">
                <View className="flex-row items-center justify-between px-6 pt-6">
                    {/* Left: Back & Profile - GROUP HEADER */}
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => router.back()} className="mr-4">
                            <Ionicons name="arrow-back" size={24} color="#000000" />
                        </TouchableOpacity>

                        <View className="relative">
                            <Image
                                source={{ uri: (avatar as string) || 'https://ui-avatars.com/api/?name=Group&background=random' }}
                                className="w-10 h-10 rounded-full bg-indigo-300"
                            />
                        </View>

                        <View className="ml-3">
                            <Text className="text-gray-900 font-nunito-bold text-lg">
                                {name || 'Group Chat'}
                            </Text>
                            <Text className="text-gray-400 text-xs">tap for group info</Text>
                        </View>
                    </View>

                    {/* Right: Call Buttons */}
                    <View className="flex-row items-center gap-1 pt-2 pr-1">
                        <TouchableOpacity className="p-2">
                            <Ionicons name="videocam-outline" size={28} color="#4B5563" />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2">
                            <Ionicons name="call-outline" size={24} color="#4B5563" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Chat Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
                className="flex-1"
            >
                <FlatList
                    data={invertedMessages}
                    inverted
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24, paddingBottom: 60 }}
                    showsVerticalScrollIndicator={false}
                />

                {/* Input Area */}
                <View className="px-5 pb-4 pt-2">
                    <View className="flex-row items-center space-x-3 bg-transparent">

                        {/* Input Field Container */}
                        <View className="flex-1 flex-row items-center bg-white rounded-full px-5 py-3 min-h-[50px] shadow-sm">
                            <TouchableOpacity className="mr-2">
                                <Ionicons name="mic-outline" size={22} color="#9CA3AF" />
                            </TouchableOpacity>

                            <TextInput
                                className="flex-1 text-gray-900 font-nunito-medium text-base h-full"
                                placeholder="Message group..."
                                placeholderTextColor="#9CA3AF"
                                value={inputText}
                                onChangeText={setInputText}
                                multiline
                            />

                            <TouchableOpacity className="ml-1 transform rotate-45">
                                <Ionicons name="attach-outline" size={24} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>

                        {/* Send Button */}
                        <TouchableOpacity
                            onPress={sendMessage}
                            className="w-12 h-12 bg-white rounded-full items-center justify-center shrink-0 shadow-sm"
                        >
                            <Ionicons name="send" size={20} color="#0061FF" style={{ marginLeft: 2 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
