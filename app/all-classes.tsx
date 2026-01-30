import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface ScheduleItem {
    id: string | number;
    title: string;
    duration: string;
    icon: string;
    color: string;
    iconColor: string;
    time?: string;
    label?: string;
}

const DAILY_SCHEDULE: ScheduleItem[] = [
    { id: 1, time: '08:00', title: 'Writing', duration: '08:00-08:30 AM', icon: 'pencil', color: '#E9F5E1', iconColor: '#84CC16' },
    { id: 2, time: '08:30', title: 'Math', duration: '08:30-09:00 AM', icon: 'calculator', color: '#FFE4E1', iconColor: '#F97316' },
    { id: 3, time: '10:00', title: 'Chemistry', duration: '10:00-10:30 AM', icon: 'flask', color: '#F3E5F5', iconColor: '#D946EF' },
    { id: 4, time: '12:00', title: 'History', duration: '12:00-12:45 PM', icon: 'book', color: '#E0F2F1', iconColor: '#009688' },
];

const WEEKLY_SCHEDULE: ScheduleItem[] = [
    { id: 'w1', label: 'Monday', title: 'Mathematics', duration: '3 Classes Today', icon: 'calculator', color: '#E0EEFF', iconColor: '#0061FF' },
    { id: 'w2', label: 'Tuesday', title: 'Science & Art', duration: '2 Classes Today', icon: 'brush', color: '#E9F5E1', iconColor: '#84CC16' },
    { id: 'w3', label: 'Wednesday', title: 'History', duration: '1 Class Today', icon: 'book', color: '#FDF2F8', iconColor: '#EC4899' },
    { id: 'w4', label: 'Thursday', title: 'Physics', duration: '2 Classes Today', icon: 'thunderstorm', color: '#FEF3C7', iconColor: '#F59E0B' },
    { id: 'w5', label: 'Friday', title: 'Linguistics', duration: '3 Classes Today', icon: 'language', color: '#F3E8FF', iconColor: '#A855F7' },
];

const MONTHLY_SCHEDULE: ScheduleItem[] = [
    { id: 'm1', label: '17 Nov', title: 'Final Exams Start', duration: 'All Subjects', icon: 'document-text', color: '#FFE4E6', iconColor: '#FB7185' },
    { id: 'm2', label: '18 Nov', title: 'Practical Math', duration: 'Lab Session', icon: 'flask', color: '#ECFDF5', iconColor: '#10B981' },
    { id: 'm3', label: '20 Nov', title: 'Group Discussion', duration: 'Arts & Culture', icon: 'people', color: '#EFF6FF', iconColor: '#3B82F6' },
    { id: 'm4', label: '22 Nov', title: 'History Workshop', duration: 'Museum Visit', icon: 'location', color: '#FFF7ED', iconColor: '#F97316' },
];

