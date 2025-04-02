import { useState, useEffect } from 'react';
import { useAppState } from './useAppState';

export const useDashboard = () => {
    const { userData, activeUser } = useAppState();
    const [createBoxStatus, setCreateBoxStatus] = useState(false);
    const [showPrevRecord, setShowPrevRecord] = useState(false);
    const [activeHabitData, setActiveHabitData] = useState(null);
    const [settingsBox, setSettingsBox] = useState(false);
    const [statsBox, setStatsBox] = useState(false);

    return {
        userData,
        activeUser,
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