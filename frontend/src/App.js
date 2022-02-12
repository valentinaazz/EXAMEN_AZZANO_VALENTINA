import {BrowserRouter,Route,Routes} from 'react-router-dom';
import PaginaPrincipala from "./components/PaginaPrincipala";
import Editare from './components/Editare';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipala/>}></Route>
        <Route path="/Edit/:id" element={<Editare/>}></Route>
      </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
