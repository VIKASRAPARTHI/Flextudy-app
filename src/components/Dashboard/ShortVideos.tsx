import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
];

export default function ShortVideos() {
    return (
        <View className="mb-8">
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-xl font-nunito-extrabold text-[#1E293B]">Short Tutorials</Text>
                <TouchableOpacity>
                    <Text className="text-sm font-nunito-bold text-[#0061FF]">View All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="-mx-6"
                contentContainerStyle={{ paddingHorizontal: 24 }}
            >
                {videos.map((video) => (
                    <TouchableOpacity key={video.id} className="mr-5 w-44" activeOpacity={0.9}>
                        <View className="w-44 h-64 rounded-[32px] overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                            <Image source={{ uri: video.thumbnail }} className="w-full h-full" />
                            <LinearGradient
                                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                                className="absolute bottom-0 left-0 right-0 h-32"
                            />

                            {/* Tags */}
                            <View className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                                <Text className="text-[10px] font-nunito-bold text-white uppercase tracking-wider">{video.type}</Text>
                            </View>

                            {/* Play Button */}
                            <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center">
                                <View className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 items-center justify-center">
                                    <Ionicons name="play" size={24} color="white" />
                                </View>
                            </View>

                            {/* Duration */}
                            <View className="absolute bottom-4 right-4 bg-black/40 px-2 py-1 rounded-lg">
                                <Text className="text-[10px] font-nunito-bold text-white">{video.duration}</Text>
                            </View>
                        </View>
                        <Text className="mt-3 text-sm font-nunito-bold text-[#334155] px-2" numberOfLines={1}>{video.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
