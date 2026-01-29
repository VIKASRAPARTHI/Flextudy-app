import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import CourseCard, { CourseItem } from '@/components/Courses/CourseCard';

const TABS = ['All Courses', 'My courses'];

const ALL_COURSES: CourseItem[] = [
    {
        id: '1',
        title: 'MS Power Point zero to advanced course 2022',
        description: 'MS Power Point course',
        stats: '30+ Classes',
        module: 'Top course module',
        type: 'Live class + Video',
        duration: '6 Months',
        bgColor: '#FFF7ED',
        icon: 'desktop-outline',
    },
    {
        id: '2',
        title: 'Job Preparation Full Course',
        description: 'Job Preparation course',
        stats: '30+ Classes',
        module: 'Top course module',
        type: 'Live class + Video',
        duration: '6 Months',
        bgColor: '#EFF6FF',
        icon: 'briefcase-outline',
    },
    {
        id: '3',
        title: 'MS Word complete beginner to advanced',
        description: 'MS Word complete course',
        stats: '30+ Classes',
        module: 'Top course module',
        type: 'Live class + Video',
        duration: '6 Months',
        bgColor: '#FEFCE8',
        icon: 'document-text-outline',
    },
    {
        id: '4',
        title: 'MS Excel complete course 2022',
        description: 'MS Excel complete course',
        stats: '30+ Classes',
        module: 'Top course module',
        type: 'Live class + Video',
        duration: '6 Months',
        bgColor: '#F0FDF4',
        icon: 'grid-outline',
    }
];

const MY_COURSES: CourseItem[] = [
    {
        id: 'add',
        title: '',
        description: '',
        stats: '',
        module: '',
        type: '',
        duration: '',
        bgColor: '',
        isAddButton: true
    },
    ...ALL_COURSES.slice(0, 2).map(item => ({ ...item, isOwned: true }))
];

export default function CoursesScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('All Courses');

    const renderItem = ({ item }: { item: CourseItem }) => (
        <CourseCard item={item} />
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={['#0061FF', '#F0F9FF', '#FFFFFF']}
                locations={[0, 0.3, 0.6]}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.safeArea}>
                <View style={[styles.content, { paddingTop: 48 }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Courses</Text>
                        <TouchableOpacity style={styles.searchButton}>
                            <Ionicons name="search-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Tab Selector */}
                    <View style={styles.tabContainer}>
                        {TABS.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.tab,
                                    activeTab === tab && styles.activeTab
                                ]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === tab && styles.activeTabText
                                ]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Grid */}
                    <View style={styles.sheet}>
                        <FlatList
                            data={activeTab === 'All Courses' ? ALL_COURSES : MY_COURSES}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: 'Nunito_800ExtraBold',
        color: 'white',
    },
    searchButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginHorizontal: 20,
        padding: 6,
        borderRadius: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 16,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
        color: 'white',
    },
    activeTabText: {
        color: '#0061FF',
    },
    sheet: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 40,
    },
});
