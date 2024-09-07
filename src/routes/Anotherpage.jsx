import { Link } from 'react-router-dom'
import './AnotherPage.css';

export default function Anotherpage() {
    return (
        <>
            <div className='container'>
                <span>Another page</span>
                <span>setup through react-router-dom</span>
                <Link to={"/"} className='link'>Go back to home page</Link>
            </div>
        </>
    )
}
