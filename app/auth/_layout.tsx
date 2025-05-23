import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}>
      <Stack.Screen 
        name="index"
        options={{
          title: 'Welcome',
        }}
      />
      <Stack.Screen 
        name="signup"
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen 
        name="signin"
        options={{
          title: 'Sign In',
        }}
      />
    </Stack>
  );
} 