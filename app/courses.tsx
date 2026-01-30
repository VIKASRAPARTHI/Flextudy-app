import CourseCard, { CourseItem } from '@/components/Courses/CourseCard';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

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
    const [activeTab, setActiveTab] = useState('All Courses');

    const renderItem = useCallback(({ item }: { item: CourseItem }) => (
        <CourseCard item={item} />
    ), []);

    const data = useMemo(() => {
        return activeTab === 'All Courses' ? ALL_COURSES : MY_COURSES;
    }, [activeTab]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Sticky Header */}
            <View className="px-6 pt-12 pb-6 flex-row items-center justify-between bg-[#0061FF]">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center bg-white/20 rounded-full"
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-nunito-extrabold text-white">Courses</Text>
                <TouchableOpacity className="w-10 h-10 items-center justify-center bg-white/20 rounded-full">
                    <Ionicons name="search-outline" size={22} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                {/* Tab Selector */}
                <View className="px-6 pt-8 pb-4">
                    <View style={styles.tabBar}>
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <TouchableOpacity
                                    key={tab}
                                    style={[styles.tabItem, isActive && styles.activeTabItem]}
                                    onPress={() => setActiveTab(tab)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Courses List */}
                <FlatList
                    key={activeTab} // Using key to force clean remount which often avoids context state issues
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0061FF',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: 'hidden',
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        padding: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 16,
        alignItems: 'center',
    },
    activeTabItem: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
        color: '#94A3B8',
    },
    activeTabText: {
        color: '#0061FF',
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 40,
        paddingTop: 10,
    }
});
