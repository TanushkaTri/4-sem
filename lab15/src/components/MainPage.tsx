import { useEffect } from "react";
import GameContainer from "../containers/GameContainer";
import Modal from "./Modal";

interface MainPageProps {
  victory: boolean;
  getHint: () => void;
  doRestart: () => void;
  insertValue: (key: string) => void;
}

function MainPage({ victory, getHint, doRestart, insertValue }: MainPageProps) {
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "r") {
        doRestart();
      }

      if (e.key === "h") {
        getHint();
      }

      if (!/[0-9]/.test(e.key)) {
        return;
      }

      insertValue(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen bg-[#FFFFFF]">
      <div className="flex flex-col items-center">
        <div className="flex gap-80 m-5">
          <button
            className="w-24 rounded-md border-1 border-black "
            onClick={() => doRestart()}
          >
            ЗАНОВО
          </button>
          <button
            className="w-24 rounded-md border-1 border-black "
            onClick={() => getHint()}
          >
            ПОДСКАЗКА
          </button>
        </div>
        {/* Victory modal */}
        {victory && (
          <Modal onClose={() => doRestart()}>
            <div className="flex flex-col items-center justify-center">
            <h1 className="text-[100px] text-[#000000] font-bold">
              ИГРА ОКОНЧЕНА
              </h1>
             
            </div>
          </Modal>
        )}
        {/* ------------------- */}
        <GameContainer />
      </div>
    </div>
  );
}

export default MainPage;
