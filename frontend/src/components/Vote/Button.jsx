/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
export const Button = ({
    property1,
    className,
    divClassName,
    onClick,
    text = "Label",
}) => {
    return (
        <button
            onClick={onClick}
            className={`all-[unset] box-border inline-flex items-start gap-2.5 px-[35px] py-5 rounded-[14px] relative ${property1 === "button-secondary" ? "border border-solid" : ""} ${property1 === "button-secondary" ? "border-dark" : ""} ${property1 === "button-primary" ? "bg-dark" : (property1 === "button-tertiary") ? "bg-green" : ""} ${className}`}
        >
            <div
                className={`[font-family:'Space_Grotesk',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-xl relative font-normal text-center whitespace-nowrap leading-7 ${property1 === "button-tertiary" ? "text-black" : (property1 === "button-secondary") ? "text-[#000000]" : "text-[#ffffff]"} ${divClassName}`}
            >
                {text}
            </div>
        </button>
    );
};
