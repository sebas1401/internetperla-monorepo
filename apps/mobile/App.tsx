import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

type RootStackParamList = {
  Home: undefined;
  Attendance: undefined;
  Tasks: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const extras = Constants.expoConfig?.extra as { apiBase?: string } | undefined;
const API_BASE = extras?.apiBase ?? 'http://localhost:3000/api/v1';

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>InternetPerla Mobile</Text>
      <Button title="Attendance" onPress={() => navigation.navigate('Attendance')} />
      <Button title="Tasks" onPress={() => navigation.navigate('Tasks')} />
    </View>
  );
}

function AttendanceScreen() {
  type HealthResponse = { status: string } & Record<string, unknown>;

  const [status, setStatus] = React.useState<HealthResponse | null>(null);
  const ping = async () => {
    try {
      const res = await fetch(`${API_BASE}/attendance/health`);
      const json = await res.json();
      setStatus(json);
    } catch (_error) {
      setStatus({ status: 'unavailable' });
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text>Attendance</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity onPress={ping} style={{ backgroundColor: '#0ea5e9', padding: 10, borderRadius: 6 }}>
          <Text style={{ color: 'white' }}>IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ping} style={{ backgroundColor: '#ef4444', padding: 10, borderRadius: 6 }}>
          <Text style={{ color: 'white' }}>OUT</Text>
        </TouchableOpacity>
      </View>
      <Text>{status ? JSON.stringify(status) : 'Presiona IN/OUT para verificar salud'}</Text>
    </View>
  );
}

function TasksScreen() {
  const data = React.useMemo(() =>
    Array.from({ length: 8 }).map((_, i) => ({ id: String(i + 1), title: `Tarea #${i + 1}` })),
  []);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>Tasks</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, marginBottom: 8 }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

