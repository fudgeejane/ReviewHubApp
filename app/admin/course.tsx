import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalCourse from '../components/ModalCourse';
import ModalLesson from '../components/ModalLesson';
import ModalSection from '../components/ModalSection';

interface Lesson {
  title: string;
}

interface Section {
  title: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const DeleteConfirmationModal = ({ visible, onClose, onConfirm, title, message }: DeleteModalProps) => (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.deleteModalContent}>
        <Text style={styles.deleteModalTitle}>{title}</Text>
        <Text style={styles.deleteModalText}>{message}</Text>
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

export default function CourseDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const {
    id,
    title,
    subtitle,
    instructor,
  } = params;

  const [sections, setSections] = useState<Section[]>([
    {
      title: "Getting Started",
      lessons: [
        { title: "Introduction to the Course" },
        { title: "Course Overview and Objectives" }
      ],
      isExpanded: true
    }
  ]);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [editingSection, setEditingSection] = useState<{ index: number; data: Section } | null>(null);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingSection, setDeletingSection] = useState<number | null>(null);
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);

  const handleAddSection = (data: { title: string }) => {
    setSections([...sections, { title: data.title, lessons: [], isExpanded: false }]);
  };

  const handleEditSection = (data: { title: string }) => {
    if (editingSection !== null) {
      const updatedSections = [...sections];
      updatedSections[editingSection.index] = {
        ...updatedSections[editingSection.index],
        title: data.title
      };
      setSections(updatedSections);
      setEditingSection(null);
    }
  };

  const handleDeleteSection = (index: number) => {
    setDeletingSection(index);
    setShowDeleteModal(true);
    setShowDropdown(null);
  };

  const confirmDeleteSection = () => {
    if (deletingSection !== null) {
      const updatedSections = sections.filter((_, i) => i !== deletingSection);
      setSections(updatedSections);
      setShowDeleteModal(false);
      setDeletingSection(null);
    }
  };

  const handleAddLesson = (data: { title: string }) => {
    if (selectedSectionIndex !== null) {
      const updatedSections = [...sections];
      updatedSections[selectedSectionIndex].lessons.push({ title: data.title });
      setSections(updatedSections);
    }
  };

  const toggleSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections[index].isExpanded = !updatedSections[index].isExpanded;
    setSections(updatedSections);
  };

  const renderDropdown = (sectionIndex: number) => {
    if (showDropdown !== sectionIndex) return null;

    return (
      <View style={styles.dropdownMenu}>
        <TouchableOpacity 
          style={styles.dropdownOption}
          onPress={() => {
            setEditingSection({ index: sectionIndex, data: sections[sectionIndex] });
            setShowSectionModal(true);
            setShowDropdown(null);
          }}
        >
          <Text style={styles.dropdownText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.dropdownOption, styles.deleteOption]}
          onPress={() => handleDeleteSection(sectionIndex)}
        >
          <Text style={[styles.dropdownText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCourseDropdown = () => {
    if (!showCourseDropdown) return null;

    return (
      <View style={styles.courseDropdownMenu}>
        <TouchableOpacity 
          style={styles.dropdownOption}
          onPress={() => {
            setShowCourseModal(true);
            setShowCourseDropdown(false);
          }}
        >
          <Text style={styles.dropdownText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.dropdownOption, styles.deleteOption]}
          onPress={() => {
            setShowDeleteCourseModal(true);
            setShowCourseDropdown(false);
          }}
        >
          <Text style={[styles.dropdownText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Course Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#161647" />
            </TouchableOpacity>
            <Text style={styles.courseTitle}>{title}</Text>
            <TouchableOpacity 
              style={styles.courseMenuButton}
              onPress={() => setShowCourseDropdown(!showCourseDropdown)}
            >
              <Ionicons name="ellipsis-vertical" size={24} color="#161647" />
            </TouchableOpacity>
            {renderCourseDropdown()}
          </View>
          <Text style={styles.courseSubtitle}>{subtitle}</Text>
          <View style={styles.instructorContainer}>
            <Ionicons name="person-circle-outline" size={20} color="#161647" />
            <Text style={styles.instructorName}>{instructor}</Text>
          </View>
        </View>
      </View>

      {/* Course Content */}
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Course Content</Text>
          <TouchableOpacity 
            style={styles.addSectionButton}
            onPress={() => {
              setEditingSection(null);
              setShowSectionModal(true);
            }}
          >
            <Ionicons name="add" size={16} color="#2196F3" />
            <Text style={styles.addSectionText}>Add Section</Text>
          </TouchableOpacity>
        </View>

        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <TouchableOpacity 
                style={styles.sectionTitleContainer}
                onPress={() => toggleSection(sectionIndex)}
              >
                <Ionicons 
                  name={section.isExpanded ? "chevron-down" : "chevron-forward"} 
                  size={24} 
                  color="#161647" 
                />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.sectionMenuButton}
                onPress={() => setShowDropdown(showDropdown === sectionIndex ? null : sectionIndex)}
              >
                <Ionicons name="ellipsis-vertical" size={20} color="#666" />
              </TouchableOpacity>
              {renderDropdown(sectionIndex)}
            </View>

            {section.isExpanded && (
              <View style={styles.lessonsList}>
                {section.lessons.map((lesson, lessonIndex) => (
                  <View key={lessonIndex} style={styles.lessonItem}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  </View>
                ))}
                <TouchableOpacity 
                  style={styles.addLectureButton}
                  onPress={() => {
                    setSelectedSectionIndex(sectionIndex);
                    setShowLessonModal(true);
                  }}
                >
                  <Ionicons name="add" size={16} color="#2196F3" />
                  <Text style={styles.addLectureText}>Add Lecture</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Modals */}
      <ModalSection
        visible={showSectionModal}
        onClose={() => {
          setShowSectionModal(false);
          setEditingSection(null);
        }}
        onSubmit={(data) => {
          if (editingSection) {
            handleEditSection(data);
          } else {
            handleAddSection(data);
          }
          setShowSectionModal(false);
        }}
        mode={editingSection ? 'edit' : 'add'}
        initialData={editingSection?.data ? { title: editingSection.data.title } : undefined}
      />

      <ModalLesson
        visible={showLessonModal}
        onClose={() => {
          setShowLessonModal(false);
          setSelectedSectionIndex(null);
        }}
        onSubmit={(data) => {
          handleAddLesson(data);
          setShowLessonModal(false);
          setSelectedSectionIndex(null);
        }}
        mode="add"
      />

      <ModalCourse
        visible={showCourseModal}
        onClose={() => setShowCourseModal(false)}
        onSubmit={(data) => {
          // Handle course update
          setShowCourseModal(false);
        }}
        mode="edit"
        initialData={{
          courseCode: title as string,
          courseDescription: subtitle as string,
        }}
      />

      {/* Delete Section Confirmation Modal */}
      <DeleteConfirmationModal
        visible={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingSection(null);
        }}
        onConfirm={confirmDeleteSection}
        title="Delete Section"
        message="Are you sure you want to delete this section? This action cannot be undone."
      />

      {/* Delete Course Confirmation Modal */}
      <DeleteConfirmationModal
        visible={showDeleteCourseModal}
        onClose={() => setShowDeleteCourseModal(false)}
        onConfirm={() => {
          setShowDeleteCourseModal(false);
          router.back();
        }}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingBottom: hp('2%'),
    marginBottom: hp('2%'),
  },
  headerContent: {
    padding: wp('5%'),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  backButton: {
    marginRight: wp('3%'),
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#161647',
    flex: 1,
  },
  courseSubtitle: {
    fontSize: wp('4%'),
    color: '#161647',
    opacity: 0.8,
    marginBottom: hp('2%'),
    marginLeft: wp('9%'),
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('9%'),
  },
  instructorName: {
    fontSize: wp('4%'),
    color: '#161647',
    marginLeft: wp('2%'),
  },
  content: {
    padding: wp('5%'),
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  contentTitle: {
    fontSize: wp('5%'),
    fontWeight: 'semibold',
    color: '#161647',
  },
  sectionContainer: {
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    color: '#161647',
    marginLeft: wp('2%'),
  },
  sectionMenuButton: {
    padding: wp('2%'),
  },
  lessonsList: {
    paddingHorizontal: wp('4%'),
    paddingBottom: wp('4%'),
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  lessonTitle: {
    fontSize: wp('4%'),
    color: '#666',
    marginLeft: wp('8%'),
  },
  addLectureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    backgroundColor: '#EDF7FF',
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    alignSelf: 'flex-start',
    marginLeft: wp('8%'),
  },
  addLectureText: {
    color: '#2196F3',
    fontSize: wp('3.5%'),
    marginLeft: wp('1%'),
    fontWeight: '500',
  },
  addSectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    backgroundColor: '#EDF7FF',
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    alignSelf: 'flex-start',
    marginLeft: wp('8%'),
  },
  addSectionText: {
    color: '#2196F3',
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: wp('25%'),
    zIndex: 1000,
  },
  dropdownOption: {
    padding: wp('3%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  deleteOption: {
    borderBottomWidth: 0,
  },
  dropdownText: {
    fontSize: wp('3.5%'),
    color: '#333',
  },
  deleteText: {
    color: '#FF3B30',
  },
  courseMenuButton: {
    padding: wp('2%'),
    marginLeft: wp('2%'),
  },
  courseDropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: wp('2%'),
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: wp('25%'),
    zIndex: 1000,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  cancelButton: {
    backgroundColor: '#EDF7FF',
  },
  cancelButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 