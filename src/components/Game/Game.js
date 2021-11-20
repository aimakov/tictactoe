import React, { useState, useEffect } from "react";
import "./Game.css";

const GameCell = (props) => {
    const [checked, setChecked] = useState(false);

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

    useEffect(() => {
        if (checkedList.length > 0) {
            for (let i = 0; i < checkedList.length / 2; i++) {
                if (checkedList[i] % 3 === 0 && checkedList.includes(checkedList[i] + 1) && checkedList.includes(checkedList[i] + 2)) console.log("Won!");
                if (checkedList.includes(checkedList[i] + 3) && checkedList.includes(checkedList[i] + 6)) console.log("Won!");
                if (checkedList[i] === 2 && checkedList.includes(checkedList[i] + 2) && checkedList.includes(checkedList[i] + 4)) console.log("Won!");
                if (checkedList.includes(checkedList[i] + 4) && checkedList.includes(checkedList[i] + 8)) console.log("Won!");
            }
        }
    }, [checkedList]);

    return (
        <>
            <div className="GameContainer">
                <div className="GameWrapper">
                    {[...Array(9).keys()].map((i) => (
                        <GameCell key={i} keyProp={i} setCheckedList={setCheckedList} checkedList={checkedList} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Game;
