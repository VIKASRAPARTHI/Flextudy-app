import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const courses = [
    {
        id: 1,
        title: 'Job Preparation Masterclass',
        classes: '30+ Live Sessions',
        module: 'Advanced Curriculum',
        price: '₹4,999',
        duration: '6 Months',
        rating: 4.9,
        bg: 'bg-white',
        accentColor: '#6366F1',
        icon: 'briefcase',
        tag: 'HOT'
    },
    {
        id: 2,
        title: 'MS Power Point Masterclass',
        classes: '20+ Modules',
        module: 'Beginner to Expert',
        price: '₹2,499',
        duration: '3 Months',
        rating: 4.7,
        bg: 'bg-white',
        accentColor: '#F59E0B',
        icon: 'desktop',
        tag: 'POPULAR'
    },
];

export default function CoursesList() {
    const router = useRouter();

    return (
        <View className="mb-10">
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-xl font-nunito-extrabold text-[#1E293B]">Premium Courses</Text>
                <TouchableOpacity onPress={() => router.push('/courses')}>
                    <Text className="text-sm font-nunito-bold text-[#0061FF]">Explore all</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="-mx-6"
                contentContainerStyle={{ paddingHorizontal: 24 }}
            >
                {courses.map((course) => (
                    <TouchableOpacity
                        key={course.id}
                        activeOpacity={0.9}
                        onPress={() => router.push(`/course-details/${course.id}`)}
                        className={`${course.bg} w-[300px] rounded-[40px] p-6 mr-5 relative overflow-hidden border border-gray-100 shadow-sm`}
                    >
                        {/* Status Tag */}
                        <View style={{ backgroundColor: course.accentColor }} className="absolute top-6 right-6 px-3 py-1 rounded-full shadow-sm">
                            <Text className="text-[10px] font-nunito-extrabold text-white">{course.tag}</Text>
                        </View>

                        <View className="flex-row items-center mb-6">
                            <View className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                <Ionicons name={course.icon as any} size={28} color={course.accentColor} />
                            </View>
                            <View className="ml-4">
                                <View className="flex-row items-center border border-orange-100 bg-orange-50 px-2 py-0.5 rounded-lg">
                                    <Ionicons name="star" size={14} color="#F59E0B" />
                                    <Text className="ml-1 text-[11px] font-nunito-extrabold text-orange-600">{course.rating}</Text>
                                </View>
                            </View>
                        </View>

                        <View className="mb-6">
                            <Text className="text-xl font-nunito-extrabold text-[#1E293B] mb-3" numberOfLines={2}>
                                {course.title}
                            </Text>

                            <View className="flex-row items-center mb-2">
                                <Ionicons name="videocam-outline" size={16} color="#94A3B8" />
                                <Text className="ml-2 text-xs font-nunito-semibold text-gray-500">{course.classes}</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="layers-outline" size={16} color="#94A3B8" />
                                <Text className="ml-2 text-xs font-nunito-semibold text-gray-500">{course.module}</Text>
                            </View>
                        </View>

                        <View className="bg-gray-50 -mx-6 -mb-6 p-6 flex-row justify-between items-center border-t border-gray-100">
                            <View>
                                <Text className="text-[10px] font-nunito-bold text-gray-400 uppercase tracking-tighter">Investment</Text>
                                <Text className="text-xl font-nunito-extrabold text-[#1E293B]">{course.price}</Text>
                            </View>
                            <View className="bg-white border border-gray-200 flex-row items-center px-3 py-2 rounded-xl">
                                <Text className="text-[11px] font-nunito-bold text-gray-600">{course.duration}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
