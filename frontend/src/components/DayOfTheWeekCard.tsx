import "./DayOfTheWeekCard.css"

type DayOfTheWeekProps = {
    selectedDay: Date;
}

export default function DayOfTheWeekCard({selectedDay}: DayOfTheWeekProps) {

    return (
        <div className={"day-of-the-week-card"}>
            <div>
                <h1 className={"day-of-the-week-h1"}>
                    {new Date(selectedDay)
                        .toLocaleDateString("en-US", {weekday: "short"})}
                </h1>
                <p className={"day-of-the-week-p"}>
                    {new Date(selectedDay)
                        .toLocaleDateString('de-DE', {day: "2-digit", month: "2-digit", year: "numeric"})}
                </p>
            </div>
            <div className={"calender-board"}>
                Place for scheduleEntries
            </div>
        </div>
    )
}