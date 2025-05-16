import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function InstructorLayout() {
  const insets = useSafeAreaInsets();

  const headerLogo = () => (
    <Image
      source={require('../../assets/images/ReviewHub.png')}
      style={styles.logoImage}
    />
  );

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        headerTitle: headerLogo,
        headerTitleAlign: 'left',
        headerRight: () => (
          <View style={styles.headerRightContainer}>
            <TouchableOpacity 
              onPress={() => router.push('/instructor/announcement')}
              style={styles.iconButton}
            >
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="bullhorn" size={18} color="#007AFF" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/instructor/notifications')}
              style={styles.iconButton}
            >
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="bell" size={18} color="#007AFF" />
              </View>
            </TouchableOpacity>
          </View>
        ),
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="th-list" size={20} color={color} />
          ),
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cog" size={20} color={color} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
      <Tabs.Screen
        name="signout"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/instructor/signout');
          },
        }}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="sign-out-alt" size={20} color={color} />
          ),
          tabBarLabel: 'Sign Out',
        }}
      />
      <Tabs.Screen
        name="announcement"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
