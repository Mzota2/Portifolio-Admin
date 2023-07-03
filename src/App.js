import Routes from "./Routes";
import NavHeader from "./Components/NavHeader/NavHeader";
import 'bootstrap/dist/css/bootstrap.css'
import './Components/AboutTab/AboutTab.css'
function App() {
  return (
    <div className="App">
      <NavHeader/>
      <Routes/>
    </div>
  );
}

export default App;
