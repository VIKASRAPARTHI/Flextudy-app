import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

import { useRouter } from 'expo-router';

export default function CourseCard({ item }: CourseCardProps) {
    const router = useRouter();

    if (item.isAddButton) {
        return (
            <TouchableOpacity style={styles.addCard} activeOpacity={0.8}>
                <View style={styles.plusIconContainer}>
                    <Ionicons name="add" size={32} color="white" />
                </View>
                <Text style={styles.addText}>Add a new course</Text>
            </TouchableOpacity>
        );
    }

    const handlePress = () => {
        if (item.isOwned) {
            router.push(`/course-guide/${item.id}?owned=true` as any);
        } else {
            router.push(`/course-details/${item.id}` as any);
        }
    };

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={handlePress}
        >
            <View style={[styles.cardContent, { backgroundColor: item.bgColor }]}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>{item.stats}</Text>
                    <Text style={styles.detailText}>{item.module}</Text>
                    <Text style={styles.detailText}>{item.type}</Text>
                </View>

                {item.icon && (
                    <View style={styles.iconContainer}>
                        <Ionicons name={item.icon} size={48} color="rgba(0,0,0,0.15)" />
                    </View>
                )}

                {item.image && (
                    <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
                )}
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerTitle}>{item.description}</Text>
                <Text style={styles.footerDuration}>Duration: {item.duration}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        overflow: 'hidden',
    },
    addCard: {
        flex: 1,
        margin: 8,
        height: 200,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 18,
        backgroundColor: '#0061FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    addText: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
        color: '#475569',
    },
    cardContent: {
        padding: 16,
        borderRadius: 20,
        height: 160,
        position: 'relative',
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#1E293B',
        lineHeight: 22,
        width: '70%',
    },
    detailsContainer: {
        marginTop: 12,
    },
    detailText: {
        fontSize: 11,
        fontFamily: 'Nunito_600SemiBold',
        color: '#475569',
        marginBottom: 2,
        opacity: 0.8,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 12,
        right: 12,
    },
    cardImage: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        width: 60,
        height: 60,
        opacity: 0.9,
    },
    footer: {
        padding: 12,
    },
    footerTitle: {
        fontSize: 13,
        fontFamily: 'Nunito_700Bold',
        color: '#1E293B',
        marginBottom: 4,
    },
    footerDuration: {
        fontSize: 11,
        fontFamily: 'Nunito_500Medium',
        color: '#94A3B8',
    },
});
