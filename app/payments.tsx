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
    const [activeTab, setActiveTab] = useState('All');

    const tabs = ['All', 'Paid', 'Due'];

    const filteredPayments = PAYMENTS_DATA.filter(item => {
        const matchesSearch = item.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.month.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'All' || item.status === activeTab.toUpperCase();
        return matchesSearch && matchesTab;
    });

    return (
        <View className="flex-1 bg-[#0061FF]">
            <StatusBar barStyle="light-content" />

            {/* Sticky Header */}
            <View className="px-6 pt-12 pb-6">
                <View className="flex-row items-center justify-between mb-6">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center bg-white/20 rounded-full"
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-nunito-extrabold text-white">Payment History</Text>
                    <View className="w-10" />
                </View>

                {/* Search Bar in Header */}
                <View className="bg-white/10 rounded-2xl flex-row items-center px-4 py-2.5 border border-white/20 backdrop-blur-xl">
                    <Ionicons name="search-outline" size={18} color="white" />
                    <TextInput
                        placeholder="Search invoice, month..."
                        placeholderTextColor="rgba(255,255,255,0.6)"
                        className="flex-1 ml-3 font-nunito-semibold text-sm text-white"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl overflow-hidden">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40, paddingTop: 30 }}
                >
                    <View className="px-6">
                        {/* Tabs */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-8 overflow-visible">
                            {tabs.map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    className={`mr-3 px-6 py-2.5 rounded-xl ${activeTab === tab ? 'bg-[#0061FF]' : 'bg-gray-50'}`}
                                >
                                    <Text className={`font-nunito-bold text-xs ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Transaction List */}
                        <Text className="text-[#1E293B] font-nunito-extrabold text-lg mb-6">Transactions</Text>

                        {filteredPayments.map((item) => (
                            <View key={item.id} className="bg-white rounded-[32px] mb-6 shadow-sm border border-gray-100 overflow-hidden flex-row">
                                <View className={`w-1.5 h-full ${item.status === 'PAID' ? 'bg-[#0061FF]' : 'bg-[#F59E0B]'}`} />
                                <View className="flex-1 p-6">
                                    <View className="flex-row justify-between items-start mb-4">
                                        <View>
                                            <View className="flex-row items-center mb-1">
                                                <Text className="text-gray-400 font-nunito-bold text-[10px] uppercase tracking-wider">{item.category}</Text>
                                                <View className={`w-1.5 h-1.5 rounded-full mx-2 ${item.status === 'PAID' ? 'bg-blue-400' : 'bg-orange-400'}`} />
                                                <Text className={`font-nunito-bold text-[10px] uppercase ${item.status === 'PAID' ? 'text-blue-600' : 'text-orange-600'}`}>{item.status}</Text>
                                            </View>
                                            <Text className="text-[#1E293B] font-nunito-extrabold text-lg">{item.invoiceNo}</Text>
                                        </View>
                                        <Text className="text-[#1E293B] font-nunito-extrabold text-lg">{item.amount}</Text>
                                    </View>

                                    <View className="flex-row justify-between items-center pt-3 border-t border-gray-50">
                                        <View className="flex-row items-center">
                                            <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
                                            <Text className="text-gray-500 font-nunito-bold text-xs ml-1.5">{item.month} {item.date}</Text>
                                        </View>
                                        <TouchableOpacity className="flex-row items-center">
                                            <Text className="text-[#0061FF] font-nunito-bold text-xs mr-1">Receipt</Text>
                                            <Ionicons name="download-outline" size={14} color="#0061FF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}

                        {filteredPayments.length === 0 && (
                            <View className="items-center justify-center py-20">
                                <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center mb-4">
                                    <Ionicons name="receipt-outline" size={32} color="#CBD5E1" />
                                </View>
                                <Text className="text-gray-400 font-nunito-bold">No transactions found</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
