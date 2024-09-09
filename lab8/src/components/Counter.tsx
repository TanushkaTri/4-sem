import { useState } from "react";
import Button from "./Button";
 
 
 
function Counter() {
  const [count, setCount] = useState<number>(0);

  const maxCountStyles = "text-red-500 text-4xl";
  const defaultStyles = "text-cyan-500 text-4xl";

  const incrementClickHandler = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };

  const resetClickHandler = () => {
    setCount(0);
  };

 

  return (
    <div className="h-52 w-64 border-[3px] border-cyan-400 bg-slate-950 rounded-3xl shadow-xl">
      <div className="w-full h-1/2 flex items-center justify-center">
        <div className={count === 5 ? maxCountStyles : defaultStyles}>
          {count}
        </div>
      </div>
      <div className="w-full h-1/2 flex items-center justify-evenly">
        
        <Button
          text="incr"
          callback={incrementClickHandler}
          disabled={count === 5 ? true : false}
        />
        <Button 
          text="reset" 
          callback={resetClickHandler} 
          disabled = {  count===0 ? true : false}/>
          
      </div>
       
 
     
    </div>
  );
}

export default Counter;
