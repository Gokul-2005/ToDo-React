import React from 'react'
import {Link,useLocation} from 'react-router-dom';
export default function NavBar() {

    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split('/');
    console.log(splitLocation);
  return (
    <ul>
      <li><Link to={"Home"}>Home</Link> </li>
      <li><Link to={"page2"}>page2</Link></li>
      <li><Link to={'page3'}>Page3</Link></li>
      <li><Link to={'page4'}>Page4</Link></li>
    </ul>
  )
}