export default function AllClassesScreen() {
    const [selectedDate, setSelectedDate] = useState(0);
    const [viewMode, setViewMode] = useState('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showWeekPicker, setShowWeekPicker] = useState(false);

    const weekDates = useMemo(() => {
        const days = [];
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
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
    }, [currentDate]);

    const monthGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayIndex = firstDay.getDay();
        const grid = [];
        for (let i = 0; i < startDayIndex; i++) grid.push({ day: '', empty: true });
        for (let i = 1; i <= daysInMonth; i++) grid.push({ day: i.toString(), empty: false });
        return grid;
    }, [currentDate]);

    const currentMonthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const currentYear = currentDate.getFullYear().toString();

    const changeMonth = (monthIndex: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(monthIndex);
        newDate.setDate(1); // Set to 1st to avoid month overflow
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
        setSelectedDate(0); // Default to Monday of that week
        setShowWeekPicker(false);
    };

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const scheduleItems = useMemo((): ScheduleItem[] => {
        if (viewMode === 'month') return MONTHLY_SCHEDULE;
        if (viewMode === 'week') return WEEKLY_SCHEDULE;
        return DAILY_SCHEDULE;
    }, [viewMode]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.stickyHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Schedule</Text>
                <TouchableOpacity style={styles.iconButton} onPress={() => setShowMonthPicker(true)}>
                    <Ionicons name="calendar-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.modeSwitcherContainer}>
                    <View style={styles.modeSwitcher}>
                        {['Month', 'Week', 'Day'].map((mode) => {
                            const isActive = viewMode === mode.toLowerCase();
                            return (
                                <TouchableOpacity
                                    key={`mode-${mode}`}
                                    onPress={() => setViewMode(mode.toLowerCase())}
                                    style={[styles.modeButton, isActive && styles.modeButtonActive]}
                                >
                                    <Text style={[styles.modeText, isActive && styles.modeTextActive]}>{mode}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <View style={styles.titleSection}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.titleText}>
                                {viewMode === 'month' ? currentMonthName : viewMode === 'week' ? 'Weekly Schedule' : 'Today Class'}
                            </Text>
                        </View>
                        {viewMode === 'day' && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>4 Classes Today</Text>
                            </View>
                        )}
                    </View>

                    {viewMode === 'day' && (
                        <View style={styles.dayHighlight}>
                            <View style={styles.highlightCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.liveBadge}>
                                        <View style={styles.liveDot} />
                                        <Text style={styles.liveText}>Live in 2h</Text>
                                    </View>
                                    <Text style={styles.timeTag}>10:00 AM - 11:30 AM</Text>
                                </View>

                                <View style={styles.cardBody}>
                                    <View style={{ flex: 1, paddingRight: 16 }}>
                                        <Text style={styles.subjectTitle}>Creative Sketching</Text>
                                        <Text style={styles.batchInfo}>Batch: GDM (2/2) • Step 06/10</Text>

                                        <View style={styles.progressTrack}>
                                            <LinearGradient
                                                colors={['#0061FF', '#60A5FA']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={{ width: '60%', height: '100%', borderRadius: 100 }}
                                            />
                                        </View>

                                        <TouchableOpacity style={styles.joinButton}>
                                            <Ionicons name="play" size={14} color="white" />
                                            <Text style={styles.joinButtonText}>Join Class</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.illustrationWrap}>
                                        <Image
                                            source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/art-tools-5463728-4566373.png' }}
                                            style={styles.illustration}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {viewMode === 'month' && (
                        <View style={styles.calendarSection}>
                            <View style={styles.gridCard}>
                                <View style={styles.gridHeader}>
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                        <Text key={`header-${i}`} style={styles.gridDayHeader}>{d}</Text>
                                    ))}
                                </View>
                                <View style={styles.gridBody}>
                                    {monthGrid.map((item, i) => {
                                        const isToday = !item.empty && parseInt(item.day) === currentDate.getDate();
                                        return (
                                            <View key={`day-${i}`} style={styles.gridDayWrap}>
                                                {!item.empty ? (
                                                    <TouchableOpacity style={[styles.gridDay, isToday && styles.gridDayActive]}>
                                                        <Text style={[styles.gridDayText, isToday && styles.gridDayTextActive]}>{item.day}</Text>
                                                    </TouchableOpacity>
                                                ) : <View style={styles.gridDay} />}
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>
                    )}

                    {(viewMode === 'week' || viewMode === 'day') && (
                        <View style={styles.stripSection}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                                {weekDates.map((item, index) => (
                                    <TouchableOpacity
                                        key={`strip-${index}`}
                                        onPress={() => setSelectedDate(index)}
                                        style={styles.stripItem}
                                    >
                                        {selectedDate === index ? (
                                            <LinearGradient colors={['#0061FF', '#60A5FA']} style={styles.stripCardActive}>
                                                <Text style={styles.stripDayActive}>{item.day}</Text>
                                                <Text style={styles.stripDateActive}>{item.date}</Text>
                                                <View style={styles.stripDot} />
                                            </LinearGradient>
                                        ) : (
                                            <View style={styles.stripCard}>
                                                <Text style={styles.stripDay}>{item.day}</Text>
                                                <Text style={styles.stripDate}>{item.date}</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <View style={styles.timelineSection}>
                        <View style={styles.timelineHeader}>
                            <Text style={styles.timelineTitle}>Timeline</Text>
                        </View>

                        {scheduleItems.map((item, index) => {
                            const labelText = viewMode === 'day' ? item.time : item.label;
                            return (
                                <View key={`timeline-${index}`} style={styles.timelineRow}>
                                    <View style={styles.timelineLabelWrap}>
                                        <Text style={styles.timelineLabel}>{labelText}</Text>
                                    </View>
                                    <View style={styles.timelineCard}>
                                        <View style={[styles.timelineIconWrap, { backgroundColor: item.color }]}>
                                            <Ionicons name={item.icon as any} size={18} color={item.iconColor} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.timelineTextTitle}>{item.title}</Text>
                                            <Text style={styles.timelineTextDuration}>{item.duration}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.timelineArrow}>
                                            <Ionicons name="chevron-forward" size={14} color="#0061FF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>

            {showMonthPicker && (
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.overlayClose} onPress={() => setShowMonthPicker(false)} activeOpacity={1} />
                    <View style={styles.pickerCard}>
                        <View style={styles.pickerHeader}>
                            <Text style={styles.pickerTitle}>Select Month</Text>
                            <Text style={styles.pickerYear}>{currentYear}</Text>
                        </View>
                        <View style={styles.pickerGrid}>
                            {MONTHS.map((month, index) => {
                                const isCurrent = index === currentDate.getMonth();
                                return (
                                    <TouchableOpacity
                                        key={month}
                                        onPress={() => changeMonth(index)}
                                        style={[styles.monthButton, isCurrent && styles.monthButtonActive]}
                                    >
                                        <Text style={[styles.monthText, isCurrent && styles.monthTextActive]}>{month}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <TouchableOpacity onPress={() => setShowMonthPicker(false)} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {showWeekPicker && (
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.overlayClose} onPress={() => setShowWeekPicker(false)} activeOpacity={1} />
                    <View style={styles.pickerCard}>
                        <View style={styles.pickerHeader}>
                            <Text style={styles.pickerTitle}>Select Week</Text>
                            <Text style={styles.pickerYear}>{MONTHS[currentDate.getMonth()]}</Text>
                        </View>
                        <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
                            {getWeeksInMonth(currentDate).map((week, index) => {
                                const isSelected = currentDate.getTime() >= week.start.getTime() && currentDate.getTime() <= week.end.getTime();
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => changeWeek(week.start)}
                                        style={[
                                            styles.weekItem,
                                            isSelected && styles.weekItemActive
                                        ]}
                                    >
                                        <Text style={[styles.weekText, isSelected && styles.weekTextActive]}>
                                            {week.label}
                                        </Text>
                                        <Ionicons
                                            name={isSelected ? "radio-button-on" : "radio-button-off"}
                                            size={20}
                                            color={isSelected ? "#0061FF" : "#CBD5E1"}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <TouchableOpacity onPress={() => setShowWeekPicker(false)} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0061FF' },
    stickyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 48, paddingBottom: 20 },
    headerTitle: { fontSize: 20, fontFamily: 'Nunito_800ExtraBold', color: '#FFFFFF' },
    contentContainer: { flex: 1, backgroundColor: '#FFFFFF', borderTopLeftRadius: 40, borderTopRightRadius: 40, overflow: 'hidden' },
    modeSwitcherContainer: { paddingHorizontal: 24, paddingTop: 30, marginBottom: 10 },
    backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20 },
    modeSwitcher: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 100, padding: 4, alignSelf: 'center' },
    modeButton: { borderRadius: 100, paddingHorizontal: 20, paddingVertical: 8 },
    modeButtonActive: { backgroundColor: '#FFFFFF', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    modeText: { fontSize: 11, fontFamily: 'Nunito_700Bold', color: '#94A3B8' },
    modeTextActive: { color: '#0061FF' },
    iconButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    titleSection: { paddingHorizontal: 24, marginBottom: 24, marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    titleWrapper: { flexDirection: 'row', alignItems: 'center' },
    titleText: { fontSize: 20, fontFamily: 'Nunito_800ExtraBold', color: '#1E293B' },
    badge: { backgroundColor: '#EFF6FF', borderRadius: 100, paddingHorizontal: 12, paddingVertical: 4 },
    badgeText: { color: '#0061FF', fontFamily: 'Nunito_700Bold', fontSize: 10 },
    dayHighlight: { marginHorizontal: 24, marginBottom: 32 },
    highlightCard: { backgroundColor: '#FFFFFF', borderRadius: 32, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 15, padding: 20, borderWidth: 1, borderColor: '#F1F5F9' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    liveBadge: { backgroundColor: '#F0FDF4', borderRadius: 100, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 4 },
    liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22C55E', marginRight: 8 },
    liveText: { color: '#16A34A', fontFamily: 'Nunito_800ExtraBold', fontSize: 10, textTransform: 'uppercase' },
    timeTag: { color: '#94A3B8', fontFamily: 'Nunito_700Bold', fontSize: 10 },
    cardBody: { flexDirection: 'row', justifyContent: 'space-between' },
    subjectTitle: { fontSize: 20, fontFamily: 'Nunito_800ExtraBold', color: '#1E293B', marginBottom: 4 },
    batchInfo: { color: '#94A3B8', fontFamily: 'Nunito_700Bold', fontSize: 11, marginBottom: 16 },
    progressTrack: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 100, width: 128, marginBottom: 16 },
    joinButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0061FF', borderRadius: 12, alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8 },
    joinButtonText: { color: '#FFFFFF', fontFamily: 'Nunito_800ExtraBold', fontSize: 11, marginLeft: 8 },
    illustrationWrap: { width: 96, height: 96, alignItems: 'center', justifyContent: 'center' },
    illustration: { width: 96, height: 96 },
    calendarSection: { paddingHorizontal: 24, marginBottom: 32 },
    gridCard: { backgroundColor: '#FFFFFF', borderRadius: 32, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 15, padding: 24, borderWidth: 1, borderColor: '#F8FAFC' },
    gridHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, paddingHorizontal: 8 },
    gridDayHeader: { color: '#CBD5E1', fontFamily: 'Nunito_800ExtraBold', width: 32, textAlign: 'center', fontSize: 10 },
    gridBody: { flexDirection: 'row', flexWrap: 'wrap' },
    gridDayWrap: { width: '14.28%', alignItems: 'center', marginBottom: 16 },
    gridDay: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16 },
    gridDayActive: { backgroundColor: '#0061FF' },
    gridDayText: { fontFamily: 'Nunito_700Bold', fontSize: 12, color: '#1E293B' },
    gridDayTextActive: { color: '#FFFFFF' },
    stripSection: { marginBottom: 32 },
    stripItem: { marginRight: 16, alignItems: 'center' },
    stripCard: { width: 56, height: 80, borderRadius: 28, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F8FAFC', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    stripCardActive: { width: 56, height: 80, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#0061FF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
    stripDay: { color: '#CBD5E1', fontSize: 10, fontFamily: 'Nunito_700Bold', marginBottom: 4 },
    stripDayActive: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'Nunito_700Bold', marginBottom: 4 },
    stripDate: { color: '#1E293B', fontSize: 18, fontFamily: 'Nunito_800ExtraBold' },
    stripDateActive: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Nunito_800ExtraBold' },
    stripDot: { width: 6, height: 6, backgroundColor: '#FFFFFF', borderRadius: 3, marginTop: 6 },
    timelineSection: { paddingHorizontal: 24, marginBottom: 40 },
    timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    timelineTitle: { fontSize: 18, fontFamily: 'Nunito_800ExtraBold', color: '#1E293B' },
    timelineRow: { flexDirection: 'row', marginBottom: 24 },
    timelineLabelWrap: { width: 64, paddingTop: 8 },
    timelineLabel: { color: '#94A3B8', fontFamily: 'Nunito_700Bold', fontSize: 12 },
    timelineCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 24, flexDirection: 'row', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, padding: 16, borderWidth: 1, borderColor: '#F1F5F9' },
    timelineIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    timelineTextTitle: { color: '#1E293B', fontFamily: 'Nunito_800ExtraBold', fontSize: 14, marginBottom: 2 },
    timelineTextDuration: { color: '#94A3B8', fontFamily: 'Nunito_700Bold', fontSize: 10 },
    timelineArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' },
    overlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 50, justifyContent: 'center', alignItems: 'center' },
    overlayClose: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    pickerCard: { backgroundColor: '#FFFFFF', width: '85%', borderRadius: 40, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, padding: 24, zIndex: 60 },
    pickerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    pickerTitle: { fontSize: 18, fontFamily: 'Nunito_800ExtraBold', color: '#1E293B' },
    pickerYear: { color: '#0061FF', fontFamily: 'Nunito_800ExtraBold' },
    pickerGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    monthButton: { width: '31%', borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', paddingVertical: 12, marginBottom: 12 },
    monthButtonActive: { backgroundColor: '#0061FF' },
    monthText: { fontFamily: 'Nunito_700Bold', fontSize: 12, color: '#64748B' },
    monthTextActive: { color: '#FFFFFF' },
    cancelBtn: { marginTop: 16, alignSelf: 'center', paddingVertical: 8 },
    cancelText: { color: '#94A3B8', fontFamily: 'Nunito_700Bold', fontSize: 12 },
    weekItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, marginBottom: 8, borderRadius: 16, backgroundColor: '#F8FAFC' },
    weekItemActive: { backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#DBEAFE' },
    weekText: { fontFamily: 'Nunito_700Bold', fontSize: 14, color: '#64748B' },
    weekTextActive: { color: '#0061FF' }
});
