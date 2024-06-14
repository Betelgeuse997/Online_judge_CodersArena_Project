import React, {useState} from 'react';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import '../../CSS_Files/AddQuestion.css';
const BACK_SERVER_URL = '13.232.180.30';


const AddQuestion = () => {
    const { token } = useAuth();
    const [data, setData] = useState({
        title: '',
        description: '',
        difficulty: '',
        testCases: [],  
    });
    const [newTestCase, setNewTestCase] = useState({
        input: '',
        output: '',
        timeTaken: 1,
      });


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleDropdownClick = (difficultyValue) => {
        setData((prevData) => ({
            ...prevData,
            difficulty: difficultyValue,
        }));
    };

    const handleTestCaseChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTestCases = [...data.testCases];
        updatedTestCases[index] = {
          ...updatedTestCases[index],
          [name]: name === 'timeTaken' ? parseInt(value, 10) : value,
        };
        setData((prevData) => ({
          ...prevData,
          testCases: updatedTestCases,
        }));
      };
    
      const addTestCase = () => {
        setData((prevData) => ({
          ...prevData,
          testCases: [...prevData.testCases, newTestCase],
        }));
        setNewTestCase({
          input: '',
          output: '',
          timeTaken: 1,
        });
      };
      

    const handleSaveQuestion = (e) => {
        e.preventDefault();
        
        // Map the difficulty label to its corresponding value
        let difficultyValue;
        switch (data.difficulty) {
            case 'Easy':
                difficultyValue = 10;
                break;
            case 'Medium':
                difficultyValue = 20;
                break;
            case 'Hard':
                difficultyValue = 30;
                break;
            default:
                difficultyValue = 0; // Default value or handle as needed
        }

        // Update the difficulty value in the data object
        setData((prevData) => ({
            ...prevData,
            difficulty: difficultyValue,
        }));

        setLoading(true);
        axios.post(`http://${BACK_SERVER_URL}:5000/question/add`, data, {
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
                    <label>Title: </label>
                    <input
                        type='text'
                        name="title"
                        value={data.title}
                        onChange={handleInputChange}
                        className='titleinput'
                        />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea
                        type='text'
                        rows={20}
                        name="description"
                        value={data.description}
                        onChange={handleInputChange}
                        className='difficultyinput'
                        />
                </div>
                {/* <div>
                    <label>Difficulty: </label>
                    <input
                        type='text'
                        name="difficulty"
                        value={data.difficulty}
                        onChange={handleInputChange}
                        />
                </div> */}
                <div class="dropdown">
                <button onClick={myFunction} class="dropbtn">{data.difficulty || 'Difficulty'}</button>
                  <div id="myDropdown" class="dropdown-content">
                      <a onClick={() => handleDropdownClick('Easy')}>Easy</a>
                      <a onClick={() => handleDropdownClick('Medium')}>Medium</a>
                      <a onClick={() => handleDropdownClick('Hard')}>Hard</a>
                  </div>
                </div>
                <div>
                <label>Add Test Case</label>
                <MdOutlineAddBox onClick={addTestCase}>Add Test Case</MdOutlineAddBox>
                    <div>
                    {data.testCases.map((tc, index) => (
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
                </div>
                <button onClick={handleSaveQuestion}>
                    Save
                </button>
                        
        </div>
        </div>
    )
}

export default AddQuestion;
