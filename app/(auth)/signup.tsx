import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();

    const handleContinue = async () => {
        if (!formData.email || !formData.fullName || !formData.password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Simple email validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        if (formData.password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        // data: { full_name: ... } saves to user_metadata
        const { error } = await signUp(formData.email, formData.password, {
            full_name: formData.fullName
        });
        setLoading(false);

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            // Success -> Navigation to Verification (Fake bypass as requested, but conceptually correct flow)
            router.push({ pathname: '/(auth)/verification', params: { email: formData.email } });
        }
    };

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
                    <Text className="text-xl font-nunito-bold text-gray-900 ml-4">Sign Up</Text>
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

                    {/* Welcome Text */}
                    <View className="w-full mt-4">
                        <Text className="text-3xl font-nunito-bold text-gray-900 mb-2 text-center">Welcome!</Text>
                        <Text className="text-gray-500 font-nunito-medium text-base mb-8 text-center">Create a new account</Text>
                    </View>

                    {/* Form */}
                    <View className="w-full space-y-4">
                        {/* Full Name */}
                        <View className="mb-4">
                            <Text className="text-gray-500 font-nunito-medium mb-2">Full Name</Text>
                            <TextInput
                                className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-900"
                                value={formData.fullName}
                                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                                placeholder="Enter your full name"
                            />
                        </View>

                        {/* Email */}
                        <View className="mb-4">
                            <Text className="text-gray-500 font-nunito-medium mb-2">Email Address</Text>
                            <TextInput
                                className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-900"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password - NEW */}
                        <View className="mb-4">
                            <Text className="text-gray-500 font-nunito-medium mb-2">Password</Text>
                            <TextInput
                                className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-900"
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                                placeholder="Create a password"
                                secureTextEntry
                            />
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            className="w-full bg-primary py-4 rounded-xl items-center shadow-lg shadow-blue-200"
                            onPress={handleContinue}
                            disabled={loading}
                        >
                            <Text className="text-white font-nunito-semibold text-lg">
                                {loading ? 'Creating Account...' : 'Continue'}
                            </Text>
                        </TouchableOpacity>

                        {/* Footer Link */}
                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-500 font-nunito-medium">Already have an account? </Text>
                            <Link href="/(auth)/login" asChild>
                                <TouchableOpacity>
                                    <Text className="text-primary font-nunito-bold">Sign In</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
