import React, { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Web mock for MapView
export const MapComponent = forwardRef((props: any, ref) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Maps are not supported on web currently.</Text>
            <Text style={styles.subText}>Please view on a mobile device.</Text>
        </View>
    );
});

// Web mock for Marker (returns null or placeholder)
export const Marker = (props: any) => {
    return null;
};

export const PROVIDER_GOOGLE = 'google';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#64748B',
        marginBottom: 8,
    },
    subText: {
        fontSize: 14,
        color: '#94A3B8',
    }
});
