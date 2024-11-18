import React from "react";
import BackButtonImage from "../../Assets/back-button.svg";
import { useNavigate } from "react-router-dom";

const NavigateBackStack = () => {
    const Navigate = useNavigate();

    const HandleOnBackPress = () => {
        Navigate(-1);
    }

    return (
        <button className="back-btn" type="button" onClick={HandleOnBackPress}>
            <img src={BackButtonImage} alt="BackButton" />
        </button>
    );
};

export default NavigateBackStack;