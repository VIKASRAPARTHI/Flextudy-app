import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function RoleSelection() {
    const router = useRouter();

    const selectRole = (role: 'student' | 'teacher' | 'parent') => {
        // TODO: Save role to storage
        console.log('Selected role:', role);
        router.push('/(auth)/login');
    }

    return (
        <View className="flex-1 items-center justify-center bg-white p-4 gap-4">
            <Text className="text-2xl font-bold text-gray-900 mb-8">Choose your role</Text>

            <RoleButton title="I am a Student" onPress={() => selectRole('student')} />
            <RoleButton title="I am a Teacher" onPress={() => selectRole('teacher')} />
            <RoleButton title="I am a Parent" onPress={() => selectRole('parent')} />
        </View>
    );
}

function RoleButton({ title, onPress }: { title: string, onPress: () => void }) {
    return (
        <TouchableOpacity
            className="w-full bg-gray-100 p-6 rounded-xl border border-gray-200 active:bg-blue-50"
            onPress={onPress}
        >
            <Text className="text-lg font-semibold text-center text-gray-800">{title}</Text>
        </TouchableOpacity>
    )
}
