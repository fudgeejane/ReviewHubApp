import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function SignOut() {
  useEffect(() => {
    // Automatically redirect to auth screen when this component mounts
    router.replace('/auth');
  }, []);

  return <View />;
} 