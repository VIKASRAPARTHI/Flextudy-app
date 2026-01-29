import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const courses = [
    {
        id: 1,
        title: 'Job Preparation Course',
        classes: '30+ Classes',
        module: 'Top course module',
        type: 'Live class + Video',
        price: '$50',
        duration: '6 Months',
        rating: 4.9,
        bgColor: '#EEF2FF',
        textColor: '#4338CA',
        icon: 'briefcase',
        iconColor: '#6366F1'
    },
    {
        id: 2,
        title: 'MS Power Point Masterclass',
        classes: '20+ Classes',
        module: 'Basic to Advance',
        type: 'Recorded Videos',
        price: '$30',
        duration: '3 Months',
        rating: 4.5,
        bgColor: '#FFFBEB',
        textColor: '#B45309',
        icon: 'desktop',
        iconColor: '#F59E0B'
    },
];

export default function CoursesList() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Recommended Courses</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
            >
                {courses.map((course) => (
                    <TouchableOpacity key={course.id} activeOpacity={0.9} style={[styles.courseCard, { backgroundColor: course.bgColor }]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.ratingBadge}>
                                <Ionicons name="star" size={12} color="#F59E0B" />
                                <Text style={styles.ratingText}>{course.rating}</Text>
                            </View>
                            <TouchableOpacity style={styles.favoriteButton}>
                                <Ionicons name="heart-outline" size={20} color={course.textColor} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardBody}>
                            <View style={styles.textColumn}>
                                <Text style={[styles.courseTitle, { color: course.textColor }]} numberOfLines={2}>{course.title}</Text>
                                <View style={styles.metaRow}>
                                    <Ionicons name="videocam" size={14} color={course.textColor} style={{ opacity: 0.6 }} />
                                    <Text style={[styles.detailText, { color: course.textColor }]}>{course.classes}</Text>
                                </View>
                                <View style={styles.metaRow}>
                                    <Ionicons name="layers" size={14} color={course.textColor} style={{ opacity: 0.6 }} />
                                    <Text style={[styles.detailText, { color: course.textColor }]}>{course.module}</Text>
                                </View>
                            </View>
                            <View style={styles.iconContainer}>
                                <Ionicons name={course.icon as any} size={48} color={course.iconColor} style={{ opacity: 0.2 }} />
                            </View>
                        </View>

                        <View style={styles.cardFooter}>
                            <View>
                                <Text style={styles.footerLabel}>Course Price</Text>
                                <Text style={styles.priceTag}>{course.price}</Text>
                            </View>
                            <View style={styles.durationBadge}>
                                <Ionicons name="time-outline" size={14} color="#64748B" />
                                <Text style={styles.footerDuration}>{course.duration}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#111827',
        letterSpacing: -0.5,
    },
    seeAll: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
        color: '#0061FF',
    },
    scroll: {
        marginHorizontal: -20,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    courseCard: {
        width: 300,
        borderRadius: 32,
        padding: 24,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        backdropFilter: 'blur(10px)',
    } as any,
    ratingText: {
        fontSize: 12,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#111827',
        marginLeft: 4,
    },
    favoriteButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    textColumn: {
        flex: 1,
    },
    courseTitle: {
        fontSize: 20,
        fontFamily: 'Nunito_800ExtraBold',
        marginBottom: 12,
        lineHeight: 26,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    detailText: {
        fontSize: 13,
        fontFamily: 'Nunito_600SemiBold',
        marginLeft: 8,
    },
    iconContainer: {
        marginLeft: 12,
        marginTop: 4,
    },
    cardFooter: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginHorizontal: -24,
        marginBottom: -24,
        borderRadius: 24,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(20px)',
    } as any,
    footerLabel: {
        fontSize: 11,
        fontFamily: 'Nunito_700Bold',
        color: '#64748B',
        marginBottom: 2,
    },
    priceTag: {
        fontSize: 22,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#111827',
    },
    durationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 14,
    },
    footerDuration: {
        fontSize: 12,
        fontFamily: 'Nunito_700Bold',
        color: '#475569',
        marginLeft: 6,
    }
});
