import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const videos = [
    {
        id: 1,
        title: 'Math-1 Solution',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
        duration: '12:45',
        type: 'Education'
    },
    {
        id: 2,
        title: 'Parts Of Speech',
        thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
        duration: '08:20',
        type: 'Grammar'
    },
    {
        id: 3,
        title: 'Logarithm Sc',
        thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80',
        duration: '15:10',
        type: 'Maths'
    },
    {
        id: 4,
        title: 'Calculus Basics',
        thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&q=80',
        duration: '10:30',
        type: 'Maths'
    },
    {
        id: 5,
        title: 'Physics Laws',
        thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&q=80',
        duration: '14:20',
        type: 'Science'
    },
    {
        id: 6,
        title: 'Chemistry 101',
        thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&q=80',
        duration: '09:15',
        type: 'Science'
    }
];

export default function ShortsGridScreen() {
    const router = useRouter();

    const renderCard = (item: typeof videos[0]) => {
        return (
            <TouchableOpacity
                key={item.id}
                className="w-[48%] mb-4 relative rounded-3xl overflow-hidden h-72 bg-black shadow-sm"
                activeOpacity={0.9}
                onPress={() => router.push({ pathname: '/shorts/[id]', params: { id: item.id } })}
            >
                <Image
                    source={{ uri: item.thumbnail }}
                    className="w-full h-full absolute"
                    resizeMode="cover"
                />

                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    className="absolute bottom-0 left-0 right-0 h-32"
                />

                {/* Type Tag */}
                <View className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <Text className="text-[10px] font-nunito-bold text-white uppercase tracking-wider">{item.type}</Text>
                </View>

                {/* Play Button */}
                <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center">
                    <View className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 items-center justify-center">
                        <Ionicons name="play" size={20} color="white" />
                    </View>
                </View>

                {/* Content Info */}
                <View className="absolute bottom-4 left-4 right-4">
                    <Text className="text-white font-nunito-extrabold text-base leading-tight mb-2 shadow-sm" numberOfLines={2}>
                        {item.title}
                    </Text>
                    <View className="flex-row items-center bg-black/40 px-2 py-1 rounded-lg self-start">
                        <Text className="text-[10px] font-nunito-bold text-white">{item.duration}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-[#0061FF]">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="px-6 pt-12 pb-2">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center bg-white/20 rounded-full"
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-nunito-extrabold text-white ml-4">
                        Short Tutorials
                    </Text>
                </View>
            </View>

            {/* Content Area */}
            <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
                <ScrollView
                    className="flex-1 px-5 pt-6"
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-row flex-wrap justify-between">
                        {videos.map((item) => renderCard(item))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
