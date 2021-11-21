import React, { useState, useEffect, useRef } from "react";
import "./Game.css";

const GameCell = (props) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (props.checkedList.length === 0) setChecked(false);
    }, [props.checkedList]);

    const checkingCell = () => {
        if (!checked) {
            setChecked(true);
            if (props.checkedList.includes(props.keyProp)) {
                let tempList = [...props.checkedList];

                const index = tempList.indexOf(props.keyProp);
                if (index > -1) {
                    tempList.splice(index, 1);
                }
                props.setCheckedList(tempList);
            } else {
                let tempList = [...props.checkedList];
                tempList.push(props.keyProp);
                props.setCheckedList(tempList.sort());
            }
        }
    };

    return (
        <div key={`GameCell${props.keyProp}`} className={checked ? "GameCell" : "GameCell checked"} onClick={checkingCell}>
            {checked ? <div className="Circle" key={`X${props.keyProp}`} /> : null}
        </div>
    );
};

const Game = () => {
    const [checkedList, setCheckedList] = useState([]);
    const [winningSequence, setWinningSequence] = useState([]);
    const [winClass, setWinClass] = useState();

    useEffect(() => {
        if (checkedList.length > 0) {
            for (let i = 0; i < checkedList.length / 2; i++) {
                if (checkedList[i] % 3 === 0 && checkedList.includes(checkedList[i] + 1) && checkedList.includes(checkedList[i] + 2))
                    setWinningSequence([checkedList[i], checkedList[i] + 1, checkedList[i] + 2]);
                if (checkedList.includes(checkedList[i] + 3) && checkedList.includes(checkedList[i] + 6))
                    setWinningSequence([checkedList[i], checkedList[i] + 3, checkedList[i] + 6]);
                if (checkedList[i] === 2 && checkedList.includes(checkedList[i] + 2) && checkedList.includes(checkedList[i] + 4))
                    setWinningSequence([checkedList[i], checkedList[i] + 2, checkedList[i] + 4]);
                if (checkedList.includes(checkedList[i] + 4) && checkedList.includes(checkedList[i] + 8))
                    setWinningSequence([checkedList[i], checkedList[i] + 4, checkedList[i] + 8]);
            }
        }
    }, [checkedList]);

    useEffect(() => {
        console.log(winningSequence);

        if (winningSequence[0] === 0 && winningSequence[2] === 2) setWinClass("firstHor");
        if (winningSequence[0] === 0 && winningSequence[2] === 8) setWinClass("firstDia");
        if (winningSequence[0] === 3 && winningSequence[2] === 5) setWinClass("secondHor");
        if (winningSequence[0] === 6 && winningSequence[2] === 8) setWinClass("thirdHor");
        if (winningSequence[0] === 0 && winningSequence[2] === 6) setWinClass("firstVert");
        if (winningSequence[0] === 1 && winningSequence[2] === 7) setWinClass("secondVert");
        if (winningSequence[0] === 2 && winningSequence[2] === 8) setWinClass("thirdVert");
        if (winningSequence[0] === 2 && winningSequence[2] === 6) setWinClass("secondDia");
    }, [winningSequence]);

    return (
        <>
            <div className="GameContainer">
                <div className="GameWrapper">
                    {[...Array(9).keys()].map((i) => (
                        <GameCell key={i} keyProp={i} setCheckedList={setCheckedList} checkedList={checkedList} />
                    ))}
                    <button onClick={() => (setCheckedList([]), setWinningSequence([]))}>Clear</button>
                    {winningSequence.length > 0 ? <div className={`WinningLine ${winClass}`} /> : null}
                </div>
            </div>
        </>
    );
};

export default Game;
