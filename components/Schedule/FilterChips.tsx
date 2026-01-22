import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface FilterChipsProps {
    tabs: string[];
    activeTab: string;
    onTabPress: (tab: string) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ tabs, activeTab, onTabPress }) => {
    return (
        <View className="mb-6 px-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => onTabPress(tab)}
                            className={`mr-3 px-6 py-2 rounded-full border ${activeTab === tab
                                    ? 'bg-[#0061FF] border-[#0061FF]'
                                    : 'bg-white/10 border-white/20'
                                }`}
                        >
                            <Text
                                className={`text-sm font-nunito-bold ${activeTab === tab ? 'text-white' : 'text-white/60'
                                    }`}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};
