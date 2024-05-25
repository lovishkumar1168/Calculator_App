import styles from "../css/Buttons.module.css";
import { buttonsText } from "../data/buttonsText";
import Button from "./Button";

function Buttons(){
    return(
        <div className={styles.buttonsContainer}>
            {buttonsText.map((text,index)=>(
                <Button key={index} buttonText={text} />
            ))}
        </div>
    )
}

export default  Buttons;