import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

interface FilterChipsProps {
    filters: { label: string; icon?: keyof typeof Ionicons.glyphMap }[];
}

export default function FilterChips({ filters }: FilterChipsProps) {
    return (
        <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
                {filters.map((filter, index) => (
                    <Pressable
                        key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                            borderRadius: 9999,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            marginRight: 12,
                            shadowColor: '#F9FAFB',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.05,
                            shadowRadius: 1,
                            elevation: 1,
                        }}
                    >
                        {filter.icon && (
                            <Ionicons name={filter.icon} size={16} color="#6B7280" style={{ marginRight: 6 }} />
                        )}
                        <Text className="text-gray-600 font-nunito-bold text-sm">{filter.label}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}
