import Home from "./components/Home";
import CustomCalculatorContext from "./context/CustomCalculatorContext";

function App() {
  return (
    <>
      <CustomCalculatorContext>
          <Home/>
      </CustomCalculatorContext>
    </>
  );
}

export default App;
