import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const services = [
    { id: 1, name: 'Hire Teacher', icon: 'school-outline', route: '/(tabs)/tutors' },
    { id: 2, name: 'Courses', icon: 'book-outline', route: '/courses' },
    { id: 3, name: 'Nearby', icon: 'location-outline', route: '/nearby-teachers' },
    { id: 4, name: 'Progress', icon: 'analytics-outline', route: '/progress' },
    { id: 5, name: 'Assignment', icon: 'clipboard-outline', route: '/assignments' },
    { id: 6, name: 'Payments', icon: 'wallet-outline', route: '/payments' },
    { id: 7, name: 'Attendance', icon: 'calendar-outline', route: '/attendance' },
    { id: 8, name: 'Classes', icon: 'grid-outline', route: '/all-classes' },
];

export default function ServicesGrid() {
    const router = useRouter();

    const handlePress = (route?: string) => {
        if (route) {
            router.push(route as any);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {services.map((service) => (
                    <TouchableOpacity
                        key={service.id}
                        style={styles.serviceItem}
                        activeOpacity={0.7}
                        onPress={() => handlePress(service.route)}
                    >
                        <View style={styles.iconContainer}>
                            <Ionicons name={service.icon as any} size={24} color="#0061FF" />
                        </View>
                        <Text style={styles.serviceName}>{service.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        marginTop: 5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: -4,
    },
    serviceItem: {
        width: '25%',
        paddingVertical: 10,
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    serviceName: {
        fontSize: 10.5,
        fontFamily: 'Nunito_600SemiBold',
        textAlign: 'center',
        color: '#475569',
        marginTop: 2,
    },
});
