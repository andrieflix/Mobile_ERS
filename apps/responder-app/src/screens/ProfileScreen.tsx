import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { User, ResponderProfile } from '@ph-emergency/api';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

// Temporary mock data
const mockUser: User = {
  id: 'responder1',
  email: 'responder@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+63 912 345 6789',
  role: 'responder',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProfile: ResponderProfile = {
  userId: 'responder1',
  department: 'Emergency Medical Services',
  specialization: ['First Aid', 'CPR', 'Emergency Response'],
  availability: true,
  currentLocation: {
    latitude: 14.5995,
    longitude: 120.9842,
    address: 'Manila, Philippines',
  },
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const handleLogout = () => {
    // TODO: Implement actual logout
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {mockUser.firstName} {mockUser.lastName}
          </Text>
          <Text style={styles.role}>{mockUser.role.toUpperCase()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.info}>Email: {mockUser.email}</Text>
          <Text style={styles.info}>Phone: {mockUser.phoneNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Information</Text>
          <Text style={styles.info}>Department: {mockProfile.department}</Text>
          <Text style={styles.info}>
            Specializations: {mockProfile.specialization.join(', ')}
          </Text>
          <Text style={styles.info}>
            Status: {mockProfile.availability ? 'Available' : 'Unavailable'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Location</Text>
          <Text style={styles.info}>{mockProfile.currentLocation?.address}</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007AFF',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 