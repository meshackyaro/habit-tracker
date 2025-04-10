import { useState, useEffect } from 'react';


export const useDashboard = () => {
    
    const [createBoxStatus, setCreateBoxStatus] = useState(false);
    const [showPrevRecord, setShowPrevRecord] = useState(false);
    const [activeHabitData, setActiveHabitData] = useState(null);
    const [settingsBox, setSettingsBox] = useState(false);
    const [statsBox, setStatsBox] = useState(false);

    return {
        createBoxStatus,
        setCreateBoxStatus,
        showPrevRecord,
        setShowPrevRecord,
        activeHabitData,
        setActiveHabitData,
        settingsBox,
        setSettingsBox,
        statsBox,
        setStatsBox
    };
};