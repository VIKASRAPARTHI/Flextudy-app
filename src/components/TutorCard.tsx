import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export type TutorProps = {
    id: string;
    name: string;
    subject: string;
    rating: number;
    price: number;
    imageUrl?: string;
};

export default function TutorCard({ tutor }: { tutor: TutorProps }) {
    const router = useRouter();

    return (
        <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4">
            <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 bg-gray-200 rounded-full mr-3 overflow-hidden">
                    {/* Placeholder or actual image */}
                    <FontAwesome name="user" size={24} color="#9CA3AF" style={{ margin: 10, alignSelf: 'center' }} />
                </View>
                <View>
                    <Text className="text-lg font-bold text-gray-900">{tutor.name}</Text>
                    <Text className="text-gray-500 text-sm">{tutor.subject}</Text>
                </View>
                <View className="ml-auto flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <FontAwesome name="star" size={14} color="#FBBF24" />
                    <Text className="ml-1 font-bold text-yellow-700">{tutor.rating}</Text>
                </View>
            </View>
            <View className="flex-row items-center justify-between mt-2">
                <Text className="text-primary font-bold text-lg">${tutor.price}<Text className="text-gray-400 text-sm font-normal">/hr</Text></Text>
                <TouchableOpacity
                    className="bg-primary px-4 py-2 rounded-lg"
                    onPress={() => router.push(`/tutor/${tutor.id}`)}
                >
                    <Text className="text-white font-semibold">Book Demo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
