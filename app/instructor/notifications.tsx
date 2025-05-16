import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'course' | 'student' | 'system';
  isRead: boolean;
}

export default function NotificationsScreen() {
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Student Enrolled',
      message: 'John Doe has enrolled in your CRIM 101 course.',
      time: '2 hours ago',
      type: 'student',
      isRead: false,
    },
    {
      id: '2',
      title: 'Course Update Required',
      message: 'Please update your course materials for CRIM 202.',
      time: '1 day ago',
      type: 'course',
      isRead: true,
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'The system will undergo maintenance on March 25, 2024.',
      time: '2 days ago',
      type: 'system',
      isRead: true,
    },
  ];

  const getIconName = (type: string) => {
    switch (type) {
      case 'course':
        return 'book';
      case 'student':
        return 'user-graduate';
      case 'system':
        return 'cog';
      default:
        return 'bell';
    }
  };

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationItem,
        !notification.isRead && styles.unreadNotification,
      ]}
      onPress={() => {
        // Handle notification press
        console.log('Notification pressed:', notification);
      }}
    >
      <View style={[styles.iconWrapper, styles[`${notification.type}Icon`]]}>
        <FontAwesome5
          name={getIconName(notification.type)}
          size={16}
          color="#fff"
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <ScrollView style={styles.notificationsList}>
        {notifications.map(renderNotification)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#161647',
    marginLeft: 16,
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  unreadNotification: {
    backgroundColor: '#f8f9ff',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#161647',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#8e8e93',
  },
  courseIcon: {
    backgroundColor: '#007AFF',
  },
  studentIcon: {
    backgroundColor: '#34C759',
  },
  systemIcon: {
    backgroundColor: '#FF9500',
  },
}); 