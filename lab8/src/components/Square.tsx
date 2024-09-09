import { useState } from "react";
interface SquareProps {
    callback: () => void;
}

function Square({callback}: SquareProps){
    const [clicckCount,setClickCount] = useState<number>(0);

    const handClick = () => {
        setClickCount (clicckCount+1);
        callback();
    }
 
    return (
        <div  
        onClick =  {handClick}>
            {clicckCount}
        </div>
    )
} 
export default Square;

