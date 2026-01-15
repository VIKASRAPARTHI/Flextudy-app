import { Session, User } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthContextType = {
    session: Session | null;
    user: User | null;
    signInWithOtp: (email: string, shouldCreateUser?: boolean) => Promise<{ error: any }>;
    signUp: (email: string, password: string, data?: any) => Promise<{ data: any; error: any }>;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    verifyOtp: (email: string, token: string) => Promise<{ session: Session | null; error: any }>;
    updateProfile: (data: any) => Promise<{ error: any }>;
    signOut: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    signInWithOtp: async () => ({ error: null }),
    signUp: async () => ({ data: null, error: null }),
    signIn: async () => ({ error: null }),
    verifyOtp: async () => ({ session: null, error: null }),
    updateProfile: async () => ({ error: null }),
    signOut: async () => { },
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signInWithOtp = async (email: string, shouldCreateUser: boolean = true) => {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser,
            },
        });
        return { error };
    };

    const signUp = async (email: string, password: string, data: any = {}) => {
        const { data: response, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data,
            },
        });
        return { data: response, error };
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const verifyOtp = async (email: string, token: string) => {
        // Matches Supabase "Verify the OTP to create a session" doc
        const {
            data: { session },
            error,
        } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email',
        });
        return { session, error };
    };

    const updateProfile = async (data: any) => {
        if (!user) return { error: new Error('No user logged in') };

        const updates = {
            id: user.id,
            ...data,
            updated_at: new Date(),
        };

        const { error } = await supabase
            .from('profiles')
            .upsert(updates);

        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, signInWithOtp, signUp, signIn, verifyOtp, updateProfile, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
