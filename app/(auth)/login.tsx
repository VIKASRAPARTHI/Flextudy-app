import { useAuth } from '@/context/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Simple email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setLoading(true);
        const { error } = await signIn(email, password);
        setLoading(false);

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            // Navigate to main app
            router.replace('/(tabs)');
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
                {/* Header */}
                <View className="flex-row items-center mb-8">
                    <TouchableOpacity
                        className="bg-gray-50 p-2 rounded-lg"
                        onPress={() => router.back()}
                    >
                        <FontAwesome name="angle-left" size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text className="text-xl font-nunito-bold text-gray-900 ml-4">Sign In</Text>
                </View>

                {/* Content */}
                <View className="flex-1 items-center">
                    {/* Logo */}
                    <View className="items-center mb-8">
                        <Image
                            source={require('../../assets/images/login_img.png')}
                            className="w-80 h-40"
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-3xl font-nunito-bold text-gray-900 mb-2">Welcome Back</Text>
                    <Text className="text-gray-500 font-nunito-medium mb-8">Sign in with your email and password</Text>

                    <View className="w-full space-y-4">
                        <View className="mb-4">
                            <Text className="text-gray-500 font-nunito-medium mb-2">Email Address</Text>
                            <TextInput
                                className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-900"
                                placeholder="Enter your email"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-gray-500 font-nunito-medium mb-2">Password</Text>
                            <TextInput
                                className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-900"
                                placeholder="Enter your password"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            className="flex-row justify-end mb-4"
                            onPress={() => router.push('/(auth)/forgot-password')} // Verify if this route exists, assuming standard
                        >
                            <Text className="text-primary font-nunito-bold">Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-full bg-primary py-4 rounded-xl items-center shadow-lg shadow-blue-200"
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text className="text-white text-center font-nunito-semibold text-lg">
                                {loading ? 'Logging in...' : 'Log In'}
                            </Text>
                        </TouchableOpacity>

                        {/* Footer Link */}
                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-500 font-nunito-medium">Don't have an account? </Text>
                            <Link href="/(auth)/signup" asChild>
                                <TouchableOpacity>
                                    <Text className="text-primary font-nunito-bold">Sign Up</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
