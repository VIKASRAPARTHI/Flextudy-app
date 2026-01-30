import { Stack } from 'expo-router';
import React from 'react';

export default function CheckoutLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="payment-method" />
            <Stack.Screen name="processing" options={{ gestureEnabled: false }} />
            <Stack.Screen name="result" options={{ gestureEnabled: false }} />
        </Stack>
    );
}
