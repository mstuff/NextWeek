import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScheduleEntriesOverviewPage from "./pages/ScheduleEntriesOverviewPage";
import useScheduleEntries from "./hooks/useScheduleEntries";


export default function App() {

    const {scheduleEntries, addScheduleEntry} = useScheduleEntries();


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/overview'}
                           element={<ScheduleEntriesOverviewPage scheduleEntries={scheduleEntries}
                                                                 addScheduleEntry={addScheduleEntry}/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

