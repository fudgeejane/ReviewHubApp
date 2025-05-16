import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

export default function InstructorSettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  // Mock instructor data - In a real app, this would come from your user context/state
  const instructorData = {
    name: "Sammy Agasas",
    email: "sammytikol@gmail.com",
    phone: "09123456789",
    avatar: "https://via.placeholder.com/100",
    department: "Shopee Express",
    position: "Depende",
    lastLogin: "2024-03-20 15:30",
    twoFactorEnabled: true
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    value?: boolean,
    onToggle?: (value: boolean) => void,
    subtitle?: string
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.iconWrapper}>
          <FontAwesome5 name={icon} size={16} color="#007AFF" />
        </View>
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {onToggle && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#e0e0e0', true: '#007AFF' }}
          thumbColor={Platform.OS === 'ios' ? '#fff' : value ? '#fff' : '#f5f5f5'}
        />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.profileInfo}>
          {renderSettingItem('user', 'Name', undefined, undefined, instructorData.name)}
          {renderSettingItem('envelope', 'Email', undefined, undefined, instructorData.email)}
          {renderSettingItem('phone', 'Phone', undefined, undefined, instructorData.phone)}
          {renderSettingItem('building', 'Department', undefined, undefined, instructorData.department)}
          {renderSettingItem('user-tie', 'Position', undefined, undefined, instructorData.position)}
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.preferences}>
          {renderSettingItem('bell', 'Push Notifications', notifications, setNotifications)}
         
          {renderSettingItem('envelope', 'Email Updates', emailUpdates, setEmailUpdates)}
        </View>
      </View>

      {/* Security Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.security}>
          {renderSettingItem('lock', 'Change Password')}
          {renderSettingItem('shield-alt', 'Two-Factor Authentication', instructorData.twoFactorEnabled)}
          {renderSettingItem('history', 'Last Login', undefined, undefined, instructorData.lastLogin)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#161647',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#161647',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileInfo: {
    backgroundColor: '#fff',
  },
  preferences: {
    backgroundColor: '#fff',
  },
  security: {
    backgroundColor: '#fff',
  },
}); 