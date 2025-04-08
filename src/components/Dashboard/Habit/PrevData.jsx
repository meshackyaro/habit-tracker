import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppState } from "../../../hooks/useAppState";

const PrevData = ({ record, index, indexOfHabit, setShowPrevRecord }) => {
  const { userData, activeUser } = useAppState();

  const handlePrevDayStatus = (value) => {
    if (!userData?.habitData?.[indexOfHabit]?.prevRecord?.[index]) return;

    const updatedUser = { ...userData };
    updatedUser.habitData[indexOfHabit].prevRecord[index].status = value;
    activeUser(updatedUser);
  };

  return (
    <div className="relative p-5 bg-[rgb(39,39,39)] rounded-lg flex flex-col items-start gap-2.5 min-w-[30%] flex-1">
      <span
        className="absolute -right-2.5 -top-2.5 bg-[rgb(5,5,5)] h-6 w-6 rounded-full border border-greenyellow flex items-center justify-center cursor-pointer hover:bg-green-700"
        onClick={() => setShowPrevRecord(false)}
        title="Close"
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faXmark} size="xs" />
      </span>

      <h2 className="text-white">{record.date}</h2>

      <div className="selector-container text-white">
        <label className="mr-2.5">Status:</label>
        <Select
          value={record.status}
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
