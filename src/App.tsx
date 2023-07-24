import AuthLayout  from './components/authLayout/authLayout';
import './App.css';
import "./utilities/Langugae";
import withErrorHandling from './components/common/Errors/withErrorHandling';


const AppWithFallback = withErrorHandling(AuthLayout);

function App() {
  return (
    <div className="App">
      <AuthLayout />
    </div>
  );
}

export default App;
