import React from 'react'
import { SvgElt } from '../../ui/SvgElt'

const completedExample = {
    date: '01-02-2023',
    program: 'Loose Weight',
    exercise: 'bird dog',
    preview: 'bird-dog.jpg',
    time: '44 s',
    user: '',
}

export default function CompletedBlock() {
  return (
    <div className='completed-block'>
        <h1 className='h1'>Exercises completed on</h1>
        <div className='completed-items'>
            <div className='completed-item'>
                <div className='completed-item__img'>
                    <img src={`${process.env.PUBLIC_URL}/img/${completedExample.preview}`} alt={`${completedExample.exercise}`}/>
                </div>
                <div className='completed-item__content'>                    
                    <div className='completed-item__name'>{completedExample.exercise}</div>
                    <time className='completed-item__date' dateTime={`${completedExample.date}`}>
                        <SvgElt width={16} height={16} name={'calendar'} /> 
                        {completedExample.date}</time>
                    <div className='completed-item__time'>{completedExample.time}</div>
                    <a className='completed-item__link' href="#">Повторить</a>
                </div>
            </div>
            <div className='completed-item'>
                <div className='completed-item__img'>
                    <img src={`${process.env.PUBLIC_URL}/img/${completedExample.preview}`} alt={`${completedExample.exercise}`}/>
                </div>
                <div className='completed-item__content'>
                    <time  className='completed-item__date' dateTime={`${completedExample.date}`}>{completedExample.date}</time>
                    <div className='completed-item__name'>{completedExample.exercise}</div>
                    <div className='completed-item__time'>{completedExample.time}</div>
                    <a className='completed-item__link' href="#">Повторить</a>
                </div>
            </div>
        </div>
    </div>
  )
}
