import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="role-selection" options={{ title: 'Select Role', headerBackTitle: 'Back' }} />
            <Stack.Screen name="login" options={{ title: 'Login', headerBackTitle: 'Back' }} />
        </Stack>
    );
}
