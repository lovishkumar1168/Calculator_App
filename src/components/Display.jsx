import { useValue } from "../context/CustomCalculatorContext";
import styles from "../css/Display.module.css"

function Display(){
    const {currentValue,finalResult} = useValue();
    return(
        <div className={styles.displayContainer}>
            <p>{finalResult===0 ? currentValue : finalResult}</p>
        </div>
    )
}

export default Display;