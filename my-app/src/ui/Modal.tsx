import React from 'react'
import { Portal } from './Portal'

interface IModal {
    isOpen: boolean,
    closeHandler: () => void,
    children: React.ReactNode
}

export default function Modal({isOpen, closeHandler , children}: IModal) {

    if (!isOpen) {
        return null;
    }
    
    return (
        <Portal>
            <div className='overlay' onClick={closeHandler}></div>
            <div className='popup__content'>
                { children }
                
            </div>
        </Portal>
  )
}
