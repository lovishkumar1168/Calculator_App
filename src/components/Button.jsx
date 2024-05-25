import { useValue } from "../context/CustomCalculatorContext";
import styles from "../css/Button.module.css";

function Button({buttonText}){
    const {updateCurrentValue} = useValue();
    return(
        <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={()=>updateCurrentValue(buttonText)}>{buttonText==='back' ? <img src="https://cdn-icons-png.flaticon.com/128/16384/16384625.png" alt="hello"/>:buttonText}</button>
        </div>
    )
}

export default Button;