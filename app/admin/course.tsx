import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Section {
  id: string;
  title: string;
  isExpanded: boolean;
  lectures: Lecture[];
  quiz?: {
    title: string;
    attempts: QuizAttempt[];
    questionCount: number;
  };
}

interface Lecture {
  id: string;
  title: string;
}

interface QuizAttempt {
  studentName: string;
  score: string;
  percentage: string;
}

export default function CourseScreen() {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      title: 'Getting Started',
      isExpanded: true,
      lectures: [
        { id: 'l1', title: 'Introduction to the Course' },
        { id: 'l2', title: 'Course Overview and Objectives' },
      ],
      quiz: {
        title: 'Introduction Quiz',
        questionCount: 10,
        attempts: [
          { studentName: 'Blair Waldorf', score: '4/10', percentage: '40.0%' },
          { studentName: 'Sarena van der Woodsen', score: '2/10', percentage: '20.0%' },
        ]
      }
    },
    {
      id: '2',
      title: 'Basic Concepts',
      isExpanded: false,
      lectures: [
        { id: 'l3', title: 'Understanding Criminalistics' },
        { id: 'l4', title: 'Core Principles' },
      ],
      quiz: {
        title: 'Basic Concepts',
        questionCount: 15,
        attempts: [
          { studentName: 'Chuck Bass', score: '3/10', percentage: '30.0%' },
          { studentName: 'Nate Archibald', score: '9/10', percentage: '90.0%' },
        ]
      }
    }
  ]);

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, isExpanded: !section.isExpanded }
        : section
    ));
  };

  return (
    <View style={styles.container}>
      {/* Course Header */}
      <View style={styles.header}>
        <Text style={styles.courseTitle}>{params.title}</Text>
        <Text style={styles.courseSubtitle}>{params.subtitle}</Text>
        <View style={styles.instructorContainer}>
          <Ionicons name="person-circle-outline" size={20} color="#666" />
          <Text style={styles.instructorText}>{params.instructor}</Text>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'quizzes' && styles.activeTab]}
          onPress={() => setActiveTab('quizzes')}
        >
          <Text style={[styles.tabText, activeTab === 'quizzes' && styles.activeTabText]}>Quizzes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'overview' ? (
          <View style={styles.overviewContainer}>
            <View style={styles.courseContentHeader}>
              <Text style={styles.courseContentTitle}>Course Content</Text>
            </View>

            {sections.map((section) => (
              <View key={section.id} style={styles.sectionContainer}>
                <TouchableOpacity 
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.id)}
                >
                  <View style={styles.sectionTitleContainer}>
                    <Ionicons 
                      name={section.isExpanded ? "chevron-down" : "chevron-forward"} 
                      size={20} 
                      color="#161647" 
                    />
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                  <TouchableOpacity style={styles.sectionOptionsButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                  </TouchableOpacity>
                </TouchableOpacity>

                {section.isExpanded && (
                  <View style={styles.sectionContent}>
                    {section.lectures.map((lecture) => (
                      <View key={lecture.id} style={styles.lectureItem}>
                        <Text style={styles.lectureTitle}>{lecture.title}</Text>
                      </View>
                    ))}
                    <TouchableOpacity style={styles.addLectureButton}>
                      <Ionicons name="add" size={16} color="#2196F3" />
                      <Text style={styles.addLectureText}>Add Lecture</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.quizzesContainer}>
            <View style={styles.courseContentHeader}>
              <Text style={styles.courseContentTitle}>Quizzes</Text>
            </View>

            {sections.map((section) => (
              <View key={section.id} style={styles.sectionContainer}>
                <TouchableOpacity 
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.id)}
                >
                  <View style={styles.sectionTitleContainer}>
                    <Ionicons 
                      name={section.isExpanded ? "chevron-down" : "chevron-forward"} 
                      size={20} 
                      color="#161647" 
                    />
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                  <TouchableOpacity style={styles.sectionOptionsButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                  </TouchableOpacity>
                </TouchableOpacity>

                {section.isExpanded && section.quiz && (
                  <View style={styles.sectionContent}>
                    <View style={styles.quizInfoContainer}>
                      <Text style={styles.quizTitle}>{section.quiz.title}</Text>
                      <Text style={styles.questionCount}>{section.quiz.questionCount} questions</Text>
                    </View>
                    
                    <View style={styles.attemptsSection}>
                      <Text style={styles.attemptsSectionTitle}>Recent Attempts:</Text>
                      {section.quiz.attempts.map((attempt, index) => (
                        <View key={index} style={styles.attemptItem}>
                          <Text style={styles.studentName}>{attempt.studentName}</Text>
                          <View style={styles.scoreContainer}>
                            <Text style={styles.scoreText}>Score: {attempt.score}</Text>
                            <Text style={[
                              styles.percentageText,
                              { color: parseFloat(attempt.percentage) >= 75 ? '#4CAF50' : '#F44336' }
                            ]}>{attempt.percentage}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
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
    padding: wp('5%'),
    backgroundColor: '#fff',
  },
  courseTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#161647',
  },
  courseSubtitle: {
    fontSize: wp('4%'),
    color: '#666',
    marginTop: hp('0.5%'),
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  instructorText: {
    marginLeft: wp('2%'),
    fontSize: wp('3.5%'),
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingVertical: hp('2%'),
    marginRight: wp('5%'),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#161647',
  },
  tabText: {
    fontSize: wp('4%'),
    color: '#666',
  },
  activeTabText: {
    color: '#161647',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  overviewContainer: {
    padding: wp('5%'),
  },
  courseContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  courseContentTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#161647',
  },
  addSectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2196F3',
    borderRadius: 8,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    backgroundColor: '#EDF7FF',
  },
  addSectionText: {
    color: '#2196F3',
    marginLeft: wp('1%'),
    fontSize: wp('3.5%'),
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: hp('2%'),
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: wp('4%'),
    color: '#161647',
    marginLeft: wp('2%'),
    fontWeight: '500',
  },
  sectionOptionsButton: {
    padding: wp('2%'),
  },
  sectionContent: {
    padding: wp('4%'),
  },
  lectureItem: {
    paddingVertical: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  lectureTitle: {
    fontSize: wp('3.5%'),
    color: '#161647',
  },
  addLectureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%'),
    alignSelf: 'flex-start',
  },
  addLectureText: {
    color: '#2196F3',
    marginLeft: wp('1%'),
    fontSize: wp('3.5%'),
  },
  quizzesContainer: {
    padding: wp('5%'),
  },
  quizInfoContainer: {
    marginBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: hp('2%'),
  },
  quizTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#161647',
    marginBottom: hp('0.5%'),
  },
  questionCount: {
    fontSize: wp('3.5%'),
    color: '#2196F3',
  },
  attemptsSection: {
    backgroundColor: '#fff',
    padding: wp('4%'),
    borderRadius: 8,
  },
  attemptsSectionTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#161647',
    marginBottom: hp('2%'),
  },
  attemptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  studentName: {
    fontSize: wp('3.5%'),
    color: '#161647',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginRight: wp('2%'),
  },
  percentageText: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
});
