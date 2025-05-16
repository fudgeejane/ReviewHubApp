import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  image: any; // Using 'any' here since it's a require() import
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('enrolled');
  
  const enrolledCourses: Course[] = [
    {
      id: 'crim101',
      title: 'CRIM 101',
      subtitle: 'Criminal Jurisprudence & Procedure',
      instructor: 'Francine Jane',
      image: require('../../assets/images/course-law.jpg'),
    },
    {
      id: 'crim202',
      title: 'CRIM 202',
      subtitle: 'Crim Subject 2',
      instructor: 'Warren Inastruct',
      image: require('../../assets/images/course-law.jpg'),
    },
    {
      id: 'crim102',
      title: 'CRIM 102',
      subtitle: 'Law Enforcement Administration',
      instructor: 'Francine Jane',
      image: require('../../assets/images/course-law.jpg'),
    },
  ];

  const availableCourses: Course[] = [
    {
      id: 'crim103',
      title: 'CRIM 103',
      subtitle: 'Criminalistics',
      instructor: 'Francine Jane',
      image: require('../../assets/images/course-law.jpg'),
    },
    {
      id: 'crim303',
      title: 'CRIM 303',
      subtitle: 'Dummy Description',
      instructor: 'Francine Jane',
      image: require('../../assets/images/course-law.jpg'),
    },
    {
      id: 'crim203',
      title: 'CRIM 203',
      subtitle: 'Crim Subject 3',
      instructor: 'Warren Instruct',
      image: require('../../assets/images/course-law.jpg'),
    },
  ];

  const renderCoursesList = (courses: Course[], isEnrolled = true) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.coursesScroll}>
      {courses.map((course) => (
        <TouchableOpacity 
          key={course.id} 
          style={styles.courseCard}
          onPress={() => {
            router.push({
              pathname: '/users/course',
              params: {
                id: course.id,
                title: course.title,
                subtitle: course.subtitle,
                instructor: course.instructor,
                isEnrolled: isEnrolled.toString(),
              },
            });
          }}
        >
          <Image source={course.image} style={styles.courseImage} />
          <View style={styles.courseInfo}>
            <View style={[styles.badge, isEnrolled ? styles.enrolledBadge : styles.availableBadge]}>
              <Text style={[styles.badgeText, isEnrolled ? styles.enrolledText : styles.availableText]}>
                {isEnrolled ? 'Enrolled' : 'Available'}
              </Text>
            </View>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
            <View style={styles.instructorContainer}>
              <Ionicons name="person-circle-outline" size={16} color="#666" />
              <Text style={styles.instructorName}>{course.instructor}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for courses and certifications"
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
          <Text style={styles.activeSessionText}>Active Session</Text>
        </View>
        <Text style={styles.welcomeTitle}>Welcome back, Joana Lee!</Text>
        <Text style={styles.welcomeSubtitle}>Continue your learning journey with Crim Edge</Text>
        <View style={styles.timeInfo}>
          <Ionicons name="calendar-outline" size={16} color="#fff" />
          <Text style={styles.timeText}>Fri, May 16</Text>
          <Ionicons name="time-outline" size={16} color="#fff" style={styles.clockIcon} />
          <Text style={styles.timeText}>02:24 AM</Text>
        </View>
      </LinearGradient>

      {/* Courses Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabWrapper]}
          onPress={() => setActiveTab('enrolled')}
        >
          {activeTab === 'enrolled' ? (
            <LinearGradient
              colors={['#161647', '#1C1C7C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.tab, styles.activeTab]}
            >
              <Text style={[styles.tabText, styles.activeTabText]}>
                Enrolled Courses
              </Text>
              <View style={[styles.badge, styles.activeBadge]}>
                <Text style={[styles.badgeText, styles.activeBadgeText]}>{enrolledCourses.length}</Text>
              </View>
            </LinearGradient>
          ) : (
            <View style={styles.tab}>
              <Text style={styles.tabText}>
                Enrolled Courses
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{enrolledCourses.length}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabWrapper]}
          onPress={() => setActiveTab('available')}
        >
          {activeTab === 'available' ? (
            <LinearGradient
              colors={['#161647', '#1C1C7C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.tab, styles.activeTab]}
            >
              <Text style={[styles.tabText, styles.activeTabText]}>
                Available Courses
              </Text>
              <View style={[styles.badge, styles.activeBadge]}>
                <Text style={[styles.badgeText, styles.activeBadgeText]}>{availableCourses.length}</Text>
              </View>
            </LinearGradient>
          ) : (
            <View style={styles.tab}>
              <Text style={styles.tabText}>
                Available Courses
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{availableCourses.length}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Courses Section */}
      <View style={styles.sectionContainer}>
        {activeTab === 'enrolled' ? renderCoursesList(enrolledCourses) : renderCoursesList(availableCourses, false)}
      </View>
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  tabWrapper: {
    flex: 1,
    marginHorizontal: wp('1%'),
  },
  tab: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: wp('3%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeTab: {
    elevation: 2,
  },
  tabText: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginRight: wp('2%'),
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.3%'),
    borderRadius: 8,
  },
  activeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    fontSize: wp('3%'),
    color: '#666',
  },
  activeBadgeText: {
    color: '#fff',
  },
  sectionContainer: {
    marginBottom: hp('3%'),
  },
  coursesScroll: {
    paddingHorizontal: wp('5%'),
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: wp('70%'),
    marginRight: wp('4%'),
    overflow: 'hidden',
    elevation: 2,
  },
  courseImage: {
    width: '100%',
    height: hp('15%'),
    resizeMode: 'cover',
  },
  courseInfo: {
    padding: wp('4%'),
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
  enrolledBadge: {
    backgroundColor: '#E8F5E9',
    marginBottom: hp('1%'),
  },
  availableBadge: {
    backgroundColor: '#E3F2FD',
    marginBottom: hp('1%'),
  },
  enrolledText: {
    color: '#2E7D32',
  },
  availableText: {
    color: '#1976D2',
  },
}); 