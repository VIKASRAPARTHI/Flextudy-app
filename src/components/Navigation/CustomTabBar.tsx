import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 70;
const CURVE_WIDTH = 100;
const CURVE_HEIGHT = 35;

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const renderTab = (route: any, index: number) => {
        const isFocused = state.index === index;

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        };

        let iconName: any = 'help-outline';

        if (route.name === 'index') {
            iconName = 'home';
        } else if (route.name === 'schedule') {
            iconName = isFocused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'tutors') {
            iconName = isFocused ? 'people' : 'people-outline';
        } else if (route.name === 'chat') {
            iconName = isFocused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
        } else if (route.name === 'profile') {
            iconName = isFocused ? 'person' : 'person-outline';
        }

        if (route.name === 'index') {
            return (
                <View key={route.key} style={styles.tabItemContainer}>
                    <Pressable
                        onPress={onPress}
                        style={styles.homeButton}
                    >
                        <Ionicons name={iconName} size={28} color="white" />
                    </Pressable>
                </View>
            );
        }

        return (
            <Pressable
                key={route.key}
                onPress={onPress}
                style={styles.tabItemContainer}
            >
                <Ionicons name={iconName} size={24} color={isFocused ? '#0061FF' : '#9CA3AF'} />
            </Pressable>
        );
    };

    const orderedRoutes = [
        state.routes.find(r => r.name === 'schedule'),
        state.routes.find(r => r.name === 'tutors'),
        state.routes.find(r => r.name === 'index'),
        state.routes.find(r => r.name === 'chat'),
        state.routes.find(r => r.name === 'profile'),
    ].filter(Boolean);

    // Adjusted path for a smoother curve matching the image
    const path = `
        M0,0 
        L${(width - CURVE_WIDTH) / 2},0 
        C${(width - CURVE_WIDTH) / 2 + CURVE_WIDTH * 0.1},0 
         ${(width - CURVE_WIDTH) / 2 + CURVE_WIDTH * 0.15},${CURVE_HEIGHT} 
         ${width / 2},${CURVE_HEIGHT} 
        C${(width + CURVE_WIDTH) / 2 - CURVE_WIDTH * 0.15},${CURVE_HEIGHT} 
         ${(width + CURVE_WIDTH) / 2 - CURVE_WIDTH * 0.1},0 
         ${(width + CURVE_WIDTH) / 2},0 
        L${width},0 
        L${width},${TAB_BAR_HEIGHT} 
        L0,${TAB_BAR_HEIGHT} 
        Z
    `;

    return (
        <View style={styles.container}>
            <View style={styles.svgContainer}>
                <Svg width={width} height={TAB_BAR_HEIGHT}>
                    <Path d={path} fill="white" />
                </Svg>
            </View>
            <View style={styles.tabItemsWrapper}>
                {orderedRoutes.map((route) => {
                    const originalIndex = state.routes.findIndex(r => r.name === route?.name);
                    return renderTab(route, originalIndex);
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent',
        width: '100%',
        height: TAB_BAR_HEIGHT + 45, // Extra space for the floating button
        justifyContent: 'flex-end',
    },
    svgContainer: {
        position: 'absolute',
        bottom: 0,
    },
    tabItemsWrapper: {
        flexDirection: 'row',
        height: TAB_BAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    tabItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    homeButton: {
        top: -37, // Float higher above the curve
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0061FF', // Primary blue
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0061FF',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
});
