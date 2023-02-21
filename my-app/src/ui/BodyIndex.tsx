import { useAppSelector } from "../app/hooks"
import { WEIGHT_INDEXES } from "../consts/const"
import { getMemoizedBodyIndex } from "../features/auth/authSlice"
import './body-index.css'

interface IBodyIndex {

}

export default function BodyIndex({}: IBodyIndex) {
    const bodyIndex = useAppSelector(getMemoizedBodyIndex);
    // const getPercent
  return (
    <div className='wight-index'>
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
        <div className='weight-index__actual'>{bodyIndex}</div>        
    </div>
  )
}
