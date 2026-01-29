import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const DATES = [
    { day: 'Sun', date: '17', active: true },
    { day: 'Mon', date: '18', active: false },
    { day: 'Tue', date: '19', active: false },
    { day: 'Wed', date: '20', active: false },
    { day: 'Thu', date: '21', active: false },
    { day: 'Fri', date: '22', active: false },
    { day: 'Sat', date: '23', active: false },
];

const SCHEDULE_ITEMS = [
    { time: '8:00', title: 'Writing', duration: '8:00-8:30', icon: 'pencil', color: '#E9F5E1', iconColor: '#84CC16' },
    { time: '8:30', title: 'Math', duration: '8:30-9:00', icon: 'calculator', color: '#FFE4E1', iconColor: '#F97316' },
    { time: '10:00', title: 'Chemistry', duration: '10:00-10:30', icon: 'flask', color: '#F3E5F5', iconColor: '#D946EF' },
    { time: '12:00', title: 'History', duration: '12:00-12:45', icon: 'book', color: '#E0F2F1', iconColor: '#009688' },
];

export default function AllClassesScreen() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(0);
    const [viewMode, setViewMode] = useState('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showMonthPicker, setShowMonthPicker] = useState(false);

    // Generate week days for the current week
    const getWeekDays = () => {
        const days = [];
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Sunday as start

        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            days.push({
                day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                date: d.getDate().toString(),
                fullDate: d.toISOString().split('T')[0],
                active: d.getDate() === currentDate.getDate()
            });
        }
        return days;
    };

    const weekDates = getWeekDays();

    // Generate month days for grid
    const getMonthDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayIndex = firstDay.getDay(); // 0 = Sun

        const grid = [];
        // Previous month filler
        for (let i = 0; i < startDayIndex; i++) {
            grid.push({ day: '', empty: true });
        }
        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push({ day: i, empty: false });
        }
        return grid;
    };

    const monthGrid = getMonthDays();
    const currentMonthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const currentYear = currentDate.getFullYear();

    const changeMonth = (monthIndex: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(monthIndex);
        setCurrentDate(newDate);
        setShowMonthPicker(false);
    };

    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <View className="flex-1 bg-[#F8FAFC]">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="flex-row justify-between items-center px-6 pt-12 pb-4">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
                    <Ionicons name="chevron-back" size={28} color="#333" />
                </TouchableOpacity>
                <View className="flex-row bg-gray-100 rounded-full p-1">
                    {['Month', 'Week', 'Day'].map((mode) => {
                        const isActive = viewMode === mode.toLowerCase();
                        return (
                            <TouchableOpacity
                                key={mode}
                                onPress={() => setViewMode(mode.toLowerCase())}
                                style={isActive ? { backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 2 } : {}}
                                className={`px-4 py-1.5 rounded-full`}
                            >
                                <Text className={`text-xs font-nunito-bold ${isActive ? 'text-[#0061FF]' : 'text-gray-500'}`}>{mode}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* Title */}
                <View className="px-6 mb-4 mt-2 flex-row items-center">
                    <TouchableOpacity
                        disabled={viewMode !== 'month'}
                        onPress={() => setShowMonthPicker(true)}
                        className="flex-row items-center"
                    >
                        <Text className="text-xl font-nunito-extrabold text-[#1E293B]">
                            {viewMode === 'month' ? currentMonthName : viewMode === 'week' ? 'Weekly Schedule' : 'Today Class'}
                        </Text>
                        {viewMode === 'month' && (
                            <Ionicons name="chevron-down" size={18} color="#1E293B" style={{ marginLeft: 6 }} />
                        )}
                    </TouchableOpacity>
                </View>

                {viewMode === 'day' && (
                    <View className="mx-6 mb-8">
                        <View className="bg-white rounded-[30px] p-6 shadow-xl shadow-blue-900/5 relative overflow-hidden">
                            {/* Live Badge */}
                            <View className="flex-row items-center mb-2">
                                <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                                <Text className="text-gray-400 font-nunito-medium text-xs">Live on after 2 hours</Text>
                            </View>

                            {/* Title & Info */}
                            <View className="mb-6 relative z-10 w-[60%]">
                                <Text className="text-2xl font-nunito-extrabold text-[#1E293B] mb-1">Creative Sketching</Text>
                                <Text className="text-gray-500 font-nunito-medium text-sm mb-4">Batch: GDM (2/2)</Text>

                                {/* Progress */}
                                <Text className="text-xs text-gray-400 font-nunito-bold mb-2">Step 06/10</Text>
                                <View className="h-1.5 bg-gray-100 rounded-full w-full mb-6">
                                    <LinearGradient
                                        colors={['#0061FF', '#60A5FA']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ width: '60%', height: '100%', borderRadius: 100 }}
                                    />
                                </View>

                                {/* Play Button */}
                                <TouchableOpacity className="w-12 h-12 rounded-full bg-[#0061FF] items-center justify-center shadow-lg shadow-blue-500/30">
                                    <Ionicons name="play" size={20} color="white" style={{ marginLeft: 2 }} />
                                </TouchableOpacity>
                            </View>

                            {/* Illustration Image */}
                            <Image
                                source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/art-tools-5463728-4566373.png' }}
                                className="absolute -right-4 bottom-4 w-40 h-40"
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                )}

                {/* Calendar Views */}
                {viewMode === 'month' && (
                    <View className="px-6 mb-8">
                        <View className="bg-white rounded-3xl p-4 shadow-sm">
                            <View className="flex-row justify-between mb-4 px-2">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                    <Text key={i} className="text-gray-400 font-nunito-bold w-8 text-center">{d}</Text>
                                ))}
                            </View>
                            <View className="flex-row flex-wrap">
                                {/* Dynamic Month Grid */}
                                {monthGrid.map((item, i) => {
                                    const isSelected = !item.empty && item.day === currentDate.getDate();
                                    return (
                                        <View key={i} className="w-[14.28%] items-center mb-4">
                                            {!item.empty ? (
                                                <TouchableOpacity
                                                    className={`w-8 h-8 items-center justify-center rounded-full ${isSelected ? 'bg-[#0061FF]' : ''}`}
                                                >
                                                    <Text className={`font-nunito-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>{item.day}</Text>
                                                    {isSelected && <View className="w-1 h-1 bg-white rounded-full mt-0.5 absolute bottom-1" />}
                                                </TouchableOpacity>
                                            ) : <View className="w-8 h-8" />}
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                )}

                {(viewMode === 'week' || viewMode === 'day') && (
                    /* Calendar Strip - Only visible in Day/Week mostly, or just Day? User asked for "integrate months, weeks, days". usually week view IS the strip */
                    <View>
                        <View className="px-6 flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-nunito-bold text-[#1E293B]">Class Schedule</Text>
                            <TouchableOpacity
                                onPress={() => setShowMonthPicker(true)}
                                className="bg-white px-3 py-1.5 rounded-full flex-row items-center shadow-sm"
                            >
                                <Text className="text-xs font-nunito-bold text-gray-600 mr-1">{currentMonthName}</Text>
                                <Ionicons name="chevron-down" size={12} color="#666" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
                            className="mb-2"
                        >
                            {weekDates.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedDate(index)}
                                    className="mr-3 items-center"
                                >
                                    {selectedDate === index ? (
                                        <LinearGradient
                                            colors={['#0061FF', '#60A5FA']}
                                            className="w-14 h-[70px] rounded-[24px] items-center justify-center shadow-lg shadow-blue-500/30"
                                        >
                                            <Text className="text-white/80 text-xs font-nunito-medium mb-1">{item.day}</Text>
                                            <Text className="text-white text-lg font-nunito-extrabold">{item.date}</Text>
                                            <View className="mt-1 flex-row">
                                                <View className="w-1 h-1 bg-white rounded-full mx-0.5" />
                                                <View className="w-1 h-1 bg-white/50 rounded-full mx-0.5" />
                                            </View>
                                        </LinearGradient>
                                    ) : (
                                        <View className="w-14 h-[70px] rounded-[24px] bg-white items-center justify-center border border-gray-100 shadow-sm">
                                            <Text className="text-gray-400 text-xs font-nunito-medium mb-1">{item.day}</Text>
                                            <Text className="text-gray-800 text-lg font-nunito-bold">{item.date}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Timeline */}
                <View className="px-6 mb-10">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-lg font-nunito-bold text-[#1E293B]">Timeline</Text>
                        <TouchableOpacity className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm">
                            <Ionicons name="ellipsis-horizontal" size={16} color="#666" />
                        </TouchableOpacity>
                    </View>

                    {SCHEDULE_ITEMS.map((item, index) => (
                        <View key={index} className="flex-row mb-6">
                            <View className="w-16 pt-2">
                                <Text className="text-gray-500 font-nunito-medium">{item.time}</Text>
                            </View>
                            <View className="flex-1 bg-white rounded-2xl p-4 flex-row items-center shadow-sm border border-gray-50/50">
                                <View style={{ backgroundColor: item.color }} className="w-10 h-10 rounded-xl items-center justify-center mr-3">
                                    <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[#1E293B] font-nunito-bold text-base">{item.title}</Text>
                                    <Text className="text-gray-400 text-xs font-nunito-medium">{item.duration}</Text>
                                </View>
                                <TouchableOpacity>
                                    <Ionicons name="open-outline" size={18} color="#94A3B8" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {/* Placeholder for later times */}
                    <View className="flex-row mb-6 opacity-30">
                        <View className="w-16 pt-2">
                            <Text className="text-gray-500 font-nunito-medium">12:00</Text>
                        </View>
                        <View className="flex-1 border-b border-gray-200" />
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
                            <Text className="text-sm font-nunito-bold text-blue-500">{currentYear}</Text>
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
                            <Text className="text-gray-400 font-nunito-medium text-sm">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}
