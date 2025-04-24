import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type EmergencyContactsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EmergencyContacts'>;
};

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
}

// Temporary mock data
const mockContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Juan Dela Cruz',
    relationship: 'Father',
    phoneNumber: '+63 912 345 6789',
  },
  {
    id: '2',
    name: 'Maria Santos',
    relationship: 'Mother',
    phoneNumber: '+63 917 123 4567',
  },
];

export default function EmergencyContactsScreen({ navigation }: EmergencyContactsScreenProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>(mockContacts);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phoneNumber: '',
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.relationship || !newContact.phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact,
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: '', relationship: '', phoneNumber: '' });
    setIsAdding(false);
  };

  const handleDeleteContact = (id: string) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContacts(contacts.filter(contact => contact.id !== id));
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {contacts.map(contact => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDetails}>{contact.relationship}</Text>
              <Text style={styles.contactDetails}>{contact.phoneNumber}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteContact(contact.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}

        {isAdding ? (
          <View style={styles.addForm}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newContact.name}
              onChangeText={(text) => setNewContact({ ...newContact, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Relationship"
              value={newContact.relationship}
              onChangeText={(text) => setNewContact({ ...newContact, relationship: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={newContact.phoneNumber}
              onChangeText={(text) => setNewContact({ ...newContact, phoneNumber: text })}
              keyboardType="phone-pad"
            />
            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setIsAdding(false);
                  setNewContact({ name: '', relationship: '', phoneNumber: '' });
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleAddContact}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAdding(true)}
          >
            <Text style={styles.addButtonText}>+ Add Emergency Contact</Text>
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
  content: {
    padding: 16,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addForm: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 