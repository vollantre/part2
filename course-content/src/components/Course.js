import React from 'react'

const Course = ({ course }) => {

    const total = course.parts.reduce((s, p) => {
        if(isNaN(s)){
           return s.exercises + p.exercises 
        }
        return s + p.exercises 
    } )

    return (
    <div>
        <h1>{course.name}</h1>
        <div>
            {course.parts.map(part => 
                <p key={part.id}>{part.name} {part.exercises}</p>)}
        </div>
        <div>
            <strong>total of {total} exercises</strong>
        </div>
    </div>
    )
}

export default Course