import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import SchedulePage from "./pages/SchedulePage";
import useScheduleEntries from "./hooks/useScheduleEntries";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import AllEntriesOverviewPage from "./pages/AllEntriesOverviewPage";
import {ToastContainer} from "react-toastify";


export default function App() {

    const {scheduleEntries, addScheduleEntry, saveUpdatedEntry, deleteScheduleEntry} = useScheduleEntries();

    return (
        <div className="App">
            <ToastContainer autoClose={9000}
                            hideProgressBar={true}
                            position={"top-center"}/>
            <div>
                <Header/>
                <NavigationBar/>
                <Routes>
                    <Route path={'/overview'}
                           element={<AllEntriesOverviewPage scheduleEntries={scheduleEntries}
                                                            addScheduleEntry={addScheduleEntry}
                                                            saveUpdatedEntry={saveUpdatedEntry}
                                                            deleteScheduleEntry={deleteScheduleEntry}/>}
                    />
                    <Route path={'/schedule'}
                           element={<SchedulePage scheduleEntries={scheduleEntries}
                                                  addScheduleEntry={addScheduleEntry}
                                                  saveUpdatedEntry={saveUpdatedEntry}
                                                  deleteScheduleEntry={deleteScheduleEntry}/>}
                    />
                </Routes>
            </div>
        </div>
    );
}
