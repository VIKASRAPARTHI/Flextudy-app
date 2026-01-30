import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';

export default function ProcessingScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        // Simulate payment processing time
        const timer = setTimeout(() => {
            // Random success/failure for demo, but defaulting to success mostly
            const isSuccess = true;
            if (isSuccess) {
                router.replace(`/checkout/${id}/result?status=success` as any);
            } else {
                router.replace(`/checkout/${id}/result?status=failure` as any);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View className="flex-1 bg-white items-center justify-center px-6">
            <StatusBar barStyle="dark-content" />
            <View className="w-20 h-20 bg-blue-50 rounded-full items-center justify-center mb-8 animate-pulse">
                <ActivityIndicator size="large" color="#0061FF" />
            </View>
            <Text className="text-xl font-nunito-extrabold text-[#1E293B] mb-2">Processing Payment...</Text>
            <Text className="text-sm font-nunito-medium text-gray-500 text-center">
                Please do not close this screen or press back.
            </Text>
        </View>
    );
}
