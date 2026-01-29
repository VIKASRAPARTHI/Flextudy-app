import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const GRID_DATA = [
    { day: 0, subjects: [{ name: 'Turkish', color: '#10B981' }, { name: 'Georp..', color: '#10B981' }, { name: 'Art', color: '#FF6600' }] },
    { day: 1, subjects: [{ name: 'History', color: '#10B981' }, { name: 'Math', color: '#F29393' }, { name: 'Chem..', color: '#0061FF' }] },
    { day: 2, subjects: [{ name: 'English', color: '#0061FF' }, { name: 'Biology', color: '#0061FF' }, { name: 'Math', color: '#0061FF' }, { name: 'Biology', color: '#0061FF' }] },
    { day: 3, subjects: [{ name: 'Chemi..', color: '#FF6600' }] },
    { day: 4, subjects: [{ name: 'Music', color: '#F29393' }, { name: 'Art', color: '#F29393' }] },
    { day: 5, subjects: [] },
    { day: 6, subjects: [] },
];

const TASKS = [
    { id: 1, subject: 'Math', icon: '🧮', description: 'Exercises 21—23, p.15', status: 'Assigned', statusColor: 'bg-[#FFF7ED]', textColor: 'text-[#FF6600]' },
    { id: 2, subject: 'Chemistry', icon: '🧪', description: 'Exercises 7—9, p. 42.', status: 'Assigned', statusColor: 'bg-[#FFF7ED]', textColor: 'text-[#FF6600]' },
    { id: 3, subject: 'History', icon: '🏛️', description: 'Read Chapter 4 and summarize key events...', status: 'Completed', statusColor: 'bg-[#ECFDF5]', textColor: 'text-[#10B981]', strike: true },
];

export default function HomeworkScreen() {
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

        // Find the first Monday of the month (or leading Monday from prev month)
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

    const getWeekDays = () => {
        const days = [];
        const startOfWeek = new Date(currentDate);
        // Set to Monday of the current week (assuming Monday start as per design)
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
            });
        }
        return days;
    };

    const weekDates = getWeekDays();
    const selectedDateStr = weekDates[selectedDateIndex]?.fullDateStr || '';

    return (
        <View className="flex-1 bg-[#F8FAFC]">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="px-6 pt-12 pb-4">
                <TouchableOpacity onPress={() => router.back()} className="mb-4">
                    <Ionicons name="chevron-back" size={28} color="#1E293B" />
                </TouchableOpacity>

                <View className="flex-row justify-between items-center">
                    <Text className="text-3xl font-nunito-extrabold text-[#1E293B]">Homework</Text>
                    <TouchableOpacity className="flex-row items-center bg-white px-4 py-2 rounded-full shadow-sm">
                        <Text className="text-[#0061FF] font-nunito-bold text-sm mr-2">Statistics</Text>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/732/732204.png' }}
                            className="w-5 h-5"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Date Selection */}
                <View className="px-6 mt-4 mb-2 flex-row justify-between items-center">
                    <Text className="text-xl font-nunito-extrabold text-[#1E293B]">{selectedDateStr}</Text>
                    <TouchableOpacity
                        onPress={() => setShowMonthPicker(true)}
                        className="w-10 h-10 bg-white rounded-xl items-center justify-center shadow-sm"
                    >
                        <Ionicons name="calendar-outline" size={20} color="#0061FF" />
                    </TouchableOpacity>
                </View>

                {/* Subject Grid */}
                <View className="bg-white mx-6 rounded-[40px] p-6 shadow-xl shadow-black/5 mt-4">
                    <View className="flex-row justify-between border-b border-gray-50 pb-4 mb-4">
                        {weekDates.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => setSelectedDateIndex(i)}
                                className="items-center w-[14%]"
                            >
                                <Text className={`font-nunito-bold text-[10px] mb-2 ${selectedDateIndex === i ? 'text-[#0061FF]' : 'text-[#64748B]'}`}>
                                    {item.day}
                                </Text>
                                <View className={`w-8 h-8 rounded-full items-center justify-center ${selectedDateIndex === i ? 'bg-[#1E293B]' : ''}`}>
                                    <Text className={`font-nunito-extrabold text-sm ${selectedDateIndex === i ? 'text-white' : 'text-[#1E293B]'}`}>
                                        {item.date}
                                    </Text>
                                </View>
                                {selectedDateIndex === i && <View className="absolute -bottom-1 w-[120%] h-40 bg-blue-50/30 rounded-full -z-10" />}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="flex-row justify-between">
                        {GRID_DATA.map((col, i) => (
                            <View key={i} className="w-[14%] items-center">
                                {col.subjects.map((sub, j) => (
                                    <View
                                        key={j}
                                        style={{ backgroundColor: sub.color, opacity: selectedDateIndex === i ? 1 : 0.6 }}
                                        className="w-full py-1.5 rounded-lg mb-2 items-center px-0.5"
                                    >
                                        <Text className="text-white font-nunito-bold text-[8px]" numberOfLines={1}>{sub.name}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Today's Tasks */}
                <View className="px-6 mt-8">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-xl font-nunito-bold text-[#1E293B]">Today's tasks</Text>
                        <TouchableOpacity className="w-10 h-10 bg-white shadow-sm rounded-2xl items-center justify-center">
                            <Ionicons name="options-outline" size={20} color="#1E293B" />
                        </TouchableOpacity>
                    </View>

                    {TASKS.map((task) => (
                        <TouchableOpacity key={task.id} className="bg-white rounded-[32px] p-5 mb-4 shadow-sm flex-row items-center border border-white">
                            <View className="w-12 h-12 bg-[#F8FAFC] rounded-2xl items-center justify-center mr-4">
                                <Text className="text-2xl">{task.icon}</Text>
                            </View>
                            <View className="flex-1">
                                <View className="flex-row justify-between items-center mb-1">
                                    <Text className={`text-lg font-nunito-bold text-[#1E293B] ${task.strike ? 'line-through opacity-50' : ''}`}>
                                        {task.subject}
                                    </Text>
                                    <View className={`${task.statusColor} px-3 py-1 rounded-full`}>
                                        <Text className={`${task.textColor} font-nunito-bold text-[10px] uppercase`}>{task.status}</Text>
                                    </View>
                                </View>
                                <Text className="text-[#64748B] font-nunito-medium text-xs leading-5" numberOfLines={1}>
                                    {task.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
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
