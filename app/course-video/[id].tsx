import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LESSONS = [
    // Course Video mock data
    { id: 1, title: 'Introduction video', duration: '22:00 Mins', status: 'completed', active: true },
    { id: 2, title: 'Class Name', duration: '22:00 Mins', status: 'completed' },
    { id: 3, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
    { id: 4, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
    { id: 5, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
    { id: 6, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
    { id: 7, title: 'Class Name', duration: '22:00 Mins', status: 'locked' },
];

export default function CourseVideoScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Course Video</Text>
                <View style={{ width: 32 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Video Player */}
                <View style={styles.videoContainer}>
                    <Image
                        source={{ uri: 'https://img.freepik.com/free-photo/male-teacher-standing-front-blackboard_23-2148700620.jpg' }}
                        style={styles.thumbnail}
                        resizeMode="cover"
                    />

                    {/* Overlay Controls */}
                    <View style={styles.overlay}>
                        <View style={styles.playButton}>
                            <Ionicons name="play" size={32} color="white" style={{ marginLeft: 4 }} />
                        </View>

                        <View style={styles.progressBarContainer}>
                            <View style={styles.progressBar}>
                                <View style={styles.progressFill} />
                                <View style={styles.progressKnob} />
                            </View>
                            <View style={styles.timeRow}>
                                <View style={styles.timeLeftContainer}>
                                    <Text style={styles.timeText}>11:06/23:25</Text>
                                    <Ionicons name="volume-high" size={16} color="white" style={{ marginLeft: 8 }} />
                                </View>
                                <Ionicons name="scan" size={16} color="white" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Controls */}
                <View style={styles.controlsRow}>
                    <TouchableOpacity style={styles.downloadButton}>
                        <Ionicons name="download-outline" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButtonPrimary}>
                        <Ionicons name="chevron-back" size={16} color="white" />
                        <Text style={styles.navButtonTextPrimary}>Previous</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButtonSecondary}>
                        <Text style={styles.navButtonTextSecondary}>Next</Text>
                        <Ionicons name="chevron-forward" size={16} color="#475569" />
                    </TouchableOpacity>
                </View>

                {/* Playlist */}
                <View style={styles.lessonList}>
                    {LESSONS.map((lesson) => (
                        <View key={lesson.id} style={[styles.lessonCard, lesson.active && styles.activeLessonCard]}>
                            <View style={[styles.playIconContainer, lesson.active && styles.activePlayIcon]}>
                                <Ionicons name="play" size={20} color={lesson.active ? "white" : "#0061FF"} style={{ marginLeft: 2 }} />
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
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    scrollContent: {
        paddingBottom: 40,
    },
    videoContainer: {
        height: 220,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'black',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.8)',
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
    progressBar: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressFill: {
        width: '45%',
        height: '100%',
        backgroundColor: '#0061FF',
        borderRadius: 2,
    },
    progressKnob: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'white',
        marginLeft: -6,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Nunito_600SemiBold',
    },
    controlsRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 24,
        alignItems: 'center',
    },
    downloadButton: {
        width: 48,
        height: 44,
        backgroundColor: '#0061FF',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    navButtonPrimary: {
        flex: 1,
        height: 44,
        backgroundColor: '#0061FF',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    navButtonTextPrimary: {
        color: 'white',
        fontFamily: 'Nunito_700Bold',
        fontSize: 14,
        marginLeft: 6,
    },
    navButtonSecondary: {
        flex: 1,
        height: 44,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonTextSecondary: {
        color: '#475569',
        fontFamily: 'Nunito_700Bold',
        fontSize: 14,
        marginRight: 6,
    },
    lessonList: {
        paddingHorizontal: 20,
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
    activeLessonCard: {
        borderColor: '#E2E8F0',
        backgroundColor: '#F8FAFC',
    },
    playIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,97,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    activePlayIcon: {
        backgroundColor: '#0061FF',
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
});
