import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScheduleEntriesOverviewPage from "./pages/ScheduleEntriesOverviewPage";
import useScheduleEntries from "./hooks/useScheduleEntries";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";


export default function App() {

    const {scheduleEntries, addScheduleEntry} = useScheduleEntries();


    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Header/>
                    <NavigationBar/>
                <Routes>
                    <Route path={'/overview'}
                           element={<ScheduleEntriesOverviewPage scheduleEntries={scheduleEntries}
                                                                 addScheduleEntry={addScheduleEntry}/>}
                    />
                </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

