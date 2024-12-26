/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Pentagon3 } from "../../../public/icon/Pentagon3";
import { Size2XLargeTypeUser } from "../../../public/icon/Size2XLargeTypeUser";
import { Size3XLargeTypeImage } from "../../../public/icon/Size3XLargeTypeImage";
import { Size3XLargeTypeUser } from "../../../public/icon/Size3XLargeTypeUser";

export const Avatar = ({
    size,
    type,
    sizeSmallTypeClassName,
    divClassName,
}) => {
    return (
        <>
            {["icon", "initials"].includes(type) && (
                <div
                    className={`relative ${size === "medium" ? "w-10" : (size === "large") ? "w-12" : size === "x-large" ? "w-14" : size === "two-x-large" ? "w-16" : size === "three-x-large" ? "w-[72px]" : "w-8"} ${type === "icon" ? "bg-[100%_100%]" : ""} ${size === "medium" ? "h-10" : (size === "large") ? "h-12" : size === "x-large" ? "h-14" : size === "two-x-large" ? "h-16" : size === "three-x-large" ? "h-[72px]" : "h-8"} ${size === "small" && type === "icon" ? "bg-[url(https://c.animaapp.com/YiM9BdDl/img/vector.svg)]" : (type === "icon" && size === "medium") ? "bg-[url(https://c.animaapp.com/YiM9BdDl/img/vector-1.svg)]" : type === "icon" && size === "large" ? "bg-[url(https://c.animaapp.com/YiM9BdDl/img/vector-2.svg)]" : size === "x-large" && type === "icon" ? "bg-[url(https://c.animaapp.com/YiM9BdDl/img/vector-3.svg)]" : type === "icon" && size === "two-x-large" ? "bg-[url(https://c.animaapp.com/YiM9BdDl/img/vector-4.svg)]" : size === "three-x-large" && type === "icon" ? "bg-[url(https://c.animaapp.com/YiM9BdDl/img/vector-5.svg)]" : ""} ${type === "initials" && size === "small" ? "rounded-2xl" : (type === "initials" && size === "medium") ? "rounded-[20px]" : type === "initials" && size === "large" ? "rounded-3xl" : type === "initials" && size === "x-large" ? "rounded-[28px]" : type === "initials" && size === "two-x-large" ? "rounded-[32px]" : type === "initials" && size === "three-x-large" ? "rounded-[36px]" : ""} ${type === "initials" ? "bg-gray-200" : ""} ${sizeSmallTypeClassName}`}
                >
                    {type === "initials" && (
                        <div
                            className={`text-white text-center whitespace-nowrap absolute ${size === "small" ? "font-android-overline" : (size === "medium") ? "font-android-button" : ["three-x-large", "two-x-large"].includes(size) ? "font-android-h6" : "font-android-subtitle-2"} ${size === "large" ? "left-3" : (["two-x-large", "x-large"].includes(size)) ? "left-4" : size === "three-x-large" ? "left-5" : "left-2"} ${size === "small" ? "[font-style:var(--android-overline-font-style)]" : (size === "medium") ? "[font-style:var(--android-button-font-style)]" : ["three-x-large", "two-x-large"].includes(size) ? "[font-style:var(--android-h6-font-style)]" : "[font-style:var(--android-subtitle-2-font-style)]"} ${size === "small" ? "tracking-[var(--android-overline-letter-spacing)]" : (size === "medium") ? "tracking-[var(--android-button-letter-spacing)]" : ["three-x-large", "two-x-large"].includes(size) ? "tracking-[var(--android-h6-letter-spacing)]" : "tracking-[var(--android-subtitle-2-letter-spacing)]"} ${size === "small" ? "text-[length:var(--android-overline-font-size)]" : (size === "medium") ? "text-[length:var(--android-button-font-size)]" : ["three-x-large", "two-x-large"].includes(size) ? "text-[length:var(--android-h6-font-size)]" : "text-[length:var(--android-subtitle-2-font-size)]"} ${size === "small" ? "top-[7px]" : (size === "x-large") ? "top-[15px]" : size === "two-x-large" ? "top-[19px]" : size === "three-x-large" ? "top-[23px]" : "top-[11px]"} ${size === "small" ? "font-[number:var(--android-overline-font-weight)]" : (size === "medium") ? "font-[number:var(--android-button-font-weight)]" : ["three-x-large", "two-x-large"].includes(size) ? "font-[number:var(--android-h6-font-weight)]" : "font-[number:var(--android-subtitle-2-font-weight)]"} ${size === "small" ? "leading-[var(--android-overline-line-height)]" : (size === "medium") ? "leading-[var(--android-button-line-height)]" : ["three-x-large", "two-x-large"].includes(size) ? "leading-[var(--android-h6-line-height)]" : "leading-[var(--android-subtitle-2-line-height)]"} ${divClassName}`}
                        >
                        </div>
                    )}

                    {type === "icon" && (
                        <Pentagon3
                            className={
                                size === "medium"
                                    ? "!absolute !w-5 !h-5 !top-2.5 !left-2.5"
                                    : size === "large"
                                        ? "!absolute !w-6 !h-6 !top-3 !left-3"
                                        : size === "x-large"
                                            ? "!absolute !w-7 !h-7 !top-3.5 !left-3.5"
                                            : size === "two-x-large"
                                                ? "!absolute !w-8 !h-8 !top-4 !left-4"
                                                : size === "three-x-large"
                                                    ? "!absolute !w-9 !h-9 !top-[18px] !left-[18px]"
                                                    : "!absolute !w-4 !h-4 !top-2 !left-2"
                            }
                        />
                    )}
                </div>
            )}

            {type === "user" && ["small", "two-x-large"].includes(size) && (
                <Size2XLargeTypeUser
                    className={
                        size === "two-x-large"
                            ? "!absolute !w-16 !h-16 !top-0 !left-0"
                            : "!absolute !w-8 !h-8 !top-0 !left-0"
                    }
                />
            )}

            {type === "image" && (
                <Size3XLargeTypeImage
                    className={
                        size === "large"
                            ? "!absolute !w-12 !h-12 !top-0 !left-0"
                            : size === "x-large"
                                ? "!absolute !w-14 !h-14 !top-0 !left-0"
                                : size === "two-x-large"
                                    ? "!absolute !w-16 !h-16 !top-0 !left-0"
                                    : size === "three-x-large"
                                        ? "!absolute !w-[72px] !h-[72px] !top-0 !left-0"
                                        : size === "small"
                                            ? "!absolute !w-8 !h-8 !top-0 !left-0"
                                            : "!absolute !w-10 !h-10 !top-0 !left-0"
                    }
                />
            )}

            {((size === "large" && type === "user") ||
                (size === "medium" && type === "user") ||
                (size === "three-x-large" && type === "user") ||
                (size === "x-large" && type === "user")) && (
                    <Size3XLargeTypeUser
                        className={
                            size === "large"
                                ? "!absolute !w-12 !h-12 !top-0 !left-0"
                                : size === "x-large"
                                    ? "!absolute !w-14 !h-14 !top-0 !left-0"
                                    : size === "three-x-large"
                                        ? "!absolute !w-[72px] !h-[72px] !top-0 !left-0"
                                        : "!absolute !w-10 !h-10 !top-0 !left-0"
                        }
                    />
                )}
        </>
    );
};
