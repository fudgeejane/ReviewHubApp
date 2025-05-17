import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  course: string;
  target: string;
}

export default function AnnouncementScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('Free');
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);

  const targetOptions = ['Free', 'Basic Plan', 'Premium Plan'];

  // Mock announcements data
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Midterm Exam Schedule',
      message: 'The midterm exam for CRIM 101 will be held on March 30, 2024.',
      date: 'March 15, 2024',
      target: 'Free',
      course: 'CRIM 101'
    },
    {
      id: '2',
      title: 'Assignment Deadline Extension',
      message: 'The deadline for Case Study #3 has been extended to April 5, 2024.',
      date: 'March 14, 2024',
      target: 'Premium Plan',
      course: 'Case Study'
    },
  ];

  const handleCreateAnnouncement = () => {
    if (!newTitle || !newMessage) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // TODO: Implement announcement creation logic
    console.log('Creating announcement:', { newTitle, newMessage, selectedTarget });
    setModalVisible(false);
    setNewTitle('');
    setNewMessage('');
    setSelectedTarget('Free');
  };

  const renderAnnouncement = (announcement: Announcement) => (
    <View key={announcement.id} style={styles.announcementItem}>
      <View style={styles.announcementHeader}>
        <Text style={styles.announcementTitle}>{announcement.title}</Text>
        <View style={styles.tagsContainer}>
         
          <Text style={[styles.courseTag, styles.targetTag]}>{announcement.target}</Text>
        </View>
      </View>
      <Text style={styles.announcementMessage}>{announcement.message}</Text>
      <Text style={styles.announcementDate}>{announcement.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      
        <Text style={styles.headerTitle}>Announcements</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome5 name="plus" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.announcementsList}>
        {announcements.map(renderAnnouncement)}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Announcement</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Message"
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
            />
            <View style={styles.targetContainer}>
              <Text style={styles.targetLabel}>Target Plan:</Text>
              <Pressable
                style={styles.targetSelector}
                onPress={() => setShowTargetDropdown(!showTargetDropdown)}
              >
                <Text style={styles.targetText}>{selectedTarget}</Text>
                <FontAwesome5 
                  name={showTargetDropdown ? "chevron-up" : "chevron-down"} 
                  size={16} 
                  color="#666" 
                />
              </Pressable>
              {showTargetDropdown && (
                <View style={styles.dropdownContainer}>
                  {targetOptions.map((option) => (
                    <Pressable
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedTarget(option);
                        setShowTargetDropdown(false);
                      }}
                    >
                      <Text style={[
                        styles.dropdownText,
                        selectedTarget === option && styles.selectedDropdownText
                      ]}>
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createButtonModal]}
                onPress={handleCreateAnnouncement}
              >
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  createButton: {
    padding: 8,
  },
  announcementsList: {
    flex: 1,
  },
  announcementItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#161647',
    flex: 1,
  },
  courseTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  announcementMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 12,
    color: '#8e8e93',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#161647',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  createButtonModal: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  targetContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  targetLabel: {
    fontSize: 16,
    color: '#161647',
    marginBottom: 8,
  },
  targetSelector: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDropdownText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  targetTag: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
}); 