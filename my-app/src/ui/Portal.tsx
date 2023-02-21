import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

const root = document.getElementById('portal')

export interface IPortalProps {
  className?: string;
  children?: ReactNode;
  element?: keyof JSX.IntrinsicElements
}

export const Portal: React.FC<IPortalProps> = ({className, children}) => {
  return root ? ReactDOM.createPortal(   
    <div>
       {children}      
    </div>,
    root
  ) : null
}

