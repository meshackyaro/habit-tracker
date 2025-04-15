import React from 'react';
import { useState, useEffect } from 'react';

export const useApphook = () => {

    const [ldata, setLdata] = useState(() => {
        const currentState = localStorage.getItem('habitTrackerState');
        return currentState ? JSON.parse(currentState) : {
            user: null,
            habit: [],
        };
   
    });

    useEffect(() => {
        localStorage.setItem('habitTrackerState', JSON.stringify(ldata));
    }, [ldata]);
    return [ldata, setLdata];
}
