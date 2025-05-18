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
  type: 'faculty' | 'student' | 'system' | 'report' | 'security';
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
}

export default function AdminNotificationsScreen() {
  // Mock notifications data for admin
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected from IP 192.168.1.100',
      time: '10 minutes ago',
      type: 'security',
      priority: 'high',
      isRead: false,
    },
    {
      id: '2',
      title: 'New Faculty Registration',
      message: 'Dr. Sarah Johnson has submitted a faculty registration request.',
      time: '1 hour ago',
      type: 'faculty',
      priority: 'medium',
      isRead: false,
    },
    {
      id: '3',
      title: 'System Update Required',
      message: 'Critical security patch pending installation. Schedule maintenance.',
      time: '3 hours ago',
      type: 'system',
      priority: 'high',
      isRead: false,
    },
    {
      id: '4',
      title: 'Monthly Analytics Report',
      message: 'February 2024 student engagement report is ready for review.',
      time: '1 day ago',
      type: 'report',
      priority: 'medium',
      isRead: true,
    },
    {
      id: '5',
      title: 'Student Complaint',
      message: 'New complaint filed regarding online examination system.',
      time: '2 days ago',
      type: 'student',
      priority: 'high',
      isRead: true,
    },
  ];

  const getIconName = (type: string) => {
    switch (type) {
      case 'faculty':
        return 'chalkboard-teacher';
      case 'student':
        return 'user-graduate';
      case 'system':
        return 'server';
      case 'report':
        return 'chart-bar';
      case 'security':
        return 'shield-alt';
      default:
        return 'bell';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return styles.highPriority;
      case 'medium':
        return styles.mediumPriority;
      case 'low':
        return styles.lowPriority;
      default:
        return {};
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
        console.log('Admin notification pressed:', notification);
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
        <View style={styles.titleRow}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <View style={[styles.priorityBadge, getPriorityStyle(notification.priority)]}>
            <Text style={styles.priorityText}>{notification.priority}</Text>
          </View>
        </View>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Notifications</Text>
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
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: 21,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#161647',
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#161647',
    flex: 1,
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
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
  },
  highPriority: {
    backgroundColor: '#FF3B30',
  },
  mediumPriority: {
    backgroundColor: '#FF9500',
  },
  lowPriority: {
    backgroundColor: '#34C759',
  },
  facultyIcon: {
    backgroundColor: '#5856D6',
  },
  studentIcon: {
    backgroundColor: '#34C759',
  },
  systemIcon: {
    backgroundColor: '#007AFF',
  },
  reportIcon: {
    backgroundColor: '#5856D6',
  },
  securityIcon: {
    backgroundColor: '#FF3B30',
  },
}); 