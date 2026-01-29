import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const teachers = [
    {
        id: 1,
        name: 'Shohag Hasan',
        subject: 'Mathematics',
        location: 'Uttara, Sector 06, Dhaka',
        rating: 5,
        students: '1.2k',
        image: 'https://i.pravatar.cc/150?img=11'
    },
    {
        id: 2,
        name: 'Hridoy Ahmed',
        subject: 'English',
        location: 'Gulshan 02, Dhaka',
        rating: 4.5,
        students: '850',
        image: 'https://i.pravatar.cc/150?img=12'
    },
];

export default function PopularTeachers() {
    const router = useRouter();

    const renderStars = (rating: number) => {
        return (
            <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.ratingText}>{rating}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Popular Teachers</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/tutors')}>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>

            {teachers.map((teacher) => (
                <View key={teacher.id} style={styles.card}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: teacher.image }} style={styles.avatar} />
                        <View style={styles.verifiedBadge}>
                            <Ionicons name="checkmark-circle" size={14} color="#0061FF" />
                        </View>
                    </View>

                    <View style={styles.info}>
                        <View style={styles.topRow}>
                            <Text style={styles.name} numberOfLines={1}>{teacher.name}</Text>
                            {renderStars(teacher.rating)}
                        </View>

                        <View style={styles.subjectRow}>
                            <Text style={styles.subjectText}>{teacher.subject}</Text>
                            <View style={styles.dot} />
                            <Text style={styles.studentText}>{teacher.students} Students</Text>
                        </View>

                        <View style={styles.locationRow}>
                            <Ionicons name="location" size={12} color="#9CA3AF" />
                            <Text style={styles.locationText} numberOfLines={1}>{teacher.location}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.hireButton} activeOpacity={0.8}>
                        <Text style={styles.hireText}>Hire</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
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
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#0061FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 18,
        backgroundColor: '#F8FAFC',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        flex: 1,
        marginLeft: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        color: '#1E293B',
        flex: 1,
        marginRight: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    ratingText: {
        fontSize: 12,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#D97706',
        marginLeft: 4,
    },
    subjectRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    subjectText: {
        fontSize: 13,
        fontFamily: 'Nunito_600SemiBold',
        color: '#475569',
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#94A3B8',
        marginHorizontal: 6,
    },
    studentText: {
        fontSize: 12,
        fontFamily: 'Nunito_500Medium',
        color: '#64748B',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 12,
        fontFamily: 'Nunito_500Medium',
        color: '#94A3B8',
        marginLeft: 4,
        maxWidth: 140,
    },
    hireButton: {
        backgroundColor: '#0061FF',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 14,
        marginLeft: 12,
        shadowColor: '#0061FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
    },
    hireText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },
});
