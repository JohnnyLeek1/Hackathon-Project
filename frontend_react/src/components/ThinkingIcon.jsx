import React from 'react';

export function ThinkingIcon({width, height}) {
    return (
        <svg width="200px" height="200px" viewBox={`0 0 100 100`} preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#445a89" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
    );
}

export function DoneIcon() {
    return (
        <svg id="success_animation" viewBox="0 0 52 52">
            <circle className="circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
    );
}