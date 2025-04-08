 import portal from '../page/portal.jpg'
 import './Home.css'
 import { Link } from 'react-router-dom'
 export default function Home(){
    return(
        <>
        <div>
         <img src={portal} alt="" />
         <button><Link to="/product"></Link>Add your product</button>
        </div>
        
        </>
    )
}