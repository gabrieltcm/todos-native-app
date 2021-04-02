import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList, //A Better performance when handling long list compared to ScrollView, flatlist only renders what's required. Scrollview renders everything
} from "react-native";

//Custom Component
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

const App = () => {
  //States
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false); //Handles the Modal view

  // Functions
  const addGoalHandler = (goalTitle) => {
    if (goalTitle.length === 0) {
      return null;
    }
    setCourseGoals((latestGoalState) => [
      ...latestGoalState,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };

  const deleteGoalHandler = (goalId) => {
    setCourseGoals((latestState) => {
      return latestState.filter((everyGoal) => everyGoal.id !== goalId);
    });
  };

  const cancelGoalHandler = () => {
    setIsAddMode(false);
  };

  return (
    //The <View> is like <div>, it allows you to group other components together, structure them
    //(i.e. provide a layout) and (optionally) add some container styling
    <View style={styles.mainContainer}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      {/* Goal Input */}
      <GoalInput
        modalVisibility={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalHandler}
      />
      {/* Goal Item List */}
      <FlatList
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            onDelete={() => deleteGoalHandler(itemData.item.id)}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
};

// CSS
// In React Native we style our application using Javascript...
// Therefore no fancy scss, below is one of the way we style in React Native
// Another option will be Inline-styles (NOT recommended)
// The StyleSheet gives us validation checks and performance improvements over  (const styles = {})
const styles = StyleSheet.create({
  mainContainer: {
    padding: 50,
  },
});

export default App;
