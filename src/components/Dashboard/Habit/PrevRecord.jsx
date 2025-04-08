import { useAppState } from "../../../hooks/useAppState";
import PrevData from "./PrevData";

const PrevRecord = ({ setShowPrevRecord, activeHabitData }) => {
  const { userData, activeUser } = useAppState();

  if (!activeHabitData || activeHabitData.length === 0) return null;

  const indexOfHabit = userData.habitData.findIndex(
    habit => habit.id === activeHabitData[0].id
  );

  const deleteHabit = () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      const updatedData = userData.habitData.filter(
        habit => habit.id !== activeHabitData[0].id
      );
      const updatedUser = { ...userData, habitData: updatedData };
      activeUser(updatedUser);
      setShowPrevRecord(false);
    }
  };

  const previousRecords = userData.habitData[indexOfHabit]?.prevRecord?.slice(1) || [];

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-20 p-10">
      <div className="p-5 relative bg-[rgb(5,5,5)] rounded-2xl max-w-[700px] w-full text-white">
        <h1 className="text-2xl font-bold mb-2">{activeHabitData[0].habitName}</h1>
        <h3 className="text-start text-lg mb-2">Previous Records</h3>

        <div className="flex gap-5 flex-wrap mt-2.5 max-h-[500px] overflow-y-scroll pr-2">
          {previousRecords.length > 0 ? (
            previousRecords.map((record, index) => (
              <PrevData
                key={index}
                record={record}
                index={index + 1} // since we sliced from index 1
                indexOfHabit={indexOfHabit}
                setShowPrevRecord={setShowPrevRecord}
              />
            ))
          ) : (
            <p className="text-sm">No previous records found.</p>
          )}
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
