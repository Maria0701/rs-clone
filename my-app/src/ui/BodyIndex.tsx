import { useEffect, useState } from 'react';
import { useAppSelector } from "../app/hooks"
import { WEIGHT_INDEXES } from "../consts/const"
import { getMemoizedBodyIndex } from "../features/auth/authSlice"
import { getPercentage } from "../utils/utils";
import './body-index.css'


export default function BodyIndex() {
    const [percents, setPercents] = useState(0)
    const bodyIndex = useAppSelector(getMemoizedBodyIndex);
    
    useEffect(() => {
        setPercents(getPercentage( WEIGHT_INDEXES[WEIGHT_INDEXES.length - 1].max, parseInt(bodyIndex)))
    }, [bodyIndex]);

    return (
        <div className='wight-index'>
            <h2 className='h2'>Your Body index</h2>
            <div className='wight-index__wrapper'>
                <div className='weight-index__marker'>
                    {
                        WEIGHT_INDEXES.map((item, index) => (
                            <span className="weight-index__item" key={index}>
                                <span className="weight-index__min">{item.min}</span>
                                <span className="weight-index__max">{item.max}</span>
                            </span>
                        ))
                    }
                </div>
                <div className='weight-index__actual' style={{ left: `${percents}%` }}>{bodyIndex}</div>        
            </div>
        </div>
    )
}
