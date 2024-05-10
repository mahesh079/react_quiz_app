import React, { useEffect, useRef } from 'react'
import './css/Question_page.css'
import questions from '../API/questions';
import { useState } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

export default function Questionpage() {

    // useNavigate hook to navigate our user to Result page
    let navigate = useNavigate();

    // UseParams hook to get username and selected category from Home page
    const {name, category, value } = useParams();

    // question_number state is used to update question and options
    let [question_number, current_question_number] = useState(0)

    // question_category state is used to get the category that user selected
    let [question_category, current_category] = useState(questions[value][question_number])


    // score variable stores and updates score whn answer is correct
    let [score, setscore] = useState(0);

    // incorrect variable stores the number of incorect answers given
    let [incorrect, setincorrect] = useState(0)

    // stores the count of attempted questions
    let [attempted, setattempted] = useState(0)

    // it will store and update the timer in seconds
    let [timer, settimer] = useState(0)

    // it will store the time taken to answer each question
    let [timetaken, settimetaken] = useState(0)

    // This lock varibale when is true user is able to proceed to next question 
    let [lock, setlock] = useState(false);


    // This function increases the timer states value by +1 with the help of settimer method
    function settingtimer(){
        settimer(timer+1)

    }

    
    useEffect(() => {
        if(lock===false){
            var interval = setInterval(settingtimer,1000)
            return ()=>clearInterval(interval)
        }

    },)



    // References for our options to add and remove class names 
    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)
    let option4 = useRef(null)

    let option_array = [option1, option2, option3, option4]


    // Calls when user clikc on next button to proceed to next question
    function next_question() {
        if(lock===true){
            if (question_number < 9) {
                current_question_number(question_number = question_number + 1)
                current_category(questions[value][question_number])
    
                option_array.map((option) => {
                    option.current.classList.remove("correct")
                    option.current.classList.remove("incorrect")
                    return null;
                })
    
                setlock(false)
                settimer(0)
    
            } else {
                navigate('/result/'+name+'/' + score + '/' + incorrect + '/' + attempted +"/"+timetaken+"/"+category+'/'+value, { replace: true });
            }
        }

    }


// gets called when user selects the options and highlights with green is answer is correct and highlights with red if incorrect
    function correct_or_incorrect(event, option) {
        if (lock === false) {
            if (question_category.ans === option) {
                event.target.classList.add("correct");
                setscore(score = score + 1)
                setattempted(attempted = attempted + 1)
                settimetaken(timetaken = timetaken + timer)
                setlock(true)


            } else {
                event.target.classList.add("incorrect");
                setincorrect(incorrect = incorrect + 1)
                setattempted(attempted = attempted + 1)
                settimetaken(timetaken = timetaken + timer)
                setlock(true)

            }
        }

    }



    return (
        <main id='question'>
            <section>
                <h1>{category}</h1>
                <div>
                    <div className='score-time'><div id='timer'><b>{timer}</b>  </div></div> <div className='score-time'>Score: <b>{score}</b> </div>
                </div>

                <div id='questions_section'>
                    <div id='question_number'>
                        <b>   {question_number + 1}/10</b>
                    </div>
                    <div id='question'>
                        {question_category.question}
                    </div>
                    <div id='options_and_next'>
                        <div ref={option1} className='option' onClick={(event) => { correct_or_incorrect(event, "option1") }}>{question_category.option1}</div>
                        <div ref={option2} className='option' onClick={(event) => { correct_or_incorrect(event, "option2") }}>{question_category.option2}</div>
                        <div ref={option3} className='option' onClick={(event) => { correct_or_incorrect(event, "option3") }}>{question_category.option3}</div>
                        <div ref={option4} className='option' onClick={(event) => { correct_or_incorrect(event, "option4") }}>{question_category.option4}</div>
                        <button id='next' onClick={next_question}>{question_number===9?'Finish':'Next'}</button>
                    </div>
                </div>
            </section>
        </main>
    )
}
