import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function ResultScreen() {
    const router = useRouter();
    const { id, status } = useLocalSearchParams();
    const isSuccess = status === 'success';

    const handlePrimaryAction = () => {
        if (isSuccess) {
            // Go to My Courses (mock: pop to top then navigate, or replace)
            // For now, back to course details which needs to be unlocked ideally
            router.replace(`/course-details/${id}`);
        } else {
            // Retry
            router.back();
        }
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            <View className="flex-1 items-center justify-center px-8">
                <View className={`w-24 h-24 rounded-full items-center justify-center mb-6 ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
                    <Ionicons
                        name={isSuccess ? "checkmark-circle" : "alert-circle"}
                        size={48}
                        color={isSuccess ? "#22C55E" : "#EF4444"}
                    />
                </View>

                <Text className="text-2xl font-nunito-extrabold text-[#1E293B] mb-2 text-center">
                    {isSuccess ? 'Payment Successful 🎉' : 'Payment Failed'}
                </Text>

                <Text className="text-sm font-nunito-medium text-gray-500 text-center mb-8 leading-6">
                    {isSuccess
                        ? 'You have successfully enrolled in "Job Preparation Full Course". Happy Learning!'
                        : 'Something went wrong with your transaction. Please try again or use a different payment method.'}
                </Text>

                {isSuccess && (
                    <View className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-8">
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-xs font-nunito-bold text-gray-400">Transaction ID</Text>
                            <Text className="text-xs font-nunito-bold text-[#1E293B]">TXN_{Math.floor(Math.random() * 1000000)}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-xs font-nunito-bold text-gray-400">Amount Paid</Text>
                            <Text className="text-xs font-nunito-bold text-[#1E293B]">$52.50</Text>
                        </View>
                    </View>
                )}

                <TouchableOpacity
                    className={`w-full h-14 rounded-2xl items-center justify-center shadow-lg mb-4 ${isSuccess ? 'bg-[#0061FF] shadow-blue-500/20' : 'bg-[#1E293B]'}`}
                    onPress={handlePrimaryAction}
                >
                    <Text className="text-white font-nunito-extrabold text-base">
                        {isSuccess ? 'Start Learning' : 'Retry Payment'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.replace('/courses')}
                >
                    <Text className="text-sm font-nunito-bold text-gray-400">
                        {isSuccess ? 'Go to My Courses' : 'Cancel'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
