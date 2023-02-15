import React from 'react'
import sprite from '../svg/sprite.svg'

export const SvgElt:React.FC<React.SVGProps<SVGSVGElement>> = (props: React.SVGProps<SVGSVGElement>) => {
    return (  
      <svg width={props.width} height={props.height}>  
        <use href={`${sprite}#${props.name}`} />  
     </svg>  
    )  
};