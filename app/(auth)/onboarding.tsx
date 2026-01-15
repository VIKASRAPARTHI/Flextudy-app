import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        image: require('../../assets/images/onboarding_1.jpg'),
        title: 'Find your best tutor here',
        subtitle: 'You can get your best tutor and tuition from this app. It will be the best way to find a perfect tutor in your area',
    },
    {
        id: '2',
        image: require('../../assets/images/onboarding_2.jpg'),
        title: 'Reach your goal easily',
        subtitle: 'With this app you can reach your main target with the help of special tutors and various new features',
    },
];

export default function Onboarding() {
    const router = useRouter();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        } else {
            router.push('/(auth)/role-selection');
        }
    };

    const handleSkip = () => {
        router.push('/(auth)/role-selection');
    };

    const onScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Skip Button */}
            <View className="flex-row justify-end p-4">
                <TouchableOpacity onPress={handleSkip}>
                    <Text className="text-gray-500 font-bold text-lg">Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Content Slider */}
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ width }} className="items-center justify-center flex-1 px-8">
                        <Image
                            source={item.image}
                            className="w-full h-96 mb-8"
                            resizeMode="contain"
                        />
                        <Text className="text-2xl font-bold text-center text-gray-900 mb-4">
                            {item.title}
                        </Text>
                        <Text className="text-gray-500 text-center text-base leading-6 px-4">
                            {item.subtitle}
                        </Text>
                    </View>
                )}
            />

            {/* Navigation Footer */}
            <View className="p-6 pb-12">
                <TouchableOpacity
                    className="bg-primary w-full py-4 rounded-xl items-center"
                    onPress={handleNext}
                >
                    <Text className="text-white font-bold text-lg">Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}