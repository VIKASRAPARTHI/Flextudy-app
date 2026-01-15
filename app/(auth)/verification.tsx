import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Verification() {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digits
    const [timer, setTimer] = useState(120); // 2 minutes
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const { verifyOtp, signInWithOtp } = useAuth();

    // Timer logic
    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (!email) {
            Alert.alert('Error', 'Email not found. Redirecting to signup.', [
                { text: 'OK', onPress: () => router.push('/(auth)/signup') }
            ]);
        }
    }, [email]);

    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify if full OTP is entered? 
        // Optional: validation check here
    };

    const handleBackspace = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        // User requested override: "just click on verify, it should go to the next page"
        // We will maintain the UI but bypassing the strict verification blocker for the flow testing
        // or effectively treating it as "Verification Done"

        /* 
        // Strict logic commented out for now based on request
        const otpString = otp.join('');
        if (otpString.length !== 6) {
           Alert.alert('Error', 'Please enter a valid 6-digit OTP code.');
           return;
        }
        if (!email) return;

        setLoading(true);
        // ... verifyOtp logic ...
        */

        // Direct navigation as requested
        router.push({ pathname: '/(auth)/set-details', params: { email } });
    };

    const handleResend = async () => {
        if (timer > 0) return;
        if (!email) return;

        setLoading(true);
        try {
            const { error } = await signInWithOtp(email);
            if (error) {
                Alert.alert('Error', 'Failed to resend code: ' + error.message);
            } else {
                setTimer(120);
                Alert.alert('Sent', 'A new verification code has been sent to your email.');
            }
        } catch (err: any) {
            Alert.alert('Error', 'An error occurred while resending OTP.');
        } finally {
            setLoading(false);
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-6 items-center">
                {/* Header */}
                <View className="w-full flex-row items-center mb-8 mt-4">
                    <TouchableOpacity
                        className="bg-gray-50 p-2 rounded-lg"
                        onPress={() => router.back()}
                    >
                        <FontAwesome name="angle-left" size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text className="text-xl font-nunito-bold text-gray-900 ml-4">Verification</Text>
                </View>

                {/* Illustration */}
                <View className="items-center justify-center w-full h-64 mb-8">
                    <Image
                        source={require('../../assets/images/verify_no.jpg')}
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                </View>

                {/* Title */}
                <Text className="text-2xl font-nunito-extrabold text-gray-900 mb-2">Verify Email</Text>
                <Text className="text-gray-500 font-nunito-medium text-center mb-8 px-8">
                    Please enter the 6-digit code sent to <Text className="font-nunito-bold text-gray-800">{email}</Text>
                </Text>

                {/* OTP Inputs */}
                <View className="flex-row justify-between w-full px-2 mb-8">
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => { inputRefs.current[index] = ref; }}
                            className={`w-12 h-14 bg-gray-50 rounded-xl text-center text-xl font-nunito-bold text-gray-900 border ${digit ? 'border-primary' : 'border-gray-200'}`}
                            maxLength={1}
                            keyboardType="number-pad"
                            value={digit}
                            onChangeText={(val) => handleOtpChange(val, index)}
                            onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                    className={`w-full py-4 rounded-xl items-center shadow-lg shadow-blue-200 mb-6 ${loading ? 'bg-blue-300' : 'bg-primary'}`}
                    onPress={handleVerify}
                    disabled={loading}
                >
                    <Text className="text-white font-nunito-semibold text-lg">
                        {loading ? 'Verifying...' : 'Verify'}
                    </Text>
                </TouchableOpacity>

                {/* Resend Timer */}
                <View className="flex-row items-center">
                    <Text className="text-gray-500 font-nunito-medium">Didn't receive the code? </Text>
                    <TouchableOpacity
                        onPress={handleResend}
                        disabled={timer > 0 || loading}
                    >
                        <Text className={`font-nunito-bold ${timer > 0 ? 'text-gray-400' : 'text-primary'}`}>
                            {timer > 0 ? `Resend in ${formatTime(timer)}` : 'Resend Code'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
