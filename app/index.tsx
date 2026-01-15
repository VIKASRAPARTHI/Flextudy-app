import { Redirect } from 'expo-router';

export default function Index() {
    // TODO: Check if user is onboarding or logged in
    // For now, redirect to onboarding
    return <Redirect href="/(auth)/onboarding" />;
}
