
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { Dimensions, FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// Mock data matching the ID (in a real app, fetch by ID)
const SHORT_VIDEOS = [
    {
        id: '1',
        video: require('../../assets/videos/short1.mp4'),
        user: 'Seva_Tanya',
        description: 'The description of Gabriel (peace be upon him) #islam #quran',
        hashtag: '#The Great Quan',
    },
    {
        id: '2',
        video: require('../../assets/videos/short2.mp4'),
        user: 'Math_Wizard',
        description: 'Solving complex calculus problems in seconds! #math #calculus',
        hashtag: '#Math Tricks',
    },
    {
        id: '3',
        video: require('../../assets/videos/short1.mp4'), // Reuse for demo
        user: 'Science_Daily',
        description: 'Physics experiments that will blow your mind 🤯 #science #physics',
        hashtag: '#Science Fun',
    }
];

const VideoItem = ({ item, isVisible }: { item: typeof SHORT_VIDEOS[0], isVisible: boolean }) => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = React.useState(false);

    const player = useVideoPlayer(item.video, player => {
        player.loop = true;
    });

    React.useEffect(() => {
        if (isVisible) {
            player.play();
        } else {
            player.pause();
        }
    }, [isVisible, player]);

    return (
        <View style={{ width, height, backgroundColor: 'black' }}>
            <VideoView
                style={{ width, height, position: 'absolute' }}
                player={player}
                contentFit="cover"
                nativeControls={false}
            />

            <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'transparent', isExpanded ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.6)']}
                locations={[0, 0.4, 0.9]}
                style={{ position: 'absolute', width, height }}
                pointerEvents="none"
            />

            {/* Header: Back Button */}
            <View className="absolute top-12 left-5 z-20">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={32} color="white" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            {!isExpanded ? (
                <View className="absolute bottom-12 left-5 right-5 z-20">
                    <Text className="text-white font-nunito-regular text-base mb-2 shadow-sm" numberOfLines={2}>
                        {item.description}
                    </Text>
                    <TouchableOpacity
                        className="items-center mt-2"
                        onPress={() => setIsExpanded(true)}
                    >
                        <Ionicons name="chevron-up" size={32} color="white" />
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl h-[65%] rounded-t-[32px] p-6 z-30">
                    <TouchableOpacity
                        className="absolute right-6 top-6 z-40"
                        onPress={() => setIsExpanded(false)}
                    >
                        <View className="bg-white/10 w-8 h-8 rounded-full items-center justify-center">
                            <Ionicons name="close" size={20} color="white" />
                        </View>
                    </TouchableOpacity>

                    <ScrollView showsVerticalScrollIndicator={false} className="mt-2">
                        <Text className="text-white font-nunito-extrabold text-2xl mb-2 w-[90%]">@{item.user}</Text>
                        <Text className="text-[#A855F7] font-nunito-bold text-sm mb-4">{item.hashtag}</Text>

                        <Text className="text-gray-300 font-nunito-regular text-lg leading-7 mb-6">
                            {item.description}
                        </Text>

                        {/* Study Information Section */}
                        <View className="bg-white/10 rounded-2xl p-5 mb-6">
                            <View className="flex-row items-center mb-4">
                                <Ionicons name="book" size={20} color="#60A5FA" />
                                <Text className="text-white font-nunito-bold text-lg ml-3">Key Takeaways</Text>
                            </View>

                            <View className="gap-3">
                                {[1, 2, 3].map((i) => (
                                    <View key={i} className="flex-row">
                                        <View className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 mr-3" />
                                        <Text className="text-gray-300 font-nunito-medium flex-1">
                                            Important concept regarding this topic that students should memorize for exams.
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View className="bg-white/10 rounded-2xl p-5 mb-8">
                            <View className="flex-row items-center mb-4">
                                <Ionicons name="bulb" size={20} color="#FBBF24" />
                                <Text className="text-white font-nunito-bold text-lg ml-3">Quick Summary</Text>
                            </View>
                            <Text className="text-gray-300 font-nunito-medium leading-6">
                                This video explains the fundamental principles demonstrated in the visual. Focus on the core mechanics and the resulting output.
                            </Text>
                        </View>

                        <View className="h-10" />
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default function ShortPlayerScreen() {
    const { id } = useLocalSearchParams();
    const [activeVideoId, setActiveVideoId] = React.useState(id as string || '1');
    const [videoList, setVideoList] = React.useState(SHORT_VIDEOS);
    const [page, setPage] = React.useState(1);

    const loadMoreVideos = () => {
        const newVideos = SHORT_VIDEOS.map(video => ({
            ...video,
            id: `${video.id}_${page}`
        }));
        setVideoList(prev => [...prev, ...newVideos]);
        setPage(prev => prev + 1);
    };

    const renderItem = ({ item }: { item: typeof SHORT_VIDEOS[0] }) => (
        <VideoItem item={item} isVisible={item.id === activeVideoId} />
    );

    const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveVideoId(viewableItems[0].item.id);
        }
    }).current;

    const viewabilityConfig = React.useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    // Find initial index
    const initialIndex = SHORT_VIDEOS.findIndex(v => v.id == id);

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Stack.Screen options={{ headerShown: false, animation: 'fade' }} />

            <FlatList
                data={videoList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={loadMoreVideos}
                onEndReachedThreshold={0.5}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={height}
                snapToAlignment="start"
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                initialScrollIndex={initialIndex !== -1 ? initialIndex : 0}
                getItemLayout={(data, index) => (
                    { length: height, offset: height * index, index }
                )}
            />
        </View>
    );
}
