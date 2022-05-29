import DayOfTheWeekCard from "./DayOfTheWeekCard";
import "./WeekBoard.css"


export default function WeekBoard() {

    return (<div className={"week-board-outer"}>
            <div className={"week-board-inner"}>
            <DayOfTheWeekCard/>
            <DayOfTheWeekCard/>
            <DayOfTheWeekCard/>
            <DayOfTheWeekCard/>
            <DayOfTheWeekCard/>
            <DayOfTheWeekCard/>
            <DayOfTheWeekCard/>
            </div>
        </div>
    )

}