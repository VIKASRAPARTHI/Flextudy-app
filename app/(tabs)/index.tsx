import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import CoursesList from '@/components/Dashboard/CoursesList';
import PopularTeachers from '@/components/Dashboard/PopularTeachers';
import ServicesGrid from '@/components/Dashboard/ServicesGrid';
import ShortVideos from '@/components/Dashboard/ShortVideos';

export default function Dashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const userName = user?.user_metadata?.full_name || 'Student';

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
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <View className="relative">
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                  className="w-14 h-14 rounded-full border-2 border-white/30"
                />
                <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#0061FF]" />
              </View>
              <View className="ml-4">
                <Text className="text-blue-100 font-nunito-bold text-sm">{greeting}</Text>
                <Text className="text-xl font-nunito-extrabold text-white">{userName}</Text>
              </View>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center border border-white/30 relative">
              <Ionicons name="notifications-outline" size={20} color="white" />
              <View className="absolute top-2.5 right-3 w-2 h-2 bg-red-400 rounded-full border border-white/20" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 py-2 mr-3 shadow-sm">
              <Ionicons name="search-outline" size={22} color="#9CA3AF" />
              <TextInput
                placeholder="Search for tutors, courses..."
                className="flex-1 ml-3 font-nunito-bold text-gray-900 text-base"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity className="bg-white/20 w-10 h-10 rounded-2xl items-center justify-center border border-white/30">
              <Ionicons name="options-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Sheet */}
        <View className="flex-1 bg-white rounded-t-[40px] overflow-hidden">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Main Content */}
            <View className="px-5">
              <ServicesGrid />
              <PopularTeachers />
              <ShortVideos />
              <CoursesList />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
