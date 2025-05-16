import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function CourseDetail() {
  const params = useLocalSearchParams();
  const {
    id,
    title,
    subtitle,
    instructor,
    isEnrolled,
  } = params;

  return (
    <ScrollView style={styles.container}>
      {/* Course Header */}
      <LinearGradient
        colors={['#161647', '#3535AD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Image 
          source={require('../../assets/images/course-law.jpg')} 
          style={styles.courseImage}
        />
        <View style={styles.headerContent}>
          <View style={[styles.badge, isEnrolled === 'true' ? styles.enrolledBadge : styles.availableBadge]}>
            <Text style={[styles.badgeText, isEnrolled === 'true' ? styles.enrolledText : styles.availableText]}>
              {isEnrolled === 'true' ? 'Enrolled' : 'Available'}
            </Text>
          </View>
          <Text style={styles.courseTitle}>{title}</Text>
          <Text style={styles.courseSubtitle}>{subtitle}</Text>
          <View style={styles.instructorContainer}>
            <Ionicons name="person-circle-outline" size={20} color="#fff" />
            <Text style={styles.instructorName}>{instructor}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Course Content */}
      <View style={styles.content}>
        {/* Course Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Overview</Text>
          <Text style={styles.sectionText}>
            This course provides comprehensive knowledge about {subtitle}. Students will learn theoretical concepts and practical applications through interactive lessons and case studies.
          </Text>
        </View>

        {/* Course Modules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Modules</Text>
          {[1, 2, 3].map((module) => (
            <TouchableOpacity key={module} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>Module {module}</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
              <Text style={styles.moduleDescription}>
                Learn about the fundamental concepts and principles of {subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Button */}
        {isEnrolled !== 'true' && (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Enroll Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingBottom: hp('3%'),
  },
  courseImage: {
    width: '100%',
    height: hp('25%'),
    resizeMode: 'cover',
  },
  headerContent: {
    padding: wp('5%'),
  },
  badge: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: hp('1%'),
  },
  enrolledBadge: {
    backgroundColor: '#E8F5E9',
  },
  availableBadge: {
    backgroundColor: '#E3F2FD',
  },
  badgeText: {
    fontSize: wp('3%'),
    fontWeight: '500',
  },
  enrolledText: {
    color: '#2E7D32',
  },
  availableText: {
    color: '#1976D2',
  },
  courseTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp('1%'),
  },
  courseSubtitle: {
    fontSize: wp('4%'),
    color: '#fff',
    opacity: 0.9,
    marginBottom: hp('2%'),
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorName: {
    fontSize: wp('4%'),
    color: '#fff',
    marginLeft: wp('2%'),
  },
  content: {
    padding: wp('5%'),
  },
  section: {
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#161647',
    marginBottom: hp('2%'),
  },
  sectionText: {
    fontSize: wp('4%'),
    color: '#666',
    lineHeight: hp('3%'),
  },
  moduleCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: wp('4%'),
    marginBottom: hp('2%'),
    elevation: 2,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  moduleTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#161647',
  },
  moduleDescription: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#161647',
    borderRadius: 8,
    padding: wp('4%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  actionButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
}); 