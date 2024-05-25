import styles from "../css/Home.module.css"
import Buttons from "./Buttons";
import Display from "./Display";

function Home(){
    return(
        <div className={styles.calculatorContainer}>
            <Display/>
            <Buttons/>
        </div>
    )
}

export default Home;