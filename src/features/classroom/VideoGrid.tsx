import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from 'react-native';

export default function VideoGrid() {
    return (
        <View className="flex-1 bg-gray-900 justify-center flex-row flex-wrap p-2 gap-2">
            {/* Teacher View */}
            <View className="flex-1 bg-gray-800 rounded-2xl overflow-hidden justify-center items-center min-w-[45%] h-[45%]">
                <FontAwesome name="user" size={64} color="#6B7280" />
                <View className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-lg">
                    <Text className="text-white text-xs font-bold">Prof. Sarah</Text>
                </View>
                <View className="absolute top-2 right-2 bg-red-500 p-1 rounded-full">
                    <FontAwesome name="microphone-slash" size={12} color="white" />
                </View>
            </View>

            {/* Student View (You) */}
            <View className="flex-1 bg-gray-800 rounded-2xl overflow-hidden justify-center items-center min-w-[45%] h-[45%] border-2 border-primary">
                <FontAwesome name="user" size={64} color="#6B7280" />
                <View className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-lg">
                    <Text className="text-white text-xs font-bold">You</Text>
                </View>
            </View>
        </View>
    );
}
