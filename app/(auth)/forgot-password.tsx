import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function ForgotPassword() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white p-6">
            <View className="flex-row items-center mb-8">
                <TouchableOpacity
                    className="bg-gray-50 p-2 rounded-lg"
                    onPress={() => router.back()}
                >
                    <FontAwesome name="angle-left" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-xl font-nunito-bold text-gray-900 ml-4">Reset Password</Text>
            </View>
            <View className="flex-1 items-center justify-center">
                <Text className="text-gray-500 font-nunito-medium">Forgot Password feature coming soon.</Text>
            </View>
        </SafeAreaView>
    );
}
