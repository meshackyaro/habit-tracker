import { useEffect, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Progress, Select } from "antd";
import { useAppState } from "../../hooks/useAppState";

const Habit = ({ habit, index, setShowPrevRecord, setActiveHabitData }) => {
  const { userData, activeUser } = useAppState();
  const [percent, setPercent] = useState(0);
  const [completedCount, setCompletedCount] = useState(habit.prevRecord[0].countCompleted);
  const [statusChange, setStatusChange] = useState(habit.prevRecord[0].status);

  const increase = () => {
    if (habit.habitCount === 0) {
      setStatusChange("Done");
      setPercent(100);
      return;
    }

    setCompletedCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount >= habit.habitCount) {
        setStatusChange("Done");
        setPercent(100);
        return habit.habitCount;
      }
      const newPercent = ((newCount / habit.habitCount) * 100).toFixed(2);
      setStatusChange("Not Done");
      setPercent(newPercent);
      return newCount;
    });
  };

  const decline = () => {
    if (habit.habitCount === 0) {
      setStatusChange("None");
      setPercent(0);
      return;
    }
    
    setCompletedCount((prevCount) => {
      const newCount = prevCount - 1;
      if (newCount <= 0) {
        setPercent(0);
        setStatusChange("None");
        return 0;
      }
      const newPercent = ((newCount / habit.habitCount) * 100).toFixed(2);
      setStatusChange("Not Done");
      setPercent(newPercent);
      return newCount;
    });
  };

  const showRecord = (id) => {
    const habitData = userData.habitData.filter(habit => habit.id === id);
    setActiveHabitData(habitData);
    setShowPrevRecord(true);
  };

  const handleStatusChange = (val) => {
    if (val === "Done") {
      setPercent(100);
      setCompletedCount(habit.habitCount);
    } else if (val === "None") {
      setPercent(0);
      setCompletedCount(0);
    } else {
      setStatusChange("Not Done");
    }
    setStatusChange(val);
  };

  useEffect(() => {
    if (userData) {
      const updatedUser = { ...userData };
      updatedUser.habitData[index].prevRecord[0].status = statusChange;
      updatedUser.habitData[index].prevRecord[0].countCompleted = completedCount;
      activeUser(updatedUser);
    }
  }, [statusChange, completedCount]);

  useEffect(() => {
    if (habit.prevRecord[0].status === "Done" || 
        (habit.habitCount === habit.prevRecord[0].countCompleted && habit.habitCount > 0)) {
      setPercent(100);
      setCompletedCount(habit.habitCount);
      setStatusChange("Done");
    } else if (habit.prevRecord[0].countCompleted > 0 && 
               habit.habitCount !== habit.prevRecord[0].countCompleted) {
      setPercent(((habit.prevRecord[0].countCompleted / habit.habitCount) * 100).toFixed(2));
      setStatusChange("Not Done");
    } else {
      setPercent(0);
      setCompletedCount(0);
      setStatusChange("None");
    }
  }, []);

  return (
    <div className="p-5 w-[220px] bg-black rounded-2xl flex flex-col gap-2.5">
      <div 
        className="p-5 rounded-2xl bg-[rgb(26,26,26)] transition-all duration-300 cursor-pointer border-b border-greenyellow hover:bg-[rgb(15,15,15)]"
        onClick={() => showRecord(habit.id)}
      >
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-[rgb(56,56,56)] flex items-center justify-center">
            <img src={habit.habitIcon} alt="" className="h-3/5 w-3/5 object-cover" />
          </div>
          <h4 className="text-lg">{habit.habitName}</h4>
        </div>

        <div className="mt-2.5 flex justify-center">
          <Progress 
            type="circle" 
            percent={percent} 
            trailColor="rgba(228,228,228,0.308)"
            strokeColor="#FFFFFF"
          />
        </div>
      </div>

      <div className="h-10 w-full flex">
        <button 
          className="flex-1 border-0 text-white bg-[rgb(37,37,37)] cursor-pointer transition-all duration-300 rounded-l-[50px] hover:bg-[rgb(53,53,53)] hover:text-red-500"
          onClick={decline}
        >
          <MinusOutlined />
        </button>
        <button 
          className="flex-1 border-0 text-white bg-[rgb(37,37,37)] cursor-pointer transition-all duration-300 rounded-r-[50px] hover:bg-[rgb(53,53,53)] hover:text-greenyellow"
          onClick={increase}
        >
          <PlusOutlined />
        </button>
      </div>

      <div className="bg-[rgb(37,37,37)] rounded-[40px]">
        <Select
          className="w-full h-10"
          defaultValue={statusChange}
          onChange={handleStatusChange}
          options={[
            { value: "Done", label: "Done" },
            { value: "Not Done", label: "Not Done" },
            { value: "None", label: "None" },
          ]}
        />
      </div>
    </div>
  );
};

export default Habit;