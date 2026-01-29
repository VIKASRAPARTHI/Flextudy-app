import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PAYMENTS_DATA = [
    {
        id: '1',
        invoiceNo: '#0010861',
        status: 'PAID',
        month: 'November',
        category: 'Monthly Fees',
        date: '17-09-25',
        time: '08:12 AM',
        amount: '$250.00'
    },
    {
        id: '2',
        invoiceNo: '#0010862',
        status: 'PAID',
        month: 'October',
        category: 'Monthly Fees',
        date: '17-09-25',
        time: '08:12 AM',
        amount: '$250.00'
    },
    {
        id: '3',
        invoiceNo: '#0010863',
        status: 'DUE',
        month: 'September',
        category: 'Monthly Fees',
        date: '17-09-25',
        time: '08:12 AM',
        amount: '$250.00'
    },
    {
        id: '4',
        invoiceNo: '#0010864',
        status: 'PAID',
        month: 'August',
        category: 'Monthly Fees',
        date: '17-09-25',
        time: '08:12 AM',
        amount: '$250.00'
    }
];

export default function PaymentsScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View className="flex-1 bg-[#F8FAFC]">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="px-6 pt-12 pb-4 flex-row items-center justify-between bg-white">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center bg-gray-50 rounded-full"
                >
                    <Ionicons name="chevron-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text className="text-xl font-nunito-extrabold text-[#1E293B]">Payment History</Text>
                <TouchableOpacity className="w-10 h-10 items-center justify-center">
                    <Ionicons name="menu-outline" size={24} color="#1E293B" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Search Bar */}
                <View className="px-6 mt-6">
                    <View className="bg-white rounded-2xl flex-row items-center px-4 py-3 border border-gray-100 shadow-sm">
                        <Ionicons name="search-outline" size={20} color="#94A3B8" />
                        <TextInput
                            placeholder="Search invoice, month..."
                            placeholderTextColor="#94A3B8"
                            className="flex-1 ml-3 font-nunito-medium text-sm text-[#1E293B]"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* Legend/Info Section (Optional but good for UX) */}
                <View className="px-6 mt-6 flex-row items-center justify-between">
                    <Text className="text-[#1E293B] font-nunito-extrabold text-sm tracking-wider uppercase">Transactions</Text>
                    <View className="flex-row items-center">
                        <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                        <Text className="text-gray-400 font-nunito-bold text-[10px] uppercase mr-4">Paid</Text>
                        <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                        <Text className="text-gray-400 font-nunito-bold text-[10px] uppercase">Due</Text>
                    </View>
                </View>

                {/* Payment Cards */}
                <View className="px-6 mt-4">
                    {PAYMENTS_DATA.map((item) => (
                        <View key={item.id} className="bg-white rounded-[32px] mb-6 shadow-sm border border-gray-50 overflow-hidden">
                            {/* Top Section with Ribbon */}
                            <View className="p-6 border-b border-gray-50">
                                <View className="flex-row justify-between items-center mb-6">
                                    <View className="flex-row items-center">
                                        {/* Status Ribbon/Badge Styled as per image */}
                                        <View className={`flex-row items-center px-3 py-1.5 rounded-xl mr-4 ${item.status === 'PAID' ? 'bg-green-50' : 'bg-red-50'}`}>
                                            <Ionicons
                                                name={item.status === 'PAID' ? 'checkmark-circle' : 'alert-circle'}
                                                size={18}
                                                color={item.status === 'PAID' ? '#10B981' : '#EF4444'}
                                            />
                                            <Text className={`ml-2 font-nunito-extrabold text-xs ${item.status === 'PAID' ? 'text-green-600' : 'text-red-600'}`}>
                                                {item.status}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text className="text-gray-400 font-nunito-bold text-[10px] uppercase tracking-wider">Invoice Receipt</Text>
                                            <Text className="text-[#1E293B] font-nunito-extrabold text-base">{item.invoiceNo}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity className="w-10 h-10 bg-blue-50 rounded-2xl items-center justify-center">
                                        <Ionicons name="download-outline" size={20} color="#0061FF" />
                                    </TouchableOpacity>
                                </View>

                                {/* Metadata Grid */}
                                <View className="flex-row justify-between">
                                    <View className="items-center flex-1">
                                        <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mb-2">
                                            <Ionicons name="calendar-outline" size={18} color="#64748B" />
                                        </View>
                                        <Text className="text-gray-400 font-nunito-bold text-[8px] uppercase">Month</Text>
                                        <Text className="text-[#1E293B] font-nunito-extrabold text-[11px] mt-0.5">{item.month}</Text>
                                    </View>

                                    <View className="h-10 w-px bg-gray-100 self-center" />

                                    <View className="items-center flex-1">
                                        <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mb-2">
                                            <Ionicons name="pricetag-outline" size={18} color="#64748B" />
                                        </View>
                                        <Text className="text-gray-400 font-nunito-bold text-[8px] uppercase">Category</Text>
                                        <Text className="text-[#1E293B] font-nunito-extrabold text-[11px] mt-0.5">{item.category}</Text>
                                    </View>

                                    <View className="h-10 w-px bg-gray-100 self-center" />

                                    <View className="items-center flex-1">
                                        <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mb-2">
                                            <Ionicons name="time-outline" size={18} color="#64748B" />
                                        </View>
                                        <Text className="text-gray-400 font-nunito-bold text-[8px] uppercase">{item.status === 'PAID' ? 'Paid Date' : 'Date Over'}</Text>
                                        <Text className="text-[#1E293B] font-nunito-extrabold text-[11px] mt-0.5">{item.date}</Text>
                                        <Text className="text-gray-300 font-nunito-bold text-[9px]">{item.time}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Optional Bottom Action Area */}
                            <TouchableOpacity
                                className={`py-4 items-center justify-center ${item.status === 'PAID' ? 'bg-green-50/50' : 'bg-red-50/50'}`}
                                activeOpacity={0.7}
                            >
                                <Text className={`font-nunito-extrabold text-xs ${item.status === 'PAID' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.status === 'PAID' ? 'View Details' : 'Pay Now'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
