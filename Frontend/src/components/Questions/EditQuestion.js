import React, {useState, useEffect} from 'react';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import '../../CSS_Files/EditQuestion.css'
const BACK_SERVER_URL = '13.232.180.30';

const EditQuestion = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [testCases, setTestCases] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://${BACK_SERVER_URL}:5000/question/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then((response) => {
            setTitle(response.data.title);
            setDescription(response.data.description);
            setDifficulty(response.data.difficulty);
            setTestCases(response.data.testCases);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            alert('An error occured. Please check console');
            console.log(error);
        });
    }, [token])
    const handleEditQuestion = () => {
        const data = {
            title,
            description,
            difficulty,
            testCases,
        };
        setLoading(true);
        axios.put(`http://${BACK_SERVER_URL}:5000/question/edit/${id}`, data,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then(() => {
            setLoading(false);
            navigate('/');
        })
        .catch((error) => {
            setLoading(false);
            alert('An error happened. Please check console');
            console.log(error);
        });
    };
    
    const handleDropdownClick = (difficultyValue) => {
        setDifficulty(difficultyValue);
    };

    const handleTestCaseChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTestCases = [...testCases];
        updatedTestCases[index] = {
          ...updatedTestCases[index],
          [name]: name === 'timeTaken' ? parseInt(value, 10) : value,
        };
        setTestCases(updatedTestCases);
      };
    
      const addTestCase = () => {
        setTestCases((prevTestCases) => [
          ...prevTestCases,
          {
            input: '',
            output: '',
            timeTaken: 1,
          },
        ]);
      };
      

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      // Close the dropdown menu if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

    return (
        <div className='container'>
            <BackButton />
            {loading ? <Spinner /> : ''}
            <div className='form-group'>
                <div>
                    <label>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='titleinput'
                        />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        type='text'
                        rows={20}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='difficultyinput'
                        />
                </div>
                {/* <div>
                    <label>Difficulty</label>
                    <input
                        type='text'
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        />
                </div> */}
                <div className="dropdown">
                    <label>Difficulty</label>
                    <button onClick={myFunction} className="dropbtn">{difficulty || 'Difficulty'}</button>
                    <div id="myDropdown" className="dropdown-content">
                        <a onClick={() => handleDropdownClick('Easy')}>Easy</a>
                        <a onClick={() => handleDropdownClick('Medium')}>Medium</a>
                        <a onClick={() => handleDropdownClick('Hard')}>Hard</a>
                    </div>
                </div>
                <div>
                
                    <div>
                    {testCases.map((tc, index) => (
                        <div key={index}>
                            <label>Test Case {index + 1}:</label>
                            <input
                                
                                type="text"
                                name="input"
                                value={tc.input}
                                onChange={(e) => handleTestCaseChange(e, index)}
                            />
                            <input
                                type="text"
                                name="output"
                                value={tc.output}
                                onChange={(e) => handleTestCaseChange(e, index)}
                            />
                            <input
                                type="number"
                                name="timeTaken"
                                value={tc.timeTaken}
                                onChange={(e) => handleTestCaseChange(e, index)}
                            />
                        </div>
                    ))}
                </div>

                <label>Add Test Case</label>
                <MdOutlineAddBox onClick={addTestCase}>Add Test Case</MdOutlineAddBox>
                </div>
                <button onClick={handleEditQuestion}>
                    Save
                </button>
            </div>            
        </div>
    )
}

export default EditQuestion;
