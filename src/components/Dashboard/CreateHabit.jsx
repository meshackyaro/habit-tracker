import { useState } from "react";
import { useAppState } from "../../hooks/useAppState";
import waterIcon from "../../assets/images/drop.png";
import healthIcon from "../../assets/images/healthcare.png"
import gameIcon from "../../assets/images/joystick.png";
import workingIcon from '../../assets/images/working.png';
import sleepIcon from '../../assets/images/sleep.png';
import exerciseIcon from '../../assets/images/running.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CreateHabit = ({ setCreateBoxStatus }) => {
  const { userData, activeUser, updateHabit } = useAppState(); // Added updateHabit

  const [habitName, setHabitName] = useState("");
  const [habitCount, setHabitCount] = useState(0);
  const [habitIcon, setHabitIcon] = useState(sleepIcon);

  const handleFormSubmission = (e) => {
    e.preventDefault();

    if (!habitName.trim()) {
      console.error("Habit name cannot be empty");
      return;
    }

    const newHabit = {
      id: Date.now(),
      habitName,
      habitCount: Math.max(0, habitCount), // Ensure non-negative
      habitIcon,
      countCompleted: 0,
      prevRecord: Array(7).fill(0).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          countCompleted: 0,
          status: "None",
          date: getFormattedDate(date).formatted
        };
      })
    };


    console.log("Creating new habit:", newHabit); // Debug log

    const updatedUser = {
      ...userData,
      habitData: [...(userData?.habitData || []), newHabit]
    };

    console.log("Updated user data:", updatedUser); // Debug log
    const newData = JSON.stringify({ userData: updatedUser })
    localStorage.setItem('habitTrackerState', newData)
    //activeUser(updatedUser);
    setCreateBoxStatus(false);

    // Reset form
    setHabitName("");
    setHabitCount(0);
    setHabitIcon(sleepIcon);
  };

  function getFormattedDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return {
      formatted: `${month} ${day}, ${year}`,
      day,
      month,
      year
    };
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-20">
      <div className="max-w-[350px] p-5 relative bg-[rgb(5,5,5)] rounded-2xl">
        <h1 className="text-xl mb-5 items-center">Create Habit</h1>

        <span
          className="absolute -right-2.5 -top-2.5 bg-[rgb(5,5,5)] h-6 w-6 rounded-full border border-yellow-400 flex items-center justify-center cursor-pointer"
          onClick={() => setCreateBoxStatus(false)}
        >
          <FontAwesomeIcon icon={faXmark} size="xs" />
        </span>

        <form className="flex flex-col gap-2.5 text-lg font-medium" onSubmit={handleFormSubmission}>
          <div className="flex gap-2.5 items-center">
            <label>Habit Name:</label>
            <input
              type="text"
              className="h-10 px-2.5 rounded-lg border-none outline-none bg-[rgb(35,35,35)] text-gray-300 flex-1"
              required
              onChange={(e) => setHabitName(e.target.value)}
            />
          </div>

          <div className="flex gap-2.5 items-center">
            <label>Habit Count:</label>
            <input
              type="number"
              min={0}
              className="h-10 px-2.5 rounded-lg border-none outline-none bg-[rgb(35,35,35)] text-gray-300 flex-1"
              required
              onChange={(e) => setHabitCount(Number(e.target.value))}
            />
          </div>

          <div>
            <label>Select Icon: </label>
            <div className="flex flex-wrap justify-center gap-5 mt-2.5">
              {[gameIcon, healthIcon, waterIcon, exerciseIcon, workingIcon, sleepIcon].map((icon, i) => (
                <div
                  key={i}
                  className="h-[65px] w-[65px] bg-[rgb(36,36,36)] rounded-full flex items-center justify-center cursor-pointer hover:outline hover:outline-greenyellow"
                  onClick={() => setHabitIcon(icon)}
                >
                  <img src={icon} alt="" className="h-4/5 w-4/5 object-cover" />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-[150px] h-8 mx-auto border-none rounded-3xl bg-green-300"
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHabit;