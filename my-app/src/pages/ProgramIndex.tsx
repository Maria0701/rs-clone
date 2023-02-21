import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Program from "../components/program/Program";
import Week from "../components/week/Week";
import {Wrapper} from "../components/wrappers/Wrapper";
import { getMe, getMemoisedWeek } from "../features/auth/authSlice";
import BodyIndex from "../ui/BodyIndex";
import { Loader } from "../ui/Loader";
import ProgramChooser from "../ui/ProgramChooser";

export function ProgramsIndex() {
    const userFull = useAppSelector((state) => state.auth.me);
    const dispatch = useAppDispatch();
    const weekNumber = useAppSelector(getMemoisedWeek);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const isSuccess = useAppSelector((state) => state.auth.isSuccess)
    useEffect(() => {
        dispatch(getMe());        
    }, []);


    return (
        <Wrapper>
            <div className='index'>
                <div className="index-top">
                    <div className="week-number">
                        {
                            isLoading 
                            ?   <Loader />
                            :   <>
                                    <p className="week-number__text">Week №</p>
                                    <div className="week-number__number">{weekNumber}</div>
                                </> 
                        }                    
                    </div>
                    <Week />
                </div>
                <div className="program">
                    {
                        isLoading 
                        ? <Loader />
                        : <Program programId={userFull?.program_id!} />
                    }
                </div>
                    {
                        isLoading 
                        ? <Loader />
                        : <BodyIndex  />
                    }
                <ProgramChooser />
            </div>
        </Wrapper>
    );
};