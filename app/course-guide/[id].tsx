import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LESSONS = [
    // Course Guide mock data
    { id: 1, title: 'Introduction video', duration: '22:00 Mins', status: 'completed' },
    { id: 2, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
    { id: 3, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
    { id: 4, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
    { id: 5, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
    { id: 6, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
];

export default function CourseGuideScreen() {
    const router = useRouter();
    const { id, owned } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState<'Study Plan' | 'Assignment'>('Study Plan');

    // Convert owned to boolean
    const isOwned = owned === 'true';

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Course Guide</Text>
                <View style={{ width: 32 }} />
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Study Plan' && styles.activeTab]}
                    onPress={() => setActiveTab('Study Plan')}
                >
                    <Text style={[styles.tabText, activeTab === 'Study Plan' && styles.activeTabText]}>
                        Study Plan
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Assignment' && styles.activeTab]}
                    onPress={() => setActiveTab('Assignment')}
                >
                    <Text style={[styles.tabText, activeTab === 'Assignment' && styles.activeTabText]}>
                        Assignment
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    isOwned && { paddingBottom: 40 } // Reduce padding if no footer
                ]}
            >
                {activeTab === 'Study Plan' ? (
                    <View style={styles.lessonList}>
                        {LESSONS.map((lesson) => (
                            <TouchableOpacity
                                key={lesson.id}
                                style={styles.lessonCard}
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (lesson.id === 1) {
                                        router.push(`/course-video/${id}` as any);
                                    }
                                }}
                            >
                                <View style={styles.playIconContainer}>
                                    <Ionicons name="play" size={20} color="white" style={{ marginLeft: 2 }} />
                                </View>

                                <View style={styles.lessonInfo}>
                                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                                </View>

                                <View style={styles.statusContainer}>
                                    {lesson.status === 'completed' ? (
                                        <View style={styles.checkIcon}>
                                            <Ionicons name="checkmark" size={12} color="white" />
                                        </View>
                                    ) : (
                                        <View style={styles.lockIcon}>
                                            <Ionicons name="lock-closed" size={14} color="#F59E0B" />
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>Assignments will appear here</Text>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Bar - Only show if NOT owned */}
            {!isOwned && (
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.bookmarkButton}>
                        <Ionicons name="bookmark-outline" size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.enrollButton}>
                        <Text style={styles.enrollText}>Enroll Now</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
        color: '#1E293B',
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 4,
        marginHorizontal: 20,
        marginBottom: 24,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#0061FF',
        shadowColor: '#0061FF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold',
        color: '#64748B',
    },
    activeTabText: {
        color: 'white',
        fontFamily: 'Nunito_700Bold',
    },
    scrollContent: {
        paddingBottom: 100,
        paddingHorizontal: 20,
    },
    lessonList: {
        gap: 12,
    },
    lessonCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 1,
    },
    playIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#0061FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        shadowColor: '#0061FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    lessonInfo: {
        flex: 1,
    },
    lessonTitle: {
        fontSize: 15,
        fontFamily: 'Nunito_700Bold',
        color: '#1E293B',
        marginBottom: 4,
    },
    lessonDuration: {
        fontSize: 12,
        fontFamily: 'Nunito_500Medium',
        color: '#94A3B8',
    },
    statusContainer: {
        marginLeft: 12,
    },
    checkIcon: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: '#22C55E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lockIcon: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: '#FEF3C7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderContainer: {
        padding: 40,
        alignItems: 'center',
    },
    placeholderText: {
        fontFamily: 'Nunito_500Medium',
        color: '#94A3B8',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 34,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    bookmarkButton: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    enrollButton: {
        flex: 1,
        backgroundColor: '#0061FF',
        borderRadius: 14,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0061FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    enrollText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
    },
});
