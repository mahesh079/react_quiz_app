import React, { useEffect, useState } from 'react'
import './css/Result.css'
import { useParams,Link } from 'react-router-dom'
const Result = () => {


  // getting values through url 
  const{name,score,incorrect,attempted,timetaken,category,value}=useParams();

  // percentage state shows percentage 
  const [percentage,setpercentage]=useState(0);

  let categorylink="/"+name+'/'+category+'/'+value


  // after page renders setpercentage function is called
  useEffect(()=>{
    setpercentage((score/10)*100)
  },[])

  return (
    <>
        <main id='main'>
            <section id='result'>
                <h2 className='blue'>Quiz Result</h2>
                <p>{name} your result is: {score} out of 10 marks</p>
                <p>Total time taken: <b>{timetaken}</b> seconds</p>
                <p>Total Questions: <b>10</b></p>
                <p>Attempted questions: <b>{attempted}</b></p>
                <p>Correct: <b>{score}</b></p>
                <p>Wrong: <b>{incorrect}</b></p>
                <p>Percentage: <b>{percentage}%</b></p>
      <Link to={categorylink}><button className='background-blue'>Start Again</button></Link>    <Link to='/'><button className='background-blue'>Go to Home</button></Link>    
            </section>
        </main>
    </>
  )
}

export default Result
