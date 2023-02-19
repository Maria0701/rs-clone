import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Program from "../components/program/Program";
import Week from "../components/week/Week";
import {Wrapper} from "../components/wrappers/Wrapper";
import { getMe } from "../features/auth/authSlice";
import BodyIndex from "../ui/BodyIndex";
import { Loader } from "../ui/Loader";
import { getWeekNumber } from "../utils/utils";

export function ProgramsIndex() {
    const userFull = useAppSelector((state) => state.auth.me);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading)

    useEffect(() => {
        dispatch(getMe())
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
                                <div className="week-number__number">{getWeekNumber(userFull?.registrationDate!)}</div>
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
                        : <BodyIndex weight={userFull?.weight![userFull?.weight!.length - 1].value!} height={userFull?.height!} />
                    }
                
                <p>Эта страница должна быть стартовой для зарегистрированного человека</p>
            </div>
        </Wrapper>
    );
};