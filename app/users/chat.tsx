import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ChatMessage {
  id: string;
  userName: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  role: 'admin' | 'instructor' | 'user';
}

interface User {
  id: string;
  name: string;
  avatar: string | null;
  role: 'admin' | 'instructor' | 'user';
}

const dummyData: ChatMessage[] = [
  {
    id: '1',
    userName: 'John Doe',
    lastMessage: 'Hey, how are you doing?',
    time: '10:30 AM',
    unreadCount: 2,
    role: 'admin',
  },
  {
    id: '2',
    userName: 'Jane Smith',
    lastMessage: 'The meeting is scheduled for tomorrow',
    time: '9:45 AM',
    unreadCount: 0,
    role: 'instructor',
  },
  {
    id: '3',
    userName: 'Mike Johnson',
    lastMessage: 'Thanks for your help!',
    time: 'Yesterday',
    unreadCount: 1,
    role: 'user',
  },
];

const dummyUsers: User[] = [
  { id: '1', name: 'Clyde Padua', avatar: null, role: 'admin' },
  { id: '2', name: 'Warren Tabora', avatar: null, role: 'instructor' },
  { id: '3', name: 'Francine Mateo', avatar: null, role: 'user' },
  { id: '4', name: 'Blair Waldorf', avatar: null, role: 'user' },
  { id: '5', name: 'Seran van der Woodsen', avatar: null, role: 'user' },
  { id: '6', name: 'Nate Archibald', avatar: null, role: 'user' },
  { id: '7', name: 'Chuck Bass', avatar: null, role: 'user' },
];

const CreateMessageModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = dummyUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeColor = (role: 'admin' | 'instructor' | 'user') => {
    switch (role) {
      case 'admin':
        return '#FF4444';
      case 'instructor':
        return '#4CAF50';
      case 'user':
        return '#2196F3';
      default:
        return '#2196F3';
    }
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.userItem}>
      <View style={[styles.userAvatar, { backgroundColor: getRoleBadgeColor(item.role) }]}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        ) : (
          <MaterialIcons name="person" size={24} color="white" />
        )}
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <View style={[styles.roleBadge, { backgroundColor: getRoleBadgeColor(item.role) }]}>
          <Text style={styles.roleText}>
            {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New message</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <Text style={styles.toLabel}>To:</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <FlatList
            data={filteredUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            style={styles.userList}
          />
        </View>
      </View>
    </Modal>
  );
};

const ChatScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const getRoleBadgeColor = (role: 'admin' | 'instructor' | 'user') => {
    switch (role) {
      case 'admin':
        return '#FF4444';
      case 'instructor':
        return '#4CAF50';
      case 'user':
        return '#2196F3';
      default:
        return '#2196F3';
    }
  };

  const getAvatarIcon = (role: 'admin' | 'instructor' | 'user') => {
    switch (role) {
      case 'admin':
        return 'admin-panel-settings';
      case 'instructor':
        return 'school';
      case 'user':
        return 'person';
      default:
        return 'person';
    }
  };

  const renderChatItem = ({ item }: { item: ChatMessage }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={[styles.avatarContainer, { backgroundColor: getRoleBadgeColor(item.role) }]}>
        <MaterialIcons 
          name={getAvatarIcon(item.role)} 
          size={28} 
          color="white" 
        />
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{item.userName}</Text>
            <View style={[
              styles.roleBadge,
              { backgroundColor: getRoleBadgeColor(item.role) }
            ]}>
              <Text style={styles.roleText}>
                {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
              </Text>
            </View>
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.messageFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity 
          style={styles.newMessageButton}
          onPress={() => setIsModalVisible(true)}
        >
          <MaterialIcons name="edit" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dummyData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <CreateMessageModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#161647'
  },
  list: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  newMessageButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  toLabel: {
    fontSize: 16,
    marginRight: 8,
    color: '#000',
  },
  userList: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ChatScreen;
