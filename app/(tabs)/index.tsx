import StudentHome from '@/features/dashboard/StudentHome';
import TeacherHome from '@/features/dashboard/TeacherHome';
import { Stack } from 'expo-router';
import { useState } from 'react';

export default function TabIndex() {
  // TODO: Get real role from auth context
  // For demo, we default to student. 
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {role === 'student' ? <StudentHome /> : <TeacherHome />}
    </>
  );
}
