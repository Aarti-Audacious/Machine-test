import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Mainrouting from './Routing';
import Cookies from 'js-cookie'
const App =()=> {
  Cookies.set('foo', 'bar')
  return (
    <div className="App">
      <Mainrouting />
    
    </div>
  );
}

export default App;
