import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ModalCourseProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (courseData: { courseCode: string; courseDescription: string }) => void;
  initialData?: { courseCode: string; courseDescription: string };
  mode?: 'add' | 'edit';
}

export default function ModalCourse({ 
  visible, 
  onClose, 
  onSubmit, 
  initialData,
  mode = 'add' 
}: ModalCourseProps) {
  const [courseCode, setCourseCode] = useState(initialData?.courseCode || '');
  const [courseDescription, setCourseDescription] = useState(initialData?.courseDescription || '');

  const handleSubmit = () => {
    onSubmit({ courseCode, courseDescription });
    setCourseCode('');
    setCourseDescription('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {mode === 'add' ? 'Add New Course' : 'Edit Course'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter course code"
              value={courseCode}
              onChangeText={setCourseCode}
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Enter course description"
              value={courseDescription}
              onChangeText={setCourseDescription}
              multiline
            />
            <TouchableOpacity style={styles.uploadButton} onPress={() => console.log('Upload image')}>
              <Ionicons name="image-outline" size={20} color="#007AFF" />
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Ionicons 
                name={mode === 'add' ? "add-circle-outline" : "save-outline"} 
                size={20} 
                color="#fff" 
              />
              <Text style={styles.addButtonText}>
                {mode === 'add' ? 'Add Course' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: wp('90%'),
    padding: wp('5%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#161647',
  },
  formContainer: {
    gap: hp('2%'),
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: wp('3%'),
    fontSize: wp('4%'),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  descriptionInput: {
    height: hp('15%'),
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    padding: wp('3%'),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    color: '#007AFF',
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('3%'),
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    fontWeight: '500',
  },
});