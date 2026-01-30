import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CheckoutConfirmationScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [promoCode, setPromoCode] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    // Mock data
    const course = {
        title: 'Job Preparation Full Course',
        instructor: 'HM Zaman',
        image: 'https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg',
        price: 50.00,
        tax: 2.50,
        discount: 0.00,
    };

    const total = course.price + course.tax - course.discount;

    return (
        <View className="flex-1 bg-[#0061FF]">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="px-6 pt-12 pb-6 flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center bg-white/20 rounded-full"
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-nunito-extrabold text-white">Confirmation</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
                >
                    {/* Course Summary */}
                    <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-4">Course Details</Text>
                    <View className="flex-row items-center bg-white p-3 rounded-2xl border border-gray-100 shadow-sm mb-6">
                        <Image
                            source={{ uri: course.image }}
                            className="w-20 h-20 rounded-xl bg-gray-50 mr-4"
                            resizeMode="cover"
                        />
                        <View className="flex-1">
                            <Text className="text-sm font-nunito-extrabold text-[#1E293B] mb-1" numberOfLines={2}>
                                {course.title}
                            </Text>
                            <Text className="text-xs font-nunito-semibold text-gray-400 mb-2">
                                By {course.instructor}
                            </Text>
                            <Text className="text-base font-nunito-extrabold text-[#0061FF]">
                                ${course.price.toFixed(2)}
                            </Text>
                        </View>
                    </View>

                    {/* Promo Code */}
                    <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-4">Discount Code</Text>
                    <View className="flex-row items-center mb-6">
                        <View className="flex-1 h-12 bg-gray-50 rounded-xl border border-gray-200 px-4 justify-center mr-3">
                            <TextInput
                                placeholder="Enter Coupon Code"
                                placeholderTextColor="#94A3B8"
                                className="font-nunito-bold text-[#1E293B]"
                                value={promoCode}
                                onChangeText={setPromoCode}
                            />
                        </View>
                        <TouchableOpacity className="h-12 px-6 bg-[#1E293B] rounded-xl items-center justify-center">
                            <Text className="text-white font-nunito-bold text-sm">Apply</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Breakdown */}
                    <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-4">Payment Summary</Text>
                    <View className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6">
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-sm font-nunito-semibold text-gray-500">Course Price</Text>
                            <Text className="text-sm font-nunito-bold text-[#1E293B]">${course.price.toFixed(2)}</Text>
                        </View>
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-sm font-nunito-semibold text-gray-500">Tax & Fees</Text>
                            <Text className="text-sm font-nunito-bold text-[#1E293B]">${course.tax.toFixed(2)}</Text>
                        </View>
                        <View className="flex-row justify-between mb-4">
                            <Text className="text-sm font-nunito-semibold text-gray-500">Discount</Text>
                            <Text className="text-sm font-nunito-bold text-green-500">-${course.discount.toFixed(2)}</Text>
                        </View>
                        <View className="h-[1px] bg-gray-200 mb-4" />
                        <View className="flex-row justify-between items-center">
                            <Text className="text-base font-nunito-extrabold text-[#1E293B]">Total Amount</Text>
                            <Text className="text-xl font-nunito-extrabold text-[#0061FF]">${total.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Terms */}
                    <TouchableOpacity
                        className="flex-row items-start mb-4"
                        onPress={() => setTermsAccepted(!termsAccepted)}
                    >
                        <View className={`w-5 h-5 rounded-md border mr-3 items-center justify-center ${termsAccepted ? 'bg-[#0061FF] border-[#0061FF]' : 'border-gray-300 bg-white'}`}>
                            {termsAccepted && <Ionicons name="checkmark" size={14} color="white" />}
                        </View>
                        <Text className="flex-1 text-xs font-nunito-medium text-gray-500 leading-5">
                            I agree to the <Text className="text-[#0061FF] font-nunito-bold">Terms & Conditions</Text> and <Text className="text-[#0061FF] font-nunito-bold">Refund Policy</Text>.
                        </Text>
                    </TouchableOpacity>

                </ScrollView>

                {/* Footer */}
                <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
                    <TouchableOpacity
                        className={`w-full h-14 rounded-2xl items-center justify-center shadow-lg ${termsAccepted ? 'bg-[#0061FF] shadow-blue-500/20' : 'bg-gray-300 shadow-none'}`}
                        disabled={!termsAccepted}
                        onPress={() => router.push(`/checkout/${id}/payment-method` as any)}
                    >
                        <Text className="text-white font-nunito-extrabold text-base">Proceed to Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
