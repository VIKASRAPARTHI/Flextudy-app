import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'fade_from_bottom', contentStyle: { backgroundColor: 'white' } }}>
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="role-selection" />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="verification" />
            <Stack.Screen name="set-details" />
        </Stack>
    );
}
