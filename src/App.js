import './App.css';
import Homepage from './Components/Homepage';
import Questionpage from './Components/Questionpage'
import Result from './Components/Result';
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
<>
<Routes>

<Route path='/' element={<Homepage/>}/>

<Route path='/:name/:category/:value' element={<Questionpage/>}/>

<Route path='/result/:name/:score/:incorrect/:attempted/:timetaken/:category/:value' element={<Result/>}/>

</Routes>
</>
  );
}

export default App;
