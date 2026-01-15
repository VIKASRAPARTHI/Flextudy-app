import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Whiteboard() {
    return (
        <View className="flex-1 bg-white m-2 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">

            {/* Toolbar */}
            <View className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-100 rounded-full py-2 px-1 gap-4 z-10">
                <TouchableOpacity className="p-2 bg-gray-100 rounded-full">
                    <FontAwesome name="pencil" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2">
                    <FontAwesome name="eraser" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2">
                    <FontAwesome name="font" size={20} color="gray" />
                </TouchableOpacity>
                <View className="w-6 h-6 rounded-full bg-red-500 border-2 border-white mx-auto" />
                <View className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white mx-auto" />
            </View>

            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-300 transform -rotate-12 text-4xl font-bold opacity-20">Whiteboard Canvas</Text>
            </View>

        </View>
    );
}
