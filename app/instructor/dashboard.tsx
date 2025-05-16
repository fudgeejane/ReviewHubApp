import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function InstructorDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddCourse = () => {
    // TODO: Implement course addition logic
    console.log('Adding course:', { courseCode, courseDescription, selectedImage });
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

      {/* Add New Course Section */}
      <View style={styles.addCourseContainer}>
        <Text style={styles.sectionTitle}>Add New Course</Text>
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
          <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add Course</Text>
          </TouchableOpacity>
        </View>
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
  addCourseContainer: {
    backgroundColor: '#fff',
    margin: wp('5%'),
    padding: wp('5%'),
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#161647',
    marginBottom: hp('2%'),
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: wp('3%'),
    borderRadius: 8,
    marginTop: hp('1%'),
  },
  addButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    fontWeight: '500',
  },
});
