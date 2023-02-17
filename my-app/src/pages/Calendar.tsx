import { CalendarBlock } from "../components/calendar/CalendarBlock";
import CompletedBlock from "../components/calendar/CompletedBlock";
import { Wrapper } from "../components/wrappers/Wrapper";


export function Calendar() {    

    return (
        <Wrapper>
            <div className="calendar-wrapper">
                <CalendarBlock />
                <CompletedBlock />
            </div>
        </Wrapper>
    );
};