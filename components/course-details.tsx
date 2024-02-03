import React from 'react';

export interface CourseData {
    subheading1: string;
    description1: string;
    subheading2: string;
    description2: string;
}

export function CourseDetails(props : CourseData) {
    if(!props) {
        return <p className="text-xl font-black text-white">Unknown Body</p>
    }
    return (
        <div className="my-2">
            <p className="py-2 text-xl font-bold text-white">{props.subheading1}</p>
            <p className="py-2 text-base  text-white">{props.description1}</p>
            <p className="py-2 text-xl font-bold text-white">{props.subheading2}</p>
            <p className="py-2 text-base  text-white">{props.description2}</p>
        </div>
    );
};