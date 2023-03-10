import { Link } from 'react-router-dom';
import { MENU_ARRAY } from "../../consts/const"
import { SvgElt } from '../../ui/SvgElt';


export function Footer() {
  return (
    <footer className="footer">
        <div className='container'>
            <div className='footer__line'>
                {MENU_ARRAY.map((item) => (
                    <Link to={item.link} className="footer__link" key={item.link}>
                        <SvgElt width={40} height={40} name={item.icon} />
                    </Link>
                ))}
            </div>
        </div>
    </footer>
  )
}
