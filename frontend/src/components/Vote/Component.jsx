/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const Component = ({ className, labelClassName, text = "기호 1번" }) => {
    return (
        <div className={`relative w-[133px] h-[43px] bg-[#f7cf62] ${className}`}>
            <div
                className={`absolute top-1.5 left-1.5 [font-family:'Space_Grotesk',Helvetica] font-bold text-[#000000] text-[35px] text-center tracking-[0] leading-7 whitespace-nowrap ${labelClassName}`}
            >
                {text}
            </div>
        </div>
    );
};
