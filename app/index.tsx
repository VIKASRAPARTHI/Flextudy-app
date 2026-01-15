import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(auth)/onboarding');
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white px-6 py-6 justify-between">
            <View className="items-center w-full flex-1 justify-center">
                <Image
                    source={require('../assets/images/logo1.png')}
                    className="w-32 h-32"
                    resizeMode="contain"
                />
                <Image
                    source={require('../assets/images/main_logo.png')}
                    className="w-96 h-32 -mt-14"
                    resizeMode="contain"
                />
            </View>
        </SafeAreaView>
    );
}
