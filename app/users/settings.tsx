import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  // Mock user data - In a real app, this would come from your user context/state
  const userData = {
    name: "Joana Lee",
    email: "joanalee@email.com",
    phone: "09123456789",
    avatar: "https://via.placeholder.com/100",
    membershipPlan: "Free",
    membershipPrice: "₱999/month",
    lastLogin: "2024-03-20 15:30",
    twoFactorEnabled: true
  };

  const settingsSections = [
    {
      title: 'Profile',
      items: [
        {
          icon: 'user',
          label: 'Name',
          type: 'link',
          value: userData.name,
        },
        {
          icon: 'envelope',
          label: 'Email',
          type: 'link',
          value: userData.email,
        },
        {
          icon: 'phone',
          label: 'Phone',
          value: userData.phone,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          icon: 'language',
          label: 'Language',
          type: 'link',
          value: 'English',
        },
        {
          icon: 'moon',
          label: 'Dark Mode',
          type: 'switch',
          value: darkMode,
          onValueChange: setDarkMode,
        },
        {
          icon: 'bell',
          label: 'Push Notifications',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: 'envelope',
          label: 'Email Updates',
          type: 'switch',
          value: emailUpdates,
          onValueChange: setEmailUpdates,
        },
      ],
    },
    {
      title: 'Billing',
      items: [
        {
          icon: 'crown',
          label: 'Membership Plan',
          type: 'link',
          value: userData.membershipPlan,
        },
        {
          icon: 'dollar-sign',
          label: 'Current Price',
          type: 'link',
          value: userData.membershipPrice,
        },
        {
          icon: 'credit-card',
          label: 'Payment Methods',
          type: 'link',
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          icon: 'shield-alt',
          label: 'Two-Factor Authentication',
          type: 'switch',
          value: userData.twoFactorEnabled,
          onValueChange: () => {},
        },
        {
          icon: 'clock',
          label: 'Last Login',
          type: 'info',
          value: userData.lastLogin,
        },
        {
          icon: 'lock',
          label: 'Change Password',
          type: 'link',
        },
      ],
    },
  ];

  const renderItem = (item: any) => {
    const opacity = new Animated.Value(1);

    const onPressIn = () => {
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ opacity }}>
        <TouchableOpacity
          key={item.label}
          style={styles.settingItem}
          disabled={item.type === 'switch' || item.type === 'info'}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5
              name={item.icon}
              size={18}
              color="#007AFF"
              style={styles.icon}
            />
          </View>
          <Text style={styles.settingLabel}>{item.label}</Text>
          {item.type === 'switch' ? (
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: '#D1D1D6', true: '#4CAF50' }}
              thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
              ios_backgroundColor="#D1D1D6"
              style={styles.switch}
            />
          ) : (
            <View style={styles.linkContainer}>
              {item.value && (
                <Text style={styles.valueText}>{item.value}</Text>
              )}
              {item.type === 'link' && (
                <FontAwesome5 name="chevron-right" size={14} color="#8E8E93" />
              )}
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {settingsSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map(renderItem)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginVertical: 12,
    marginHorizontal: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  valueText: {
    fontSize: 15,
    color: '#6c757d',
    marginRight: 8,
    fontWeight: '500',
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
}); 