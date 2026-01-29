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
    <View className="flex-1 bg-[#F8FAFC]">
      <LinearGradient
        colors={['#0061FF', '#60A5FA', '#F8FAFC']}
        locations={[0, 0.4, 0.8]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 400 }}
      />

      <View className="flex-1 pt-16">
        {/* Header Section */}
        <View className="px-6 pb-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <View className="relative">
                <View className="p-0.5 rounded-full border-2 border-white/50">
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                    className="w-12 h-12 rounded-full"
                  />
                </View>
                <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
              </View>
              <View className="ml-3">
                <Text className="text-white/80 font-nunito-bold text-xs">{greeting}</Text>
                <Text className="text-xl font-nunito-extrabold text-white tracking-tight">{userName}</Text>
              </View>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center border border-white/20 backdrop-blur-md">
              <Ionicons name="notifications-outline" size={20} color="white" />
              <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white/20" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center bg-white/10 rounded-xl px-4 py-2.5 mr-3 border border-white/20 backdrop-blur-xl">
              <Ionicons name="search-outline" size={18} color="white" />
              <TextInput
                placeholder="Search tutors, courses..."
                className="flex-1 ml-2 font-nunito-semibold text-white text-sm"
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
            <TouchableOpacity className="bg-white rounded-xl w-10 h-10 items-center justify-center shadow-lg shadow-blue-500/20">
              <Ionicons name="options-outline" size={18} color="#0061FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Sheet */}
        <View className="flex-1 bg-white rounded-t-[40px] shadow-2xl shadow-black/10 overflow-hidden">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 140, paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Main Content */}
            <View className="px-6">
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
