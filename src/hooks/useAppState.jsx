import { useState, useEffect } from 'react';

export const useAppState = () => {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem('habitTrackerState');
    return savedState 
      ? JSON.parse(savedState) 
      : {
          userData: null,
          createBox: false,
          prevBox: false,
          activeHabit: null,
          habitData: []
        };
  });

  useEffect(() => {
    localStorage.setItem('habitTrackerState', JSON.stringify(state));
  }, [state]);

  return {
    // State values
    userData: state.userData,
    createBox: state.createBox,
    prevBox: state.prevBox,
    activeHabit: state.activeHabit,
    habitData: state.habitData,
    
    // Action functions
    activeUser: (user) => setState(prev => ({
      ...prev,
      userData: user,
      habitData: user?.habitData || []
    })),
    createBox: (val) => setState(prev => ({
      ...prev,
      createBox: val
    })),
    prevBox: (val) => setState(prev => ({
      ...prev,
      prevBox: val
    })),
    activeHabitData: (val) => setState(prev => ({
      ...prev,
      activeHabit: val
    })),
    updateHabit: (updatedHabit) => setState(prev => {
      if (!prev.userData) return prev;
      
      const updatedHabitData = prev.habitData.map(habit => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      );

      return {
        ...prev,
        habitData: updatedHabitData,
        userData: {
          ...prev.userData,
          habitData: updatedHabitData
        }
      };
    }),
    deleteHabit: (habitId) => setState(prev => {
      if (!prev.userData) return prev;
      
      const filteredHabits = prev.habitData.filter(habit => habit.id !== habitId);
      
      return {
        ...prev,
        habitData: filteredHabits,
        userData: {
          ...prev.userData,
          habitData: filteredHabits
        }
      };
    })
  };
};