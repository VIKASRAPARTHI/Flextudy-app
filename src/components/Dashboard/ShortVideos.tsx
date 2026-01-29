import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const videos = [
    {
        id: 1,
        title: 'Math-1 Solution',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
        duration: '12:45'
    },
    {
        id: 2,
        title: 'Parts Of Speech',
        thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
        duration: '08:20'
    },
    {
        id: 3,
        title: 'Logarithm Sc',
        thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80',
        duration: '15:10'
    },
];

export default function ShortVideos() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Short Videos</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                {videos.map((video) => (
                    <TouchableOpacity key={video.id} style={styles.videoCard} activeOpacity={0.9}>
                        <View style={styles.thumbnailContainer}>
                            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.4)']}
                                style={StyleSheet.absoluteFill}
                            />
                            <View style={styles.durationBadge}>
                                <Text style={styles.durationText}>{video.duration}</Text>
                            </View>
                            <View style={styles.playOverlay}>
                                <View style={styles.playButton}>
                                    <Ionicons name="play" size={24} color="white" />
                                </View>
                            </View>
                        </View>
                        <Text style={styles.videoTitle} numberOfLines={1}>{video.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
    scroll: {
        marginHorizontal: -20,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    videoCard: {
        marginRight: 16,
        width: 160,
    },
    thumbnailContainer: {
        width: 160,
        height: 220,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#F1F5F9',
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    durationBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    durationText: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'Nunito_700Bold',
    },
    playOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255,255,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    videoTitle: {
        marginTop: 12,
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
        color: '#334155',
        paddingHorizontal: 4,
    },
});
