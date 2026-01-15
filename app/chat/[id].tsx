import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mock Messages
const INITIAL_MESSAGES = [
    { id: '1', text: 'Hi! I am interested in your Math class.', sender: 'me', time: '10:00 AM' },
    { id: '2', text: 'Hello! I would be happy to help. What topics are you looking to cover?', sender: 'them', time: '10:05 AM' },
    { id: '3', text: 'Mostly Calculus and Algebra.', sender: 'me', time: '10:06 AM' },
    { id: '4', text: 'Perfect! I specialize in those. Would you like to schedule a demo?', sender: 'them', time: '10:10 AM' },
];

export default function ChatThread() {
    const { id } = useLocalSearchParams();
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (!inputText.trim()) return;
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: inputText,
            sender: 'me',
            time: 'Now'
        }]);
        setInputText('');
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Sarah Wilson', headerBackTitle: 'Chats' }} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                className="flex-1 bg-gray-50"
            >
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={({ item }) => (
                        <View className={`mb-4 flex-row ${item.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            {item.sender === 'them' && (
                                <View className="w-8 h-8 bg-gray-200 rounded-full mr-2 self-end mb-1" />
                            )}
                            <View
                                className={`p-3 rounded-2xl max-w-[75%] ${item.sender === 'me'
                                        ? 'bg-primary rounded-tr-none'
                                        : 'bg-white rounded-tl-none border border-gray-100'
                                    }`}
                            >
                                <Text className={`${item.sender === 'me' ? 'text-white' : 'text-gray-800'}`}>
                                    {item.text}
                                </Text>
                                <Text
                                    className={`text-[10px] mt-1 text-right ${item.sender === 'me' ? 'text-blue-100' : 'text-gray-400'
                                        }`}
                                >
                                    {item.time}
                                </Text>
                            </View>
                        </View>
                    )}
                />

                <View className="bg-white p-4 items-center flex-row border-t border-gray-100 mb-6">
                    <TextInput
                        className="flex-1 bg-gray-50 p-3 rounded-full mr-3 text-base"
                        placeholder="Type a message..."
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity
                        className="bg-primary p-3 rounded-full"
                        onPress={sendMessage}
                    >
                        <FontAwesome name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}
