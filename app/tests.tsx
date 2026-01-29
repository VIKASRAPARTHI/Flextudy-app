import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const TEST_ITEMS = [
    {
        id: '1',
        time: '09:00',
        title: 'Mathematics',
        duration: '2 Hours',
        subject: 'Advanced Math',
        status: 'Upcoming',
        icon: 'calculator',
        color: '#E0F2FE',
        iconColor: '#0369A1'
    },
    {
        id: '2',
        time: '11:30',
        title: 'Physics Quiz 4',
        duration: '45 Mins',
        subject: 'Classical Mechanics',
        status: 'Upcoming',
        icon: 'flash',
        color: '#FEF3C7',
        iconColor: '#B45309'
    },
    {
        id: '3',
        time: '14:00',
        title: 'Chemistry Lab Test',
        duration: '1.5 Hours',
        subject: 'Organic Chemistry',
        status: 'Completed',
        score: '85/100',
        icon: 'flask',
        color: '#DCFCE7',
        iconColor: '#15803D'
    },
    {
        id: '4',
        time: '16:00',
        title: 'English Lit Essay',
        duration: '1 Hour',
        subject: 'Modern Humanities',
        status: 'Completed',
        score: '92/100',
        icon: 'book',
        color: '#F3E8FF',
        iconColor: '#7E22CE'
    },
];

