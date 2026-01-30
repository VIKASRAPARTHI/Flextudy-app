import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface CourseItem {
    id: string;
    title: string;
    description: string;
    stats: string;
    module: string;
    type: string;
    duration: string;
    bgColor: string;
    icon?: any;
    image?: any;
    isAddButton?: boolean;
    isOwned?: boolean;
}

interface CourseCardProps {
    item: CourseItem;
}

const CourseCard = ({ item }: CourseCardProps) => {
    if (item.isAddButton) {
        return (
            <TouchableOpacity
                style={styles.addCard}
                activeOpacity={0.8}
            >
                <View style={styles.addIconContainer}>
                    <Ionicons name="add" size={28} color="white" />
                </View>
                <Text style={styles.addText}>Add Course</Text>
            </TouchableOpacity>
        );
    }

    const handlePress = () => {
        if (item.isOwned) {
            router.push(`/course-guide/${item.id}?owned=true`);
        } else {
            router.push(`/course-details/${item.id}`);
        }
    };

    const accentColor = item.bgColor === '#FFF7ED' ? '#F59E0B' :
        item.bgColor === '#EFF6FF' ? '#0061FF' :
            item.bgColor === '#FEFCE8' ? '#EAB308' :
                item.bgColor === '#F0FDF4' ? '#10B981' : '#0061FF';

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={handlePress}
        >
            <View style={[styles.topSection, { backgroundColor: item.bgColor }]}>
                {item.isOwned && (
                    <View style={styles.ownedBadge}>
                        <Text style={styles.ownedText}>OWNED</Text>
                    </View>
                )}

                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statRow}>
                        <Ionicons name="videocam-outline" size={10} color="#475569" style={{ opacity: 0.6 }} />
                        <Text style={styles.statText}>{item.stats}</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Ionicons name="layers-outline" size={10} color="#475569" style={{ opacity: 0.6 }} />
                        <Text style={styles.statText} numberOfLines={1}>{item.module}</Text>
                    </View>
                </View>

                <View style={styles.floatingIcon}>
                    <Ionicons name={item.icon || 'book-outline'} size={32} color={accentColor} style={{ opacity: 0.15 }} />
                </View>
            </View>

            <View style={styles.bottomSection}>
                <Text style={styles.description} numberOfLines={1}>
                    {item.description}
                </Text>
                <View style={styles.durationRow}>
                    <Ionicons name="time-outline" size={10} color="#94A3B8" />
                    <Text style={styles.durationText}>{item.duration}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#F8FAFC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    topSection: {
        padding: 16,
        height: 130,
        position: 'relative',
    },
    ownedBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    ownedText: {
        fontSize: 9,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#0061FF',
    },
    title: {
        fontSize: 14,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#1E293B',
        lineHeight: 18,
        paddingRight: 8,
    },
    statsContainer: {
        marginTop: 8,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statText: {
        fontSize: 9,
        fontFamily: 'Nunito_600SemiBold',
        color: '#475569',
        marginLeft: 6,
    },
    floatingIcon: {
        position: 'absolute',
        bottom: 12,
        right: 12,
    },
    bottomSection: {
        padding: 12,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F8FAFC',
    },
    description: {
        fontSize: 11,
        fontFamily: 'Nunito_700Bold',
        color: '#1E293B',
        marginBottom: 6,
    },
    durationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        fontSize: 9,
        fontFamily: 'Nunito_500Medium',
        color: '#94A3B8',
        marginLeft: 4,
    },
    addCard: {
        flex: 1,
        margin: 8,
        height: 180,
        borderRadius: 28,
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: '#F1F5F9',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    addIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#0061FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    addText: {
        fontSize: 11,
        fontFamily: 'Nunito_700Bold',
        color: '#94A3B8',
        textAlign: 'center',
    },
});

export default React.memo(CourseCard);
