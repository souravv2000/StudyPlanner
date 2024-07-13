import './studyPlanner.css'
import React, { useState } from 'react'
function studyPlanner(){

    const previousSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const [subjects, setSubjects] = useState(previousSubjects);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [subjectHour, setSubjectHour] = useState(0);

    function handleAddSubject(){
        const newSubject = {
            id: new Date().getTime(),
            name: newSubjectName,
            hour: subjectHour,
        }

        const updatedSubjects = [...subjects,newSubject];
        setSubjects(updatedSubjects);
        localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
        setNewSubjectName('');
        setSubjectHour(0);
    }
   function handleHour(id,updateHour){
     const updatedSubjects = [...subjects];
     for(let subject of subjects){
        if(subject.id===id){
            subject.hour=updateHour;
            break;
        }
    } 
     setSubjects(updatedSubjects);
     localStorage.setItem('subjects',JSON.stringify(updatedSubjects));
   }


   function handleDeleteSubject(id){
      const updateSubjects = subjects.filter((subject) => subject.id !== id);
      setSubjects(updateSubjects);
      localStorage.setItem('subjects', JSON.stringify(updateSubjects));
   }

    return(
        <>
        <div className='mainContainer'>
        <div className='plannerContainer'>
        <h1>Geekster Education Planner</h1>
        <div className='inputPlanner'>
            <input type="text" placeholder='Subject'value={newSubjectName} onChange={(e)=>setNewSubjectName(e.target.value)}/>
            <input type="number" placeholder='Hours' value={subjectHour} id="number" onChange={(e)=> parseInt(e.target.value)>0 ? setSubjectHour(parseInt(e.target.value)): alert('Negative hours not allowed!!!')}/>
            <button onClick={handleAddSubject}>Add</button>
        </div>
            
        <div>
            <ul>
                {subjects.map((subject)=>(
                  <li key={subject.id}>
                    {subject.name} : {subject.hour} hours
                    <div id="btn">
                    <button id="plus" onClick={()=>handleHour(subject.id,subject.hour+1)}>+</button>
                    <button id="minus" onClick={()=>subject.hour>0 ? handleHour(subject.id,subject.hour-1) : alert('Negative Hours not allowed!!!')}>-</button>
                    <button id="delete" onClick={()=>handleDeleteSubject(subject.id)}>Delete</button></div>
                  </li>
                ))}
            </ul>
        </div>
        <button id="remove" onClick={()=>{
                setSubjects([]);
                localStorage.setItem('subjects',JSON.stringify([]));
            }}>Remove</button>
        </div>
        </div>
        </>
    )
}

export default studyPlanner;