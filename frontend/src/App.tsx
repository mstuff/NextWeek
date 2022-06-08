import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import SchedulePage from "./pages/SchedulePage";
import useScheduleEntries from "./hooks/useScheduleEntries";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import AllEntriesOverviewPage from "./pages/AllEntriesOverviewPage";


export default function App() {

    const {scheduleEntries, addScheduleEntry, deleteScheduleEntry} = useScheduleEntries();

    return (
        <div className="App">
            <div>
                <Header/>
                <NavigationBar/>
                <Routes>
                    <Route path={'/overview'}
                           element={<AllEntriesOverviewPage scheduleEntries={scheduleEntries}
                                                            addScheduleEntry={addScheduleEntry}
                                                            deleteScheduleEntry={deleteScheduleEntry}/>}
                    />
                    <Route path={'/schedule'}
                           element={<SchedulePage scheduleEntries={scheduleEntries}
                                                  addScheduleEntry={addScheduleEntry}
                                                  deleteScheduleEntry={deleteScheduleEntry}/>}
                    />
                </Routes>
            </div>
        </div>
    );
}
