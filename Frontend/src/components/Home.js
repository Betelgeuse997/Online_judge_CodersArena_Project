import React, {useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useAuth } from "../context/AuthContext";
import QuestionModal from "./QuestionModal";
import '../CSS_Files/Home.css';
import { useNavigate } from 'react-router-dom';
import { fetchSubmissions } from "../services/api";
const BACK_SERVER_URL = '3.7.68.95';

const Home = () => {
    const [submission, setSubmissions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    // const [showType, setShowType] = useState('table');
    const { token, logout, username } = useAuth();
    const navigate = useNavigate();
    

    useEffect(() => {
        setLoading(true);
        axios
          .get(`https://${BACK_SERVER_URL}:5000/question/list`,{
            headers: {
              Authorization: `Bearer ${token}`,
              Accept:'application/json',
            },
          })
          .then((response) => {
            setQuestions(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }, [token]);

      const handleLogout = () => {
        logout();
       
      };

      const openQuestionModal = (question) => {
        setSelectedQuestion(question);
      };
    
      const closeQuestionModal = () => {
        setSelectedQuestion(null);
      };

      useEffect(() => {
        const fetchData = async () => {

          setLoading(true);
    
          try {
            const submissions = await fetchSubmissions(token);
            setSubmissions(submissions); 
            setLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
          }
        };
        
        fetchData();

        }, [token]);
        // let stat = submission[51].status
        // console.log(questions);

        const getLatestStatus = (questionTitle, username) => {
          const relevantSubmissions = submission.filter((sub) => sub.question === questionTitle && sub.user === username);
          if (relevantSubmissions.length > 0) {
            return relevantSubmissions[relevantSubmissions.length - 1].status;
          }
          return null;
        };
        // const abc = submission.filter((sub) => sub.question === "Print Hello" && sub.user === "VishnuS1");
        // console.log(abc[abc.length - 1].status);
        console.log(username);

    return(
        
          <div>
            <div className="header">
                <h1>Coders Arena</h1>
                <button  onClick={handleLogout}>Logout</button>
            </div>
            <div className="container1">
            <h2>Questions</h2>
            </div>
             
            
          {loading ? (
            <Spinner />
          ) : (
            
                <div>
                        {/* <div class = "heading">
                          <h3>
                            <span>Title</span>
                            <span>Difficulty</span>
                          </h3>
                        </div> */}
                      <ul>
                        
                        {
                          questions.map((question, index) => (
                            <div key={question._id}>
                              <li className={getLatestStatus(question.title, username) === "Code Accepted" ? "green-bg" : (getLatestStatus(question.title,username) === null ? null : "red-bg")}>
                              <p>{index + 1}</p>
                              <p><Link to={`/editor/${question._id}`}>{question.title}</Link></p>
                              <p>{question.difficulty}</p>
                              <span>
                                  {/* <div onClick={() => openQuestionModal(question)}> */}
                                      <BsInfoCircle onClick={() => openQuestionModal(question)} />
                                  {/* </div> */}
                                  <Link to={`/question/edit/${question._id}`}>
                                      <AiOutlineEdit/>
                                  </Link>
                                  <Link to={`/question/delete/${question._id}`}>
                                      <MdOutlineDelete />
                                  </Link>
                              </span>
                              
                                  </li>
                                  
                            </div>
                          ))
                        }
                        <buttonadd >
                                <Link to='/question/add'>
                                <MdOutlineAddBox />
                                </Link>
                                </buttonadd>
                        
                        
                        </ul>
                        
                </div>
      )}
        {selectedQuestion && (
        <QuestionModal question={selectedQuestion} onClose={closeQuestionModal} />
      )}
          </div>
    )
}

export default Home
