import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleSelection() {
    const router = useRouter();

    const handleRoleSelect = (role: 'student' | 'teacher') => {
        // TODO: Pass role to sign up or next step
        console.log(`Selected role: ${role}`);
        router.push('/(auth)/signup');
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 py-6 justify-between">
            <View className="items-center w-full flex-1 justify-center pt-16">
                {/* Top Image */}
                <Image
                    source={require('../../assets/images/choose_role.jpg')}
                    className="w-full h-80 mb-6"
                    resizeMode="contain"
                />

                {/* Title and Description */}
                <Text className="text-2xl font-nunito-extrabold text-center text-gray-900 mb-4">
                    Take a demo class before hiring
                </Text>
                <Text className="text-gray-500 font-nunito-medium text-center text-base leading-6 mb-8 px-4">
                    You can arrange or take a demo class before appointing a teacher. As a result, you will get an advance idea about the tutor's teaching quality
                </Text>

                {/* Join As Section */}
                <Text className="text-lg font-nunito-extrabold text-gray-900 mb-6 self-start w-full text-center mt-12">Join As</Text>

                <View className="flex-row w-full justify-between gap-4 mb-4">
                    <TouchableOpacity
                        className="flex-1 bg-primary py-4 rounded-xl items-center"
                        onPress={() => handleRoleSelect('student')}
                    >
                        <Text className="text-white font-nunito-semibold text-lg">Student</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 bg-gray-100 py-4 rounded-xl items-center"
                        onPress={() => handleRoleSelect('teacher')}
                    >
                        <Text className="text-gray-900 font-nunito-semibold text-lg">Teacher</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Login Link */}
            <View className="flex-row items-center justify-center pb-4">
                <Text className="text-gray-500 font-nunito-medium text-base">Already have an account? </Text>
                <Link href="/(auth)/login" asChild>
                    <TouchableOpacity>
                        <Text className="text-primary font-nunito-semibold text-base">Log In</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    );
}
