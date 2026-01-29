import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CourseDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [isFavorite, setIsFavorite] = useState(false);

    // Mock data based on the provided image
    const course = {
        title: 'Job Preparation Full Course',
        instructor: 'HM Zaman',
        rating: 4.9,
        reviews: 233,
        price: 50,
        description: 'Lorem ipsum dolor sit amet consectetur. Venenatis mi adipiscing morbi ullamcorper cras imperdiet adipiscing. Vitae cras risus sed nunc semper et. Elementum duis gravida mauris vitae placerat quis orci ultrices odio. Diam faucibus varius nec auctor blandit volutpat ornare maecenas. Massa iaculis vivamus diam habitant tellus proin augue. Magna dictum ultricies donec amet nam libero. Velit lectus vitae sed et. Sed volutpat aliquet at eget viverra ac pretium cras.',
        image: 'https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg' // Placeholder for the illustration
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Course Details</Text>
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={24}
                        color={isFavorite ? "#EF4444" : "#1E293B"}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: course.image }}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Info Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.title}>{course.title}</Text>

                    <View style={styles.metaRow}>
                        <Text style={styles.byText}>By </Text>
                        <Text style={styles.instructorText}>{course.instructor}</Text>
                        <View style={styles.spacer} />
                        <Text style={styles.priceLabel}>Price</Text>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color="#F59E0B" />
                            <Text style={styles.ratingText}>{course.rating}</Text>
                            <Text style={styles.reviewText}>({course.reviews} Reviews)</Text>
                        </View>
                        <Text style={styles.price}>${course.price}</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabBar}>
                    <View style={styles.activeTab}>
                        <Text style={styles.activeTabText}>Details</Text>
                        <View style={styles.activeIndicator} />
                    </View>
                    <View style={styles.inactiveTab}>
                        <Text style={styles.inactiveTabText}>Lessons</Text>
                    </View>
                    <View style={styles.inactiveTab}>
                        <Text style={styles.inactiveTabText}>Reviews</Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{course.description}</Text>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.courseGuideButton}
                    onPress={() => router.push(`/course-guide/${id}` as any)}
                >
                    <Text style={styles.courseGuideText}>Course Guide</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.enrollButton}>
                    <Text style={styles.enrollText}>Enroll Now</Text>
                </TouchableOpacity>
            </View>
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
        paddingBottom: 100,
    },
    imageContainer: {
        width: '100%',
        height: 280,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        marginHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        maxWidth: '90%',
    },
    heroImage: {
        width: '80%',
        height: '80%',
    },
    infoSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    title: {
        fontSize: 22,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#1E293B',
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    byText: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
        color: '#64748B',
    },
    instructorText: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
        color: '#0061FF',
    },
    spacer: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 12,
        fontFamily: 'Nunito_500Medium',
        color: '#64748B',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
        color: '#1E293B',
        marginLeft: 4,
    },
    reviewText: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
        color: '#64748B',
        marginLeft: 4,
    },
    price: {
        fontSize: 24,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#1E293B',
    },
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        marginBottom: 20,
    },
    activeTab: {
        paddingVertical: 12,
        marginRight: 24,
        position: 'relative',
    },
    activeTabText: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        color: '#1E293B',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#1E293B',
        borderRadius: 1,
    },
    inactiveTab: {
        paddingVertical: 12,
        marginRight: 24,
    },
    inactiveTabText: {
        fontSize: 16,
        fontFamily: 'Nunito_600SemiBold',
        color: '#94A3B8',
    },
    descriptionContainer: {
        paddingHorizontal: 24,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
        color: '#64748B',
        lineHeight: 24,
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
    courseGuideButton: {
        flex: 1,
        backgroundColor: '#0061FF',
        borderRadius: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        shadowColor: '#0061FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    courseGuideText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
    },
    enrollButton: {
        flex: 1,
        backgroundColor: '#94A3B8', // Grey as per image, or change to secondary color
        borderRadius: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    enrollText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
    },
});
