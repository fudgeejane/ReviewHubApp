import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ModalLessonProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
  initialData?: { title: string; description: string };
  mode?: 'add' | 'edit';
}

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalLesson({ visible, onClose, onSubmit, initialData, mode = 'add' }: ModalLessonProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({ 
        title: title.trim(),
        description: description.trim()
      });
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  const DeleteConfirmationModal = ({ visible, onClose, onConfirm }: DeleteModalProps) => (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.deleteModalContent}>
          <Text style={styles.deleteModalTitle}>Delete Lesson</Text>
          <Text style={styles.deleteModalText}>
            Are you sure you want to delete this Lesson? This action cannot be undone.
          </Text>
          <View style={styles.deleteModalButtons}>
            <TouchableOpacity
              style={[styles.deleteModalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteModalButton, styles.deleteButton]}
              onPress={onConfirm}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {mode === 'add' ? 'Add New Lesson' : 'Edit Lesson'}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter Lesson title"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter Lesson description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Files (PDF, Image, Video)</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {mode === 'edit' && (
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => setShowDeleteModal(true)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {mode === 'add' ? 'Add Lesson' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <DeleteConfirmationModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          onClose();
          // TODO: Implement delete functionality
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp('5%'),
    width: wp('90%'),
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#161647',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: wp('3%'),
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: wp('2%'),
  },
  button: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 8,
    minWidth: wp('20%'),
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
  deleteModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp('5%'),
    width: wp('80%'),
    maxWidth: 400,
  },
  deleteModalTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: hp('1%'),
  },
  deleteModalText: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginBottom: hp('2%'),
  },
  deleteModalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: wp('2%'),
  },
  deleteModalButton: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 8,
    minWidth: wp('20%'),
    alignItems: 'center',
  },
  descriptionInput: {
    height: hp('15%'),
    textAlignVertical: 'top',
    paddingTop: wp('3%'),
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#EDF7FF',
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    alignSelf: 'center',
  },
  uploadButtonText: {
    color: '#2196F3',
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
}); 