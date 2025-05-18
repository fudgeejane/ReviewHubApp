import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function Announcement() {
  const announcements: Announcement[] = [
    {
      id: 1,
      title: 'Welcome to the New Semester',
      content: 'We are excited to welcome all students to the new semester. Please check your course schedules and make sure you have access to all your enrolled courses.',
      author: 'Admin Team',
      date: 'May 16, 2024',
    },
    {
      id: 2,
      title: 'System Maintenance Notice',
      content: 'The system will undergo maintenance this weekend. Please save your work and expect some downtime.',
      author: 'Tech Support',
      date: 'May 15, 2024',
    },
    // Add more announcements as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Announcements</Text>
      </View>

      {announcements.map((announcement) => (
        <View key={announcement.id} style={styles.announcementCard}>
          <View style={styles.cardHeader}>
            <FontAwesome5 name="bullhorn" size={20} color="#007AFF" />
            <Text style={styles.title}>{announcement.title}</Text>
          </View>
          <Text style={styles.content}>{announcement.content}</Text>
          <View style={styles.footer}>
            <View style={styles.authorContainer}>
              <FontAwesome5 name="user-circle" size={16} color="#666" />
              <Text style={styles.authorText}>{announcement.author}</Text>
            </View>
            <View style={styles.dateContainer}>
              <FontAwesome5 name="calendar-alt" size={16} color="#666" />
              <Text style={styles.dateText}>{announcement.date}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: 21,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#161647'
  },
  headerSubtitle: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginTop: hp('0.5%'),
  },
  announcementCard: {
    backgroundColor: '#fff',
    margin: wp('4%'),
    padding: wp('4%'),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#161647',
    marginLeft: wp('2%'),
    flex: 1,
  },
  content: {
    fontSize: wp('3.8%'),
    color: '#444',
    lineHeight: wp('5.5%'),
    marginBottom: hp('2%'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: hp('1.5%'),
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginLeft: wp('2%'),
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginLeft: wp('2%'),
  },
});
