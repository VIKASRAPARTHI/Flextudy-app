import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const GRADE_TUTORS = [
    {
        id: '1',
        name: 'Harshini',
        subject: 'Maths',
        qualification: 'Scholar from NIT Jalandhar',
        grades: 'XI, XII',
        rating: 4.8,
        image: 'https://i.pravatar.cc/150?img=32',
        bg: '#F3E8FF',
        format: 'Remote'
    },
    {
        id: '2',
        name: 'Ravi Varman',
        subject: 'Physics',
        qualification: 'Scholar from Cambridge Uni',
        grades: 'NEET',
        rating: 4.9,
        image: 'https://i.pravatar.cc/150?img=11',
        bg: '#E0F2FE',
        format: 'In-person'
    },
    {
        id: '3',
        name: 'Priya Dharsini',
        subject: 'Biology',
        qualification: 'Tutor from Victoria Uni',
        grades: 'XII',
        rating: 4.7,
        image: 'https://i.pravatar.cc/150?img=40',
        bg: '#FFEDD5',
        format: 'Group'
    },
    {
        id: '4',
        name: 'Harish',
        subject: 'Chemistry',
        qualification: 'Graduate from IIT Kharagpur',
        grades: 'XI, XII',
        rating: 4.8,
        image: 'https://i.pravatar.cc/150?img=12',
        bg: '#DCFCE7',
        format: '1:1'
    },
    {
        id: '5',
        name: 'Geetha',
        subject: 'Commerce',
        qualification: 'Tutor from SRM University',
        grades: 'XI, XII',
        rating: 4.6,
        image: 'https://i.pravatar.cc/150?img=31',
        bg: '#FEE2E2',
        format: 'Remote'
    }
];

const SPECIAL_TUTORS = [
    {
        id: 's1',
        name: 'Rajkumar',
        subject: 'Pro maths prep for JEE',
        rating: 4.8,
        image: 'https://i.pravatar.cc/150?img=18',
        bg: '#E9D5FF',
        category: 'Math'
    },
    {
        id: 's2',
        name: 'Rajeshwari',
        subject: 'Physics for NEET',
        rating: 4.7,
        image: 'https://i.pravatar.cc/150?img=41',
        bg: '#DBEAFE',
        category: 'Science'
    }
];