export default function TestsScreen() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDateIndex, setSelectedDateIndex] = useState(new Date().getDay());
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showWeekPicker, setShowWeekPicker] = useState(false);

    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const changeMonth = (monthIndex: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(monthIndex);
        newDate.setDate(1); // Reset to 1st to avoid overflow
        setCurrentDate(newDate);
        setShowMonthPicker(false);
        setShowWeekPicker(true);
    };

    const getWeeksInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const weeks = [];

        const firstDay = new Date(year, month, 1);
        const day = firstDay.getDay();
        const diff = firstDay.getDate() - day + (day === 0 ? -6 : 1);
        let current = new Date(year, month, diff);

        const lastDay = new Date(year, month + 1, 0);

        while (current <= lastDay || current.getMonth() === month) {
            const weekStart = new Date(current);
            const weekEnd = new Date(current);
            weekEnd.setDate(current.getDate() + 6);

            weeks.push({
                start: weekStart,
                end: weekEnd,
                label: `${weekStart.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - ${weekEnd.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`
            });

            current.setDate(current.getDate() + 7);
            if (current > lastDay && current.getMonth() !== month) break;
        }
        return weeks;
    };

    const changeWeek = (weekStart: Date) => {
        setCurrentDate(weekStart);
        setSelectedDateIndex(0); // Default to Monday of that week
        setShowWeekPicker(false);
    };

    // Generate week days for the current week (Monday start)
    const getWeekDays = () => {
        const days = [];
        const startOfWeek = new Date(currentDate);
        const day = currentDate.getDay();
        const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);

        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            days.push({
                day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                date: d.getDate().toString(),
                fullDateStr: d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', weekday: 'short' }),
                isToday: d.toDateString() === new Date().toDateString()
            });
        }
        return days;
    };

    const weekDates = getWeekDays();
    const selectedDateStr = weekDates[selectedDateIndex]?.fullDateStr || '';

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Upcoming':
                return 'bg-blue-100 text-blue-700';
            case 'Completed':
                return 'bg-green-100 text-green-700';
            case 'In Progress':
                return 'bg-orange-100 text-orange-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <View className="flex-1 bg-[#F8FAFC]">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="px-6 pt-12 pb-4">
                <TouchableOpacity onPress={() => router.back()} className="mb-6 w-10 h-10 items-center justify-center bg-white rounded-full shadow-sm">
                    <Ionicons name="chevron-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <View className="flex-row justify-between items-center">
                    <Text className="text-3xl font-nunito-extrabold text-[#1E293B]">Tests & Exams</Text>
                    <TouchableOpacity
                        onPress={() => setShowMonthPicker(true)}
                        className="w-10 h-10 items-center justify-center bg-white rounded-full shadow-sm"
                    >
                        <Ionicons name="calendar-outline" size={22} color="#0061FF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Date Selection */}
            <View className="mt-4">
                <View className="px-6 flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-nunito-extrabold text-[#1E293B]">{selectedDateStr}</Text>
                    <TouchableOpacity className="flex-row items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                        <Text className="text-xs font-nunito-bold text-[#0061FF]">Today</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
                >
                    {weekDates.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedDateIndex(index)}
                            className="mr-3 items-center"
                        >
                            {selectedDateIndex === index ? (
                                <LinearGradient
                                    colors={['#0061FF', '#60A5FA']}
                                    className="w-14 h-[80px] rounded-[28px] items-center justify-center shadow-lg shadow-blue-500/30"
                                >
                                    <Text className="text-white/80 text-xs font-nunito-medium mb-1">{item.day}</Text>
                                    <Text className="text-white text-lg font-nunito-extrabold">{item.date}</Text>
                                    <View className="w-1.5 h-1.5 bg-white rounded-full mt-1" />
                                </LinearGradient>
                            ) : (
                                <View className="w-14 h-[80px] rounded-[28px] bg-white items-center justify-center border border-gray-100 shadow-sm">
                                    <Text className="text-gray-400 text-xs font-nunito-medium mb-1">{item.day}</Text>
                                    <Text className="text-[#1E293B] text-lg font-nunito-bold">{item.date}</Text>
                                    {item.isToday && <View className="w-1 h-1 bg-blue-400 rounded-full mt-1" />}
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Timeline Section - Only this part scrolls */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="px-6 mt-4 pb-10">
                    <View className="flex-row justify-between items-center mb-6">
                        <View>
                            <Text className="text-lg font-nunito-extrabold text-[#1E293B]">Test Timeline</Text>
                            <Text className="text-gray-400 font-nunito-medium text-xs">Based on selected date</Text>
                        </View>
                        <View className="flex-row space-x-2">
                            <View className="bg-blue-50 px-3 py-1 rounded-lg">
                                <Text className="text-[10px] font-nunito-bold text-blue-600">4 TESTS</Text>
                            </View>
                        </View>
                    </View>

                    {TEST_ITEMS.map((item, index) => (
                        <View key={item.id} className="flex-row mb-6">
                            {/* Time Vertical Column */}
                            <View className="w-16 items-center pt-2">
                                <Text className="text-[#1E293B] font-nunito-extrabold text-sm">{item.time}</Text>
                                <View className="w-px flex-1 bg-gray-200 my-2 relative">
                                    {index !== TEST_ITEMS.length - 1 && (
                                        <View className="absolute bottom-0 w-2 h-2 rounded-full bg-gray-200 -left-[3.5px]" />
                                    )}
                                </View>
                            </View>

                            {/* Test Card */}
                            <View className="flex-1 bg-white rounded-3xl p-5 shadow-sm border border-gray-50 relative overflow-hidden">
                                {item.status === 'Completed' && (
                                    <View className="absolute -right-12 -top-12 w-24 h-24 bg-green-50 rounded-full opacity-20" />
                                )}

                                <View className="flex-row items-center justify-between mb-3">
                                    <View style={{ backgroundColor: item.color }} className="w-12 h-12 rounded-2xl items-center justify-center">
                                        <Ionicons name={item.icon as any} size={24} color={item.iconColor} />
                                    </View>
                                    <View className={`px-3 py-1 rounded-full ${getStatusStyle(item.status)}`}>
                                        <Text className="text-[10px] font-nunito-bold uppercase tracking-wider">{item.status}</Text>
                                    </View>
                                </View>

                                <View className="mb-4">
                                    <Text className="text-lg font-nunito-extrabold text-[#1E293B] mb-1">{item.title}</Text>
                                    <View className="flex-row items-center">
                                        <Ionicons name="book-outline" size={14} color="#64748B" className="mr-1" />
                                        <Text className="text-gray-500 font-nunito-medium text-xs ml-1">{item.subject}</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center justify-between pt-4 border-t border-gray-50">
                                    <View className="flex-row items-center">
                                        <Ionicons name="time-outline" size={16} color="#94A3B8" />
                                        <Text className="text-gray-400 font-nunito-bold text-xs ml-1">{item.duration}</Text>
                                    </View>

                                    {item.status === 'Completed' ? (
                                        <View className="flex-row items-center">
                                            <Text className="text-gray-400 font-nunito-medium text-xs mr-2">Score:</Text>
                                            <Text className="text-green-600 font-nunito-extrabold text-sm">{item.score}</Text>
                                        </View>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => router.push({ pathname: "/test-details/[id]", params: { id: item.id } })}
                                            className="bg-[#1E293B] px-4 py-2 rounded-xl"
                                        >
                                            <Text className="text-white font-nunito-bold text-xs">Details</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))}

                    {/* End of Timeline indicator */}
                    <View className="flex-row items-center opacity-40">
                        <View className="w-16 items-center">
                            <Ionicons name="ellipse" size={8} color="#CBD5E1" />
                        </View>
                        <View className="flex-1 h-px bg-gray-200" />
                    </View>
                </View>
            </ScrollView>

            {/* Month Picker Modal */}
            {showMonthPicker && (
                <TouchableOpacity
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center' }}
                    activeOpacity={1}
                    onPress={() => setShowMonthPicker(false)}
                >
                    <View className="bg-white w-[80%] rounded-3xl p-6 shadow-2xl">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-nunito-bold text-[#1E293B]">Select Month</Text>
                            <Text className="text-sm font-nunito-bold text-blue-500">{currentDate.getFullYear()}</Text>
                        </View>
                        <View className="flex-row flex-wrap justify-between">
                            {MONTHS.map((month, index) => (
                                <TouchableOpacity
                                    key={month}
                                    onPress={() => changeMonth(index)}
                                    className={`w-[30%] py-3 mb-3 rounded-xl items-center justify-center ${index === currentDate.getMonth() ? 'bg-[#0061FF]' : 'bg-gray-50'}`}
                                >
                                    <Text className={`font-nunito-bold text-xs ${index === currentDate.getMonth() ? 'text-white' : 'text-gray-600'}`}>
                                        {month.slice(0, 3)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity onPress={() => setShowMonthPicker(false)} className="mt-2 items-center">
                            <Text className="text-[#94A3B8] font-nunito-medium text-sm">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )}

            {/* Week Picker Modal */}
            {showWeekPicker && (
                <TouchableOpacity
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center' }}
                    activeOpacity={1}
                    onPress={() => setShowWeekPicker(false)}
                >
                    <View className="bg-white w-[80%] rounded-3xl p-6 shadow-2xl">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-nunito-bold text-[#1E293B]">Select Week</Text>
                            <Text className="text-sm font-nunito-bold text-blue-500">{MONTHS[currentDate.getMonth()]}</Text>
                        </View>
                        <ScrollView className="max-h-64">
                            {getWeeksInMonth(currentDate).map((week, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => changeWeek(week.start)}
                                    className={`py-4 px-4 mb-2 rounded-2xl flex-row justify-between items-center ${currentDate.getTime() >= week.start.getTime() && currentDate.getTime() <= week.end.getTime() ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}
                                >
                                    <Text className={`font-nunito-bold text-sm ${currentDate.getTime() >= week.start.getTime() && currentDate.getTime() <= week.end.getTime() ? 'text-[#0061FF]' : 'text-gray-600'}`}>
                                        {week.label}
                                    </Text>
                                    <Ionicons
                                        name={currentDate.getTime() >= week.start.getTime() && currentDate.getTime() <= week.end.getTime() ? "radio-button-on" : "radio-button-off"}
                                        size={20}
                                        color={currentDate.getTime() >= week.start.getTime() && currentDate.getTime() <= week.end.getTime() ? "#0061FF" : "#CBD5E1"}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={() => setShowWeekPicker(false)} className="mt-4 items-center">
                            <Text className="text-gray-400 font-nunito-medium text-sm">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}
