import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams } from 'expo-router';

export default function SetDetails() {
    const router = useRouter();
    const { email: initialEmail } = useLocalSearchParams<{ email: string }>(); // Get email from params
    const { updateProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: initialEmail || '',
        phone: '',
        address: '',
        gender: '',
        subject: '',
        dob: '',
    });

    // Handle submit
    const handleSubmit = async () => {
        if (!formData.phone || formData.phone.length < 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);
        const { error } = await updateProfile({
            phone: formData.phone,
            address: formData.address,
            gender: formData.gender,
            subject: formData.subject,
            dob: formData.dob,
            full_name: '', // We don't have a name field in form yet
        });
        setLoading(false);

        if (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        } else {
            Alert.alert('Success', 'Profile updated successfully!', [
                { text: 'OK', onPress: () => router.push('/(auth)/login') }
            ]);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
                {/* Header */}
                <View className="w-full flex-row items-center mb-8 mt-2">
                    <TouchableOpacity
                        className="bg-gray-50 p-2 rounded-lg"
                        onPress={() => router.back()}
                    >
                        <FontAwesome name="angle-left" size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text className="text-xl font-nunito-bold text-gray-900 ml-4">Set details</Text>
                </View>

                {/* Title */}
                <View className="items-center mb-10 mt-8">
                    <Text className="text-2xl font-nunito-extrabold text-gray-900 mb-2">Thanks for sign up!</Text>
                    <Text className="text-gray-500 font-nunito-medium text-base">Please set your full details</Text>
                </View>

                {/* Form */}
                <View className="w-full space-y-4">
                    {/* Email */}
                    <View className="mb-4">
                        <Text className="text-gray-500 font-nunito-medium mb-2">Email</Text>
                        <TextInput
                            className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-500 bg-gray-100" // Greyed out style
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            placeholder="Enter your email"
                            editable={!initialEmail} // Lock if came from verification
                        />
                    </View>

                    {/* Phone - NEW */}
                    <View className="mb-4">
                        <Text className="text-gray-500 font-nunito-medium mb-2">Phone Number</Text>
                        <View className="flex-row items-center w-full bg-gray-50 rounded-xl border border-gray-200">
                            <View className="p-4 bg-gray-100 rounded-l-xl border-r border-gray-200">
                                <Text className="font-nunito-bold text-gray-900 text-lg">+91</Text>
                            </View>
                            <TextInput
                                className="flex-1 p-4 font-nunito-bold text-gray-900 text-lg"
                                placeholder="9876543210"
                                placeholderTextColor="#9CA3AF"
                                value={formData.phone}
                                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                                keyboardType="number-pad"
                                maxLength={10}
                            />
                        </View>
                    </View>

                    {/* Address */}
                    <View className="mb-4">
                        <Text className="text-gray-500 font-nunito-medium mb-2">Address</Text>
                        <TextInput
                            className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-900"
                            value={formData.address}
                            onChangeText={(text) => setFormData({ ...formData, address: text })}
                            placeholder="Enter your address"
                        />
                    </View>

                    {/* Gender */}
                    <View className="mb-4">
                        <Text className="text-gray-500 font-nunito-medium mb-2">Gender</Text>
                        <TextInput
                            className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-900"
                            value={formData.gender}
                            onChangeText={(text) => setFormData({ ...formData, gender: text })}
                            placeholder="Select Gender"
                        />
                    </View>

                    {/* Expert Subject */}
                    <View className="mb-4">
                        <Text className="text-gray-500 font-nunito-medium mb-2">Expert subject/Class</Text>
                        <TextInput
                            className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-900"
                            value={formData.subject}
                            onChangeText={(text) => setFormData({ ...formData, subject: text })}
                            placeholder="Enter subjects"
                        />
                    </View>

                    {/* DOB */}
                    <View className="mb-8">
                        <Text className="text-gray-500 font-nunito-medium mb-2">Date Of Birth</Text>
                        <TextInput
                            className="w-full bg-gray-50 p-4 rounded-xl font-nunito-bold text-gray-900"
                            value={formData.dob}
                            onChangeText={(text) => setFormData({ ...formData, dob: text })}
                            placeholder="DD MMM YYYY"
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        className="w-full bg-primary py-4 rounded-xl items-center shadow-lg shadow-blue-200"
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text className="text-white font-nunito-semibold text-lg">
                            {loading ? 'Saving...' : 'Submit'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
