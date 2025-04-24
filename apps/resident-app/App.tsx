import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ReportEmergencyScreen from './src/screens/ReportEmergencyScreen';
import EmergencyDetailsScreen from './src/screens/EmergencyDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SafetyTipsScreen from './src/screens/SafetyTipsScreen';
import EmergencyContactsScreen from './src/screens/EmergencyContactsScreen';

// Import types
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
            },
            headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Emergency Services' }}
          />
          <Stack.Screen 
            name="ReportEmergency" 
            component={ReportEmergencyScreen}
            options={{ title: 'Report Emergency' }}
          />
          <Stack.Screen 
            name="EmergencyDetails" 
            component={EmergencyDetailsScreen}
            options={{ title: 'Emergency Details' }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'My Profile' }}
          />
          <Stack.Screen 
            name="SafetyTips" 
            component={SafetyTipsScreen}
            options={{ title: 'Safety Tips' }}
          />
          <Stack.Screen 
            name="EmergencyContacts" 
            component={EmergencyContactsScreen}
            options={{ title: 'Emergency Contacts' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaProvider>
  );
} 