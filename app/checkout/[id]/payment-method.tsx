import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentMethodScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [selectedMethod, setSelectedMethod] = useState('UPI');

    const paymentMethods = [
        { id: 'UPI', label: 'UPI', icon: 'qr-code-outline', subtext: 'Google Pay, PhonePe, Paytm' },
        { id: 'Card', label: 'Credit / Debit Card', icon: 'card-outline', subtext: 'Visa, Mastercard, Rupay' },
        { id: 'NetBanking', label: 'Net Banking', icon: 'globe-outline', subtext: 'All Indian Banks' },
        { id: 'Wallet', label: 'Wallets', icon: 'wallet-outline', subtext: 'Paytm, Amazon Pay' },
        { id: 'EMI', label: 'EMI', icon: 'calendar-outline', subtext: 'No Cost EMI available' },
    ];

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
                <Text className="text-xl font-nunito-extrabold text-white">Payment Method</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
                >
                    <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-6">Select Option</Text>

                    {paymentMethods.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            className={`flex-row items-center p-4 rounded-2xl mb-4 border ${selectedMethod === method.id ? 'bg-blue-50 border-[#0061FF]' : 'bg-white border-gray-100'}`}
                            onPress={() => setSelectedMethod(method.id)}
                        >
                            <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${selectedMethod === method.id ? 'bg-white' : 'bg-gray-50'}`}>
                                <Ionicons
                                    name={method.icon as any}
                                    size={24}
                                    color={selectedMethod === method.id ? '#0061FF' : '#64748B'}
                                />
                            </View>
                            <View className="flex-1">
                                <Text className={`text-base font-nunito-bold ${selectedMethod === method.id ? 'text-[#0061FF]' : 'text-[#1E293B]'}`}>
                                    {method.label}
                                </Text>
                                <Text className="text-xs font-nunito-medium text-gray-500 mt-0.5">
                                    {method.subtext}
                                </Text>
                            </View>
                            <View className={`w-5 h-5 rounded-full border items-center justify-center ${selectedMethod === method.id ? 'border-[#0061FF]' : 'border-gray-300'}`}>
                                {selectedMethod === method.id && <View className="w-2.5 h-2.5 rounded-full bg-[#0061FF]" />}
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Footer */}
                <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-sm font-nunito-bold text-gray-500">Total Amount</Text>
                        <Text className="text-xl font-nunito-extrabold text-[#1E293B]">$52.50</Text>
                    </View>
                    <TouchableOpacity
                        className="w-full bg-[#0061FF] h-14 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/20"
                        onPress={() => router.push(`/checkout/${id}/processing` as any)}
                    >
                        <Text className="text-white font-nunito-extrabold text-base">Pay Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