export default function Tutors() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

    const filteredGradeTutors = useMemo(() => {
        return GRADE_TUTORS.filter(tutor => {
            const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSubject = !selectedSubject || tutor.subject.includes(selectedSubject);
            const matchesFormat = !selectedFormat || tutor.format === selectedFormat;
            return matchesSearch && matchesSubject && matchesFormat;
        });
    }, [searchQuery, selectedSubject, selectedFormat]);

    const filteredSpecialTutors = useMemo(() => {
        return SPECIAL_TUTORS.filter(tutor => {
            const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSubject = !selectedSubject || tutor.category === selectedSubject;
            return matchesSearch && matchesSubject;
        });
    }, [searchQuery, selectedSubject]);

    const resetFilters = () => {
        setSelectedSubject(null);
        setSelectedLevel(null);
        setSelectedFormat(null);
    };

    const renderChip = (label: string, isSelected: boolean, onSelect: () => void, key?: string | number) => (
        <TouchableOpacity
            key={key}
            onPress={onSelect}
            className={`px-5 py-2 rounded-full mr-2 mb-2 border ${isSelected ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}
        >
            <Text className={`text-sm font-nunito-bold ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>{label}</Text>
        </TouchableOpacity>
    );

    const renderGradeTutor = ({ item }: { item: typeof GRADE_TUTORS[0] }) => (
        <View className="flex-row items-center bg-white p-3 rounded-2xl mb-4 shadow-sm border border-gray-100">
            {/* Image Container */}
            <View style={{ backgroundColor: item.bg }} className="w-20 h-20 rounded-xl items-center justify-end overflow-hidden">
                <Image source={require('../../assets/images/teacher1.png')} className="w-16 h-16 rounded-lg mb-0" />
            </View>

            {/* Info */}
            <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-start">
                    <View>
                        <Text className="text-lg font-nunito-extrabold text-gray-900">{item.name}</Text>
                        <Text className="text-sm font-nunito-bold text-gray-500">{item.subject}</Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-sm font-nunito-bold text-gray-900">{item.grades}</Text>
                        <View className="flex-row items-center">
                            <Ionicons name="star" size={12} color="#FBBF24" />
                            <Text className="text-xs font-nunito-bold text-gray-400 ml-1">{item.rating}</Text>
                        </View>
                    </View>
                </View>
                <Text className="text-xs font-nunito-medium text-gray-400 mt-1 mb-2" numberOfLines={1}>{item.qualification}</Text>

                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={() => router.push(`/tutor/${item.id}`)}
                        className="flex-1 py-1.5 border border-gray-200 rounded-lg items-center"
                    >
                        <Text className="text-xs font-nunito-bold text-gray-600">View Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 py-1.5 bg-[#0095FF] rounded-lg items-center">
                        <Text className="text-xs font-nunito-bold text-white">Book now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            <LinearGradient
                colors={['#0061FF', '#F0F9FF', '#FFFFFF']}
                locations={[0, 0.3, 0.6]}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }}
            />

            <View className="flex-1 pt-12">
                {/* Header Section */}
                <View className="px-5 pb-6">
                    {/* Title Header */}
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-2xl font-nunito-extrabold text-white">Tutors</Text>
                        <TouchableOpacity className="p-2">
                            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar & Filter Button */}
                    <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-50">
                        <Ionicons name="search-outline" size={20} color="#9CA3AF" />
                        <TextInput
                            placeholder="Search tutors, subjects, topics"
                            className="flex-1 ml-2 font-nunito-bold text-gray-700 mt-1"
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <TouchableOpacity
                            onPress={() => setShowFilters(true)}
                            className="flex-row items-center bg-blue-50 px-4 py-1.5 rounded-full"
                        >
                            <Ionicons name="filter" size={16} color="#3B82F6" />
                            <Text className="ml-2 text-blue-600 font-nunito-bold text-sm">Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content Sheet */}
                <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
                    <ScrollView
                        className="flex-1"
                        contentContainerStyle={{ paddingBottom: 100, paddingTop: 30 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Grade Tutors Section */}
                        <View className="px-6">
                            <Text className="text-lg font-nunito-extrabold text-gray-900 mb-4">Top matches</Text>
                            {filteredGradeTutors.length > 0 ? (
                                filteredGradeTutors.map(tutor => (
                                    <View key={tutor.id}>
                                        {renderGradeTutor({ item: tutor })}
                                    </View>
                                ))
                            ) : (
                                <Text className="text-gray-400 font-nunito-medium text-center py-10">No tutors found matching your search/filters.</Text>
                            )}
                        </View>

                        {/* Special Tutors Section */}
                        {filteredSpecialTutors.length > 0 && (
                            <View className="pt-6">
                                <Text className="text-lg font-nunito-extrabold text-gray-900 px-6 mb-4">Special Tutors For JEE/NEET</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                                    {filteredSpecialTutors.map(tutor => (
                                        <View key={tutor.id} className="w-48 mr-4 bg-white rounded-3xl p-3 shadow-sm border border-gray-100">
                                            <View style={{ backgroundColor: tutor.bg }} className="h-28 rounded-2xl items-center justify-end overflow-hidden mb-3 relative">
                                                <View className="absolute w-20 h-20 bg-white/10 rounded-full top-[-10] right-[-10]" />
                                                <Image source={require('../../assets/images/teacher1.png')} className="w-24 h-24" />
                                            </View>
                                            <View className="flex-row justify-between items-center mb-1">
                                                <Text className="text-base font-nunito-extrabold text-gray-900">{tutor.name}</Text>
                                                <View className="flex-row items-center">
                                                    <Ionicons name="star" size={12} color="#FBBF24" />
                                                    <Text className="text-xs font-nunito-bold text-gray-400 ml-1">{tutor.rating}</Text>
                                                </View>
                                            </View>
                                            <Text className="text-xs font-nunito-medium text-gray-400 mb-4" numberOfLines={1}>{tutor.subject}</Text>
                                            <View className="flex-row gap-2">
                                                <TouchableOpacity
                                                    onPress={() => router.push(`/tutor/${tutor.id}`)}
                                                    className="flex-1 py-2 border border-gray-200 rounded-xl items-center"
                                                >
                                                    <Text className="text-[10px] font-nunito-bold text-gray-600">View Profile</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity className="flex-1 py-2 bg-[#0095FF] rounded-xl items-center">
                                                    <Text className="text-[10px] font-nunito-bold text-white">Book now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>

            {/* Filter Modal */}
            <Modal
                visible={showFilters}
                transparent
                animationType="slide"
                onRequestClose={() => setShowFilters(false)}
            >
                <View className="flex-1 justify-end bg-black/50">
                    <TouchableOpacity
                        className="flex-1"
                        activeOpacity={1}
                        onPress={() => setShowFilters(false)}
                    />
                    <View className="bg-white rounded-t-[40px] p-6 pb-10">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-xl font-nunito-extrabold text-gray-900">Filters</Text>
                            <TouchableOpacity onPress={() => setShowFilters(false)}>
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Subjects */}
                            <Text className="text-base font-nunito-bold text-gray-700 mb-3">Subjects</Text>
                            <View className="flex-row flex-wrap mb-4">
                                {['Math', 'Science', 'Languages', 'History'].map((tag, idx) =>
                                    renderChip(tag, selectedSubject === tag, () => setSelectedSubject(tag === selectedSubject ? null : tag), `subject-${idx}`)
                                )}
                            </View>

                            {/* Level */}
                            <Text className="text-base font-nunito-bold text-gray-700 mb-3">Level</Text>
                            <View className="flex-row flex-wrap mb-4">
                                {['K-5', 'Middle', 'High', 'College'].map((tag, idx) =>
                                    renderChip(tag, selectedLevel === tag, () => setSelectedLevel(tag === selectedLevel ? null : tag), `level-${idx}`)
                                )}
                            </View>

                            {/* Format */}
                            <Text className="text-base font-nunito-bold text-gray-700 mb-3">Format</Text>
                            <View className="flex-row flex-wrap mb-6">
                                {['Remote', 'In-person', 'Group', '1:1'].map((tag, idx) =>
                                    renderChip(tag, selectedFormat === tag, () => setSelectedFormat(tag === selectedFormat ? null : tag), `format-${idx}`)
                                )}
                            </View>

                            {/* Static Info */}
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-base font-nunito-bold text-gray-700">Rate</Text>
                                <Text className="text-gray-500 font-nunito-bold">$20 - $60/hr</Text>
                            </View>
                            <View className="flex-row justify-between items-center mb-8">
                                <Text className="text-base font-nunito-bold text-gray-700">Availability</Text>
                                <Text className="text-gray-500 font-nunito-bold">Weekdays • Evenings</Text>
                            </View>

                            {/* Buttons */}
                            <View className="flex-row gap-4">
                                <TouchableOpacity
                                    onPress={resetFilters}
                                    className="flex-1 py-4 bg-gray-100 rounded-2xl items-center"
                                >
                                    <Text className="text-blue-500 font-nunito-extraBold text-base">Reset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setShowFilters(false)}
                                    className="flex-[2] py-4 bg-[#0095FF] rounded-2xl items-center"
                                >
                                    <Text className="text-white font-nunito-extraBold text-base">Apply Filters</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
