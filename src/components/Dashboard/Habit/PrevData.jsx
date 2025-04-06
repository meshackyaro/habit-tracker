import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppState } from "../../../hooks/useAppState";

const PrevData = ({ record, index, indexOfHabit, setShowPrevRecord }) => {
  const { userData, activeUser } = useAppState();

  const handlePrevDayStatus = (value) => {
    const updatedUser = { ...userData };
    updatedUser.habitData[indexOfHabit].prevRecord[index].status = value;
    activeUser(updatedUser);
  };

  return (
    <div className="p-5 bg-[rgb(39,39,39)] rounded-lg flex flex-col items-start gap-2.5 min-w-[30%] flex-1">
      <span
        className="absolute -right-2.5 -top-2.5 bg-[rgb(5,5,5)] h-6 w-6 rounded-full border border-greenyellow flex items-center justify-center cursor-pointer"
        onClick={() => setShowPrevRecord(false)}
      >
        <FontAwesomeIcon icon={faXmark} size="xs" />
      </span>

      <h2>{record.date}</h2>

      <div className="selector-container">
        <label className="mr-2.5">Status:</label>
        <Select
          defaultValue={record.status}
          onChange={handlePrevDayStatus}
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

export default PrevData;