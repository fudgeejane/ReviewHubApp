import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ModalAdminCourseProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { courseCode: string; courseDescription: string; instructor: string }) => void;
}

// Dummy instructor data - replace with actual data from your backend
const instructors = [
  { id: '1', name: 'Warren Tabora' },
  { id: '2', name: 'Clyde Padua' },
  { id: '3', name: 'Francine Mateo' },
];

export default function ModalAdminCourse({ visible, onClose, onSubmit }: ModalAdminCourseProps) {
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');

  const handleSubmit = () => {
    if (courseCode && courseDescription && selectedInstructor) {
      onSubmit({
        courseCode,
        courseDescription,
        instructor: selectedInstructor,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setCourseCode('');
    setCourseDescription('');
    setSelectedInstructor('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Course</Text>
            <TouchableOpacity onPress={handleClose}>
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

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedInstructor}
                onValueChange={(itemValue) => setSelectedInstructor(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Assign an instructor" value="" />
                {instructors.map((instructor) => (
                  <Picker.Item
                    key={instructor.id}
                    label={instructor.name}
                    value={instructor.name}
                  />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!courseCode || !courseDescription || !selectedInstructor) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!courseCode || !courseDescription || !selectedInstructor}
            >
              <Text style={styles.submitButtonText}>Add Course</Text>
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
    borderRadius: 20,
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
  pickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  picker: {
    height: hp('6%'),
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: wp('3%'),
    borderRadius: 8,
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  submitButtonDisabled: {
    backgroundColor: 'aaa',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '500',
  },
}); 