import { createContext, useContext, useState } from "react";



//creating a context

const calculatorContext = createContext();


//using customer hook to get value from context
export function useValue()
{
    return useContext(calculatorContext)
}


/* creating a Customer Provider */


function CustomCalculatorContext({children}){
    let [currentValue, setCurrentValue] = useState(""); //for displaying like expression
    const [finalResult, setFinalResult] = useState(0);  //for display final result inform of number

    const handleCases = (newValue)=>{

        /*check if new value is operator except minus operator and currentValue state is empty then do nothing*/
        if (/[+x÷.]/.test(newValue) && currentValue==="")
            return;

        /* check if first character is zero in current value state and it is not in decimal like 0.01*/
        const firstCharIsValueZero = currentValue[0] === "0" && currentValue[1]!==".";
        
        /* check if last character is operator in current value state*/
        const lastCharIsOperator = /[-+x÷.]/.test(currentValue[currentValue.length - 1]);
        
        /*(if last character is operator and also new character is also operator) or (if first character is zero) then delete operator from state*/
        if ((/[-+x÷.]/.test(newValue) && lastCharIsOperator) || firstCharIsValueZero) {
            
            setCurrentValue(currentValue.slice(0, -1));  //delete last character from state
            
            return true; //returning true so we can insert new operator in currentvalue state from updateCurrentValue function
        }


        switch(newValue)
        {
            case 'back' : 
                removeLastCharcter();
                return false;
            case 'C' :
                clearAll();
                return false;
            case '=':
                settingFinalResult();
                clearResult();
                return false;
            case '%':
                settingFinalResult('%');
                clearResult();
                return false;
            default :
                return true;
        }
    }

    const updateCurrentValue = (newValue)=>{

        /* for handling C*/
        if(newValue==="C")
        {
            clearAll();
            return;
        }
        const status = handleCases(newValue);

        // if status received from handeCases function is true then only update state
        if(status) 
            setCurrentValue((prevState)=>prevState + newValue);
    }

    /* executes when user clicks on clear and it clears both current value and final result */
    const clearAll = ()=>{
        setCurrentValue("");
        setFinalResult(0);
    }

    /*after computing result and store in current value state adn reset final result to zero */
    const clearResult = ()=>{
        setFinalResult(0);
    }


    /* when newValue encounters '=' (user clicks on equal) then compute result from currentState values using eval function*/

    const settingFinalResult = (value='')=>{

        /* if user clicks on percentage */
        if(value=='%')
        {
            currentValue = currentValue + '%'; //setting state directly as we don't want % to be dispalyed on ui
        }

        /* in currentValue state replace x with * , ÷ with / , % with /100 for computing correct result*/
        const updatedValue = currentValue.replace(/x/g, '*').replace(/÷/g, '/').replace(/%/g,'/100');


        try{
            const value = eval(updatedValue);
            let roundedValue = value;
            
            //if resultant value is floating number then float till 7 decimal maximum */
            if (!Number.isInteger(value)) {
                roundedValue = Number(value.toFixed(7));
            }
            setFinalResult(roundedValue);
            setCurrentValue(roundedValue.toString());
        }

        catch(err)
        {
            return;
        }
    }

    /* when new value is back (user clicks on back button) then remove last character from currentValue state*/
    const removeLastCharcter = ()=>{
        if(currentValue==='')
            return;
        setCurrentValue(currentValue.slice(0,-1))
    }

    
    
    return(
        <calculatorContext.Provider value={{currentValue,updateCurrentValue,finalResult}}>
            {children}
        </calculatorContext.Provider>
    )

}

export default CustomCalculatorContext;