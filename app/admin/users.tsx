import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalUser from '../components/ModalUser';

// Dummy data - replace with your actual data source
const initialUsers = [
  { id: 'ig6oosbHNKVdNNuD3iP9larh3ZK2', name: 'Admin CrimEdge', email: 'admin@crimedge.com', role: 'admin' },
  { id: 'GOtmjToATPaP47hHo4ghQCA05tq1', name: 'Warren Tabora', email: 'warrentabora3410@gmail.com', role: 'user' },
  { id: 'YathKdyXaFO1SaLdzSTxcW5z6sy2', name: 'Francine Mateo', email: 'francinejane.sd@gmail.com', role: 'user' },
  { id: 'chYfHxfizXbuPfKDYnSkauJJAUO2', name: 'Clyde Padua', email: 'clydepadua091@gmail.com', role: 'instructor' },
];

export default function UsersScreen() {
  const [users, setUsers] = useState(initialUsers);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');

  const handleAddUser = (userData: { firstName: string; lastName: string; email: string; password: string }) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: 'instructor' // Since this is specifically for adding instructors
    };
    setUsers([...users, newUser]);
    setModalVisible(false);
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const matchesSearch = 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRoleFilter === 'all' || user.role === selectedRoleFilter;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        // Sort by role priority: admin > instructor > user
        const rolePriority = { admin: 0, instructor: 1, user: 2 };
        return rolePriority[a.role as keyof typeof rolePriority] - rolePriority[b.role as keyof typeof rolePriority];
      });
  }, [users, searchQuery, selectedRoleFilter]);

  const renderItem = ({ item }: { item: typeof users[0] }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userId}>ID: {item.id}</Text>
      </View>
      <View style={[
        styles.roleTag,
        item.role === 'admin' ? styles.adminTag : 
        item.role === 'instructor' ? styles.instructorTag : 
        styles.userTag
      ]}>
        <Text style={[
          styles.roleText,
          item.role === 'admin' ? styles.adminText :
          item.role === 'instructor' ? styles.instructorText :
          styles.userText
        ]}>{item.role}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.addButtonContent}>
            <Ionicons name="add-circle" size={24} color="#2196F3" />
            <Text style={styles.addButtonText}>Add Instructor</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or email"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.roleFilterContainer}>
          <Picker
            selectedValue={selectedRoleFilter}
            onValueChange={(itemValue) => setSelectedRoleFilter(itemValue)}
            style={styles.rolePicker}
          >
            <Picker.Item label="All Roles" value="all" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Instructor" value="instructor" />
            <Picker.Item label="User" value="user" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <ModalUser
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'semibold',
    color: '#161647',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
    gap: wp('2%'),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    height: hp('5%'),
    fontSize: wp('4%'),
  },
  roleFilterContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    width: wp('30%'),
  },
  rolePicker: {
    height: hp('5%'),
  },
  addButton: {
    backgroundColor: '#EDF7FF',
    borderRadius: 12,
    padding: wp('2%'),
    borderWidth: 1,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    gap: wp('1%'),
  },
  addButtonText: {
    color: '#2196F3',
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
  listContainer: {
    gap: hp('2%'),
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#161647',
    marginBottom: hp('0.5%'),
  },
  userEmail: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginBottom: hp('0.5%'),
  },
  userId: {
    fontSize: wp('3%'),
    color: '#888',
  },
  roleTag: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: 20,
    marginLeft: wp('2%'),
  },
  adminTag: {
    backgroundColor: '#FFE0E0',
  },
  instructorTag: {
    backgroundColor: '#E3F2FD',
  },
  userTag: {
    backgroundColor: '#E8F5E9',
  },
  roleText: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  adminText: {
    color: '#D32F2F',
  },
  instructorText: {
    color: '#1976D2',
  },
  userText: {
    color: '#388E3C',
  },
});
