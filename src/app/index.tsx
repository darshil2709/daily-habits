import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STORAGE_KEY = "@daily-habits/habits";

type Habit = {
  id: string;
  name: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Read 10 pages", completed: false },
    { id: "2", name: "Go for a walk", completed: false },
  ]);

  const [newHabit, setNewHabit] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadHabits() {
      try {
        const savedHabits = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedHabits !== null) {
          setHabits(JSON.parse(savedHabits) as Habit[]);
        }
      } catch (error) {
        console.error("Could not load habits:", error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadHabits();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    async function saveHabits() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
      } catch (error) {
        console.error("Could not save habits:", error);
      }
    }

    saveHabits();
  }, [habits, isLoaded]);

  const completedCount = habits.filter((habit) => habit.completed).length;

  function addHabit() {
    const name = newHabit.trim();

    if (name.length === 0) {
      return;
    }

    const habit: Habit = {
      id: Date.now().toString(),
      name: name,
      completed: false,
    };

    setHabits((currentHabits) => [habit, ...currentHabits]);
    setNewHabit("");
  }

  function toggleHabit(id: string) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit,
      ),
    );
  }

  function deleteHabit(id: string) {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== id),
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.eyebrow}>YOUR DAILY RESET</Text>
      <Text style={styles.title}>Small steps.</Text>
      <Text style={styles.title}>Strong habits.</Text>

      <View style={styles.progressCard}>
        <Text style={styles.progressNumber}>
          {completedCount} / {habits.length}
        </Text>
        <Text style={styles.progressLabel}>habits completed today</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a habit..."
          placeholderTextColor="#858585"
          value={newHabit}
          onChangeText={setNewHabit}
          onSubmitEditing={addHabit}
          returnKeyType="done"
        />
        <Pressable style={styles.addButton} onPress={addHabit}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>TODAY</Text>

      <FlatList
        data={habits}
        keyExtractor={(habit) => habit.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No habits yet. Add one above to get started.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.habitCard}>
            <Pressable
              style={styles.habitMain}
              onPress={() => toggleHabit(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxCompleted,
                ]}
              >
                {item.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <Text
                style={[
                  styles.habitName,
                  item.completed && styles.habitNameCompleted,
                ]}
              >
                {item.name}
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteHabit(item.id)}
              accessibilityLabel={`Delete ${item.name}`}
            >
              <Text style={styles.deleteText}>×</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F6F2",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  eyebrow: {
    color: "#77766F",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 16,
  },
  title: {
    color: "#20211E",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 40,
  },
  progressCard: {
    backgroundColor: "#20211E",
    borderRadius: 20,
    padding: 22,
    marginTop: 28,
    marginBottom: 20,
  },
  progressNumber: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },
  progressLabel: {
    color: "#D3D3CC",
    fontSize: 14,
    marginTop: 4,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E3DC",
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#526B52",
    borderRadius: 14,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#77766F",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  list: {
    gap: 10,
    paddingBottom: 24,
  },
  habitCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#EAE8E1",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 64,
    paddingHorizontal: 14,
  },
  habitMain: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 12,
    paddingVertical: 16,
  },
  checkbox: {
    alignItems: "center",
    borderColor: "#B9B8B0",
    borderRadius: 7,
    borderWidth: 1.5,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  checkboxCompleted: {
    backgroundColor: "#526B52",
    borderColor: "#526B52",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  habitName: {
    color: "#20211E",
    flex: 1,
    fontSize: 16,
  },
  habitNameCompleted: {
    color: "#858585",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  deleteText: {
    color: "#858585",
    fontSize: 26,
  },
  emptyText: {
    color: "#77766F",
    fontSize: 15,
    paddingVertical: 20,
  },
});
