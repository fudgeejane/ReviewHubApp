import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalCourse from '../components/ModalCourse';

interface Course {
  id: string;
  code: string;
  description: string;
  instructor: string;
  image?: any;
}

export default function InstructorDashboard() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for courses
  const courses: Course[] = [
    {
      id: 'crim101',
      code: 'CRIM 101',
      description: 'Criminal Jurisprudence & Procedure',
      instructor: 'Warren Tabora',
      image: require('../../assets/images/course-law.jpg'),
    },
    {
      id: 'crim202',
      code: 'CRIM 202',
      description: 'Law Enforcement Administration',
      instructor: 'Clyde Padua',
      image: require('../../assets/images/course-law.jpg'),
    },
    {
      id: 'crim102',
      code: 'CRIM 102',
      description: 'Criminalistics',
      instructor: 'Francine Mateo',
      image: require('../../assets/images/course-law.jpg'),
    },
  ];

  const handleAddCourse = (courseData: { courseCode: string; courseDescription: string }) => {
    console.log('Adding course:', courseData);
    // Here you would typically make an API call to add the course
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your courses"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Welcome Section */}
      <LinearGradient
        colors={['#161647', '#3535AD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.welcomeCard}
      >
        <View style={styles.activeSessionBadge}>
          <Text style={styles.activeSessionText}>Instructor</Text>
        </View>
        <Text style={styles.welcomeTitle}>Welcome back, Maem Sammy!</Text>
        <Text style={styles.welcomeSubtitle}>Manage your courses and students</Text>
        <View style={styles.timeInfo}>
          <Ionicons name="calendar-outline" size={16} color="#fff" />
          <Text style={styles.timeText}>Fri, May 16</Text>
          <Ionicons name="time-outline" size={16} color="#fff" style={styles.clockIcon} />
          <Text style={styles.timeText}>02:24 AM</Text>
        </View>
      </LinearGradient>

      {/* Courses Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Your Courses</Text>
          <TouchableOpacity 
            style={styles.addSectionButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="add" size={16} color="#2196F3" />
            <Text style={styles.addSectionText}>Add Course</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.coursesScroll}
          contentContainerStyle={styles.coursesScrollContent}
        >
          {courses.map((course) => (
            <TouchableOpacity 
              key={course.id} 
              style={styles.courseCard}
              onPress={() => router.push({
                pathname: '/instructor/course',
                params: {
                  id: course.id,
                  title: course.code,
                  subtitle: course.description,
                  instructor: course.instructor,
                  isEnrolled: 'true'
                }
              })}
            >
              <Image source={course.image} style={styles.courseImage} />
              <View style={styles.courseInfo}>
                <View style={styles.instructorBadge}>
                  <Text style={styles.instructorBadgeText}>Your Course</Text>
                </View>
                <Text style={styles.courseTitle}>{course.description}</Text>
                <View style={styles.instructorContainer}>
                  <Ionicons name="person-circle-outline" size={16} color="#666" />
                  <Text style={styles.instructorName}>{course.instructor}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Add Course Modal */}
      <ModalCourse
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddCourse}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: wp('5%'),
    marginBottom: -hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    fontSize: wp('4%'),
  },
  welcomeCard: {
    margin: wp('5%'),
    padding: wp('5%'),
    borderRadius: 8,
  },
  activeSessionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: hp('1%'),
  },
  activeSessionText: {
    color: '#fff',
    fontSize: wp('3%'),
    fontWeight: '500',
  },
  welcomeTitle: {
    color: '#fff',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  welcomeSubtitle: {
    color: '#fff',
    fontSize: wp('3.5%'),
    opacity: 0.8,
    marginBottom: hp('2%'),
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    marginLeft: wp('1%'),
  },
  clockIcon: {
    marginLeft: wp('4%'),
  },
  addCourseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    margin: wp('5%'),
    padding: wp('3%'),
    borderRadius: 8,
  },
  addCourseButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    fontWeight: '500',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  contentTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#161647',
  },
  addSectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    borderRadius: 8,
  },
  addSectionText: {
    color: '#2196F3',
    fontSize: wp('3.5%'),
    marginLeft: wp('1%'),
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: hp('3%'),
  },
  coursesScroll: {
    paddingLeft: wp('5%'),
  },
  coursesScrollContent: {
    paddingRight: wp('5%'),
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: wp('70%'),
    marginRight: wp('4%'),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  courseImage: {
    width: '100%',
    height: hp('15%'),
    resizeMode: 'cover',
  },
  courseInfo: {
    padding: wp('4%'),
  },
  instructorBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: hp('1%'),
  },
  instructorBadgeText: {
    color: '#2E7D32',
    fontSize: wp('3%'),
    fontWeight: '500',
  },
  courseTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#161647',
    marginBottom: hp('0.5%'),
  },
  courseSubtitle: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginBottom: hp('1.5%'),
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorName: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginLeft: wp('1%'),
  },
});
