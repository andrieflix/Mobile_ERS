import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type SafetyTipsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SafetyTips'>;
};

interface SafetyTip {
  title: string;
  category: string;
  content: string[];
}

const safetyTips: SafetyTip[] = [
  {
    title: 'Earthquake Safety',
    category: 'Natural Disasters',
    content: [
      'Drop, Cover, and Hold On',
      'Stay away from windows and heavy furniture',
      'If indoors, stay inside until shaking stops',
      'If outdoors, move to an open area away from buildings',
      'Have an emergency kit ready',
    ],
  },
  {
    title: 'Fire Safety',
    category: 'Fire Emergency',
    content: [
      'Install smoke detectors and check batteries regularly',
      'Create and practice a fire escape plan',
      'Keep a fire extinguisher accessible',
      'Never smoke in bed',
      'Keep flammable items away from heat sources',
    ],
  },
  {
    title: 'Medical Emergency',
    category: 'Health',
    content: [
      'Learn basic first aid and CPR',
      'Keep a first aid kit at home and in your car',
      'Know your family\'s medical history',
      'Keep emergency contact numbers handy',
      'Know the location of nearest hospitals',
    ],
  },
  {
    title: 'Flood Safety',
    category: 'Natural Disasters',
    content: [
      'Monitor local weather updates',
      'Move to higher ground when advised',
      'Never drive through flooded roads',
      'Keep important documents in waterproof containers',
      'Have an evacuation plan ready',
    ],
  },
];

export default function SafetyTipsScreen({ navigation }: SafetyTipsScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {safetyTips.map((tip, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{tip.title}</Text>
              <Text style={styles.cardCategory}>{tip.category}</Text>
            </View>
            <View style={styles.cardContent}>
              {tip.content.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.tipItem}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 14,
    color: '#666',
  },
  cardContent: {
    padding: 16,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#007AFF',
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
}); 