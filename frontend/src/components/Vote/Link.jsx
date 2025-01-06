/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const Link = ({
    property1,
    className,
    href,
    arrow = "https://c.animaapp.com/YiM9BdDl/img/arrow-1-2.svg",
    text = "Label",
}) => {
    return (
        <div
            className={`inline-flex items-center gap-[15px] relative ${className}`}
        >
            {["black-2", "black", "green-2", "green", "white-2", "white"].includes(
                property1,
            ) && (
                    <>

                        <div
                            className={`w-[41px] h-[41px] rounded-[20.5px] relative ${["black-2", "black"].includes(property1) ? "bg-black" : (["green-2", "green"].includes(property1)) ? "bg-green" : "bg-[#ffffff]"}`}
                        >
                            <a href={href}>
                                <img
                                    className="w-5 left-2.5 top-[11px] h-5 absolute"
                                    alt="Arrow"
                                    src={
                                        ["green", "white-2"].includes(property1)
                                            ? "https://c.animaapp.com/YiM9BdDl/img/arrow-1-4.svg"
                                            : ["black-2", "green-2"].includes(property1)
                                                ? "https://c.animaapp.com/YiM9BdDl/img/arrow-1-5.svg"
                                                : arrow
                                    }
                                />
                            </a>
                        </div>

                        <div
                            className={`[font-family:'Space_Grotesk',Helvetica] w-fit tracking-[0] text-xl font-normal leading-7 whitespace-nowrap relative ${["black-2", "black", "green"].includes(property1) ? "text-black" : "text-[#ffffff]"}`}
                        >
                            <a href={href}>
                                {text}
                            </a>

                        </div>
                    </>
                )
            }

            {
                ["simple-black", "simple-green", "simple-white"].includes(property1) && (
                    <>
                        <div
                            className={`[font-family:'Space_Grotesk',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-xl relative font-normal whitespace-nowrap leading-7 ${property1 === "simple-white" ? "text-[#ffffff]" : (property1 === "simple-black") ? "text-black" : "text-green"}`}
                        >
                            {text}
                        </div>

                        <img
                            className="w-[20.32px] mr-[-1.50px] h-[19.53px] relative"
                            alt="Icon"
                            src={
                                property1 === "simple-white"
                                    ? "https://c.animaapp.com/YiM9BdDl/img/icon-1@2x.png"
                                    : property1 === "simple-black"
                                        ? "https://c.animaapp.com/YiM9BdDl/img/icon-2@2x.png"
                                        : "https://c.animaapp.com/YiM9BdDl/img/icon@2x.png"
                            }
                        />
                    </>
                )
            }
        </div >
    );
};
