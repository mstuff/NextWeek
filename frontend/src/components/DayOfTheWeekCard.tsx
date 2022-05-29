import "./DayOfTheWeekCard.css"

type DayOfTheWeekProps = {
    selectedDay: Date;
}

export default function DayOfTheWeekCard ({selectedDay}: DayOfTheWeekProps){

    return <div className={"day-of-the-week-card"}>
        {new Date(selectedDay).toLocaleDateString()}
    </div>

}