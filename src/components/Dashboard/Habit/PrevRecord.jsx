import { useAppState } from "../../../../hooks/useAppState.jsx";
import PrevData from "./prevData.jsx";


const PrevRecord = ({ setShowPrevRecord, activeHabitData }) => {
  const { userData, activeUser } = useAppState();

  const deleteHabit = () => {
    const updatedData = userData.habitData.filter(habit => habit.id !== activeHabitData[0].id);
    const updatedUser = { ...userData, habitData: updatedData };
    activeUser(updatedUser);
    setShowPrevRecord(false);
  };

  const indexOfHabit = userData.habitData.findIndex(habit => habit.id === activeHabitData[0].id);

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-20 p-10">
      <div className="p-5 relative bg-[rgb(5,5,5)] rounded-2xl max-w-[700px]">
        <h1>{activeHabitData[0].habitName}</h1>
        <h3 className="text-start">Previous Records</h3>
        
        <div className="flex gap-5 flex-wrap mt-2.5 max-h-[500px] overflow-scroll">
          {userData.habitData[indexOfHabit].prevRecord.map((record, index) => (
            index > 0 && (
              <PrevData
                key={index} 
                record={record} 
                index={index} 
                indexOfHabit={indexOfHabit}
                setShowPrevRecord={setShowPrevRecord}
              />
            )
          ))}
        </div>

        <button 
          className="mt-5 outline-none border-none bg-[rgb(255,46,46)] text-white py-2.5 px-5 rounded-[40px] cursor-pointer"
          onClick={deleteHabit}
        >
          Delete habit
        </button>
      </div>
    </div>
  );
};

export default PrevRecord;