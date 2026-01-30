import { MapComponent as MapView, Marker, PROVIDER_GOOGLE } from '@/components/MapComponent';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type MapViewType from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// Standard Dark/Clean Map Style (Removed as per user request to show normal map)
const MAP_STYLE = [];

// Mock data with real coordinates (centered around a mock location)
// Base location: New York City (40.7128, -74.0060)
const INITIAL_REGION = {
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const NEARBY_TEACHERS = [
    {
        id: 1,
        name: 'Sarah Wilson',
        subject: 'Mathematics',
        rating: 4.9,
        reviews: 124,
        distance: '0.8 km',
        price: '$25/hr',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        coordinate: { latitude: 40.7150, longitude: -74.0080 }
    },
    {
        id: 2,
        name: 'Michael Chen',
        subject: 'Physics',
        rating: 4.8,
        reviews: 98,
        distance: '1.2 km',
        price: '$30/hr',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        coordinate: { latitude: 40.7080, longitude: -74.0020 }
    },
    {
        id: 3,
        name: 'Emily Davis',
        subject: 'English',
        rating: 5.0,
        reviews: 56,
        distance: '2.5 km',
        price: '$22/hr',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        coordinate: { latitude: 40.7200, longitude: -73.9990 }
    }
];

const FILTER_CHIPS = ['All Subjects', 'Math', 'Science', 'English', 'History'];

export default function NearbyTeachersScreen() {
    const router = useRouter();
    const mapRef = useRef<MapViewType>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<typeof NEARBY_TEACHERS[0] | null>(NEARBY_TEACHERS[0]);
    const [activeFilter, setActiveFilter] = useState('All Subjects');
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    Alert.alert('Permission Denied', 'Allow location access to find nearby teachers.');
                    setIsLoading(false);
                    return;
                }

                // Try to get last known position first for speed
                let lastKnownLocation = await Location.getLastKnownPositionAsync({});
                if (lastKnownLocation) {
                    setLocation(lastKnownLocation);
                    if (mapRef.current) {
                        mapRef.current.animateToRegion({
                            latitude: lastKnownLocation.coords.latitude,
                            longitude: lastKnownLocation.coords.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }, 500);
                    }
                }

                // Then get fresh current position
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                // Animate to user location
                if (mapRef.current && location) {
                    mapRef.current.animateToRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }, 1000);
                }
            } catch (error) {
                console.error("Error fetching location:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleMarkerPress = (teacher: typeof NEARBY_TEACHERS[0]) => {
        setSelectedTeacher(teacher);
        // Animate map to selected marker
        mapRef.current?.animateToRegion({
            latitude: teacher.coordinate.latitude,
            longitude: teacher.coordinate.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }, 500);
    };

    const getInitialRegion = () => {
        if (location) {
            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            };
        }
        return INITIAL_REGION;
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Nearby Teachers</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Map View */}
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_REGION}
                showsUserLocation={true}
                showsMyLocationButton={true}
                toolbarEnabled={false}
            >
                {NEARBY_TEACHERS.map((teacher) => (
                    <Marker
                        key={teacher.id}
                        coordinate={teacher.coordinate}
                        onPress={() => handleMarkerPress(teacher)}
                    >
                        <View style={[
                            styles.markerBubble,
                            selectedTeacher?.id === teacher.id && styles.activeMarkerBubble
                        ]}>
                            <Image source={{ uri: teacher.image }} style={styles.markerImage} />
                        </View>
                        <View style={styles.markerArrow} />
                    </Marker>
                ))}
            </MapView>

            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#4A90E2" />
                    <Text style={styles.loadingText}>Finding nearby teachers...</Text>
                </View>
            )}

            {/* Search and Filters */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#666" />
                    <TextInput
                        placeholder="Search for tutors..."
                        style={styles.searchInput}
                        placeholderTextColor="#999"
                    />
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                >
                    {FILTER_CHIPS.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterChip,
                                activeFilter === filter && styles.activeFilterChip
                            ]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[
                                styles.filterText,
                                activeFilter === filter && styles.activeFilterText
                            ]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Selected Teacher Card */}
            {selectedTeacher && (
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.cardContainer}
                // In a real app, navigate to tutor profile: onPress={() => router.push(`/tutor/${selectedTeacher.id}`)}
                >
                    <View style={styles.cardContent}>
                        <Image source={{ uri: selectedTeacher.image }} style={styles.cardImage} />
                        <View style={styles.cardInfo}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.teacherName}>{selectedTeacher.name}</Text>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={14} color="#FFD700" />
                                    <Text style={styles.ratingText}>{selectedTeacher.rating}</Text>
                                </View>
                            </View>
                            <Text style={styles.subjectText}>{selectedTeacher.subject} • {selectedTeacher.distance}</Text>
                            <View style={styles.cardFooter}>
                                <Text style={styles.priceText}>{selectedTeacher.price}</Text>
                                <TouchableOpacity style={styles.viewProfileButton}>
                                    <Text style={styles.viewProfileText}>View Profile</Text>
                                    <Ionicons name="arrow-forward" size={16} color="#4A90E2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerBubble: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#fff',
    },
    activeMarkerBubble: {
        borderColor: '#4A90E2',
        borderWidth: 2,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    markerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    markerArrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 0,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#fff', // Or #4A90E2 if active
        marginTop: -1,
        alignSelf: 'center',
    },
    searchContainer: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#000',
    },
    filterContainer: {
        paddingVertical: 4,
    },
    filterChip: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        alignSelf: 'flex-start',
    },
    activeFilterChip: {
        backgroundColor: '#4A90E2',
    },
    filterText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    activeFilterText: {
        color: '#fff',
    },
    cardContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    cardContent: {
        flexDirection: 'row',
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 16,
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    teacherName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#DAA520',
        marginLeft: 2,
    },
    subjectText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4A90E2',
    },
    viewProfileButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewProfileText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A90E2',
        marginRight: 4,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        backgroundColor: 'transparent',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});
