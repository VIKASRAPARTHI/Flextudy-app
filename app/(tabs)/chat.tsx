import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

// Mock Data
const CONVERSATIONS = [
    { id: '1', name: 'Sarah Wilson', lastMessage: 'See you at the class!', time: '10:30 AM', unread: 2 },
    { id: '2', name: 'David Chen', lastMessage: 'Can we reschedule?', time: 'Yesterday', unread: 0 },
    { id: '3', name: 'Emily Watson', lastMessage: 'Thanks for the notes.', time: 'Mon', unread: 0 },
];

export default function ChatList() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={CONVERSATIONS}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="flex-row items-center py-4 border-b border-gray-50 active:bg-gray-50"
                        onPress={() => router.push(`/chat/${item.id}`)}
                    >
                        <View className="w-14 h-14 bg-gray-200 rounded-full mr-4 items-center justify-center">
                            <FontAwesome name="user" size={24} color="#9CA3AF" />
                        </View>
                        <View className="flex-1">
                            <View className="flex-row justify-between mb-1">
                                <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                                <Text className="text-gray-400 text-xs">{item.time}</Text>
                            </View>
                            <Text className="text-gray-500 numberOfLines={1}">{item.lastMessage}</Text>
                        </View>
                        {item.unread > 0 && (
                            <View className="bg-primary w-6 h-6 rounded-full items-center justify-center ml-2">
                                <Text className="text-white text-xs font-bold">{item.unread}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
