import {AuthLayout} from './components/authLayout/authLayout';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
