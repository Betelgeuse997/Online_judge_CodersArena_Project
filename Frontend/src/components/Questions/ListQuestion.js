import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Spinner from "../Spinner";
import BackButton  from "../BackButton";
import { useAuth } from "../../context/AuthContext";
import '../../CSS_Files/ListQuestion.css';
import QuestionModal from "../QuestionModal";
import { BsInfoCircle } from 'react-icons/bs';
const BACK_SERVER_URL = '65.1.107.21';

const ListQuestion = () => {
    const [question, setQuestions] = useState({});
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const { token } = useAuth();

    const openQuestionModal = () => {
        setModalOpen(true);
      };
    
      const closeQuestionModal = () => {
        setModalOpen(false);
      };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://${BACK_SERVER_URL}:5000/question/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            .then((response) => {
                setQuestions(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [token]);

    return (
        <div>
            <BackButton />
            <h1>Question</h1>
            {loading ? (
                <Spinner />
            ):(
                <div>
                    <div>
                        <span>Id</span>
                        <span>{question.uniqueID}</span>
                    </div>
                    <div>
                        <span>Title</span>
                        <span>{question.title}</span>
                    </div>
                    <div>
                        <span>Description</span>
                        <span>{question.description}</span>
                    </div>
                    <div>
                        <span>Difficulty</span>
                        <span>{question.difficulty}</span>
                    </div>
                    <div>
                <span>Test Cases</span>
                {question.testCases && question.testCases.length > 0 ? (
                    <div>
                        {question.testCases.map((testCase, index) => (
                            <div key={index}>
                                <div>
                                    <span>Input:</span> {testCase.input}
                                </div>
                                <div>
                                    <span>Output:</span> {testCase.output}
                                </div>
                                <div>
                                    <span>Time Taken:</span> {testCase.timeTaken} ms
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span>No test cases available.</span>
                )}
                    </div>
                    <div>
                    <BsInfoCircle
                    className='text-2xl text-green-800'
                    onClick={openQuestionModal}
                    />
                    {isModalOpen && (
                            <QuestionModal
                            question={question} // Pass necessary data to the modal
                            closeModal={closeQuestionModal} // Pass a function to close the modal
                            />
                        )}
                    </div>  
                </div>
                
                
            )}
        </div>
    )
}

export default ListQuestion
