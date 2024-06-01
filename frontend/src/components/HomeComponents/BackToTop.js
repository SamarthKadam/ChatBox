import React from "react";

export default function BackToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div
            id="back-to-top"
            className="bg-orange-500 h-12 sticky bottom-12 left-12 w-28 flex justify-center items-center text-white rounded-full"
        >
            <button
                className="back-to-top"
                onClick={scrollToTop}
            >
                Back To Top ↑
            </button>
        </div>
    );
}
