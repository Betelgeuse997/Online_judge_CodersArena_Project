import React, { useState, useEffect } from 'react';
import { Accordion, Dropdown, Button, Form, Spinner } from 'react-bootstrap';
import './Editor.css';
import { submitquestion } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import stubs from './defaultStubs';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-twilight';
const BACK_SERVER_URL = '3.7.68.95';

const CodeEditor = () => {
    const [language, setLanguage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [code, setCode] = useState('');
    const { userId } = useAuth();
    const { id } = useParams();
    const { token, logout } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [displayDialog, setDisplayDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [testCases, setTestCases] = useState([]);

    useEffect(() => {
      setCode(stubs[language])
    }, [language]);
    
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

    useEffect(() => {
      // Fetch the description when the component mounts
      axios.get(`http://${BACK_SERVER_URL}:5000/question/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept:'application/json',
        },
      })
        .then((response) => {
          // console.log("Response Data:", response.data);
          setDescription(response.data.description);
          setTitle(response.data.title);
          setDifficulty(response.data.difficulty);
          if (response.data.testCases[0]) {
            // console.log(response.data.testCases[0]);
            setTestCases(response.data.testCases[0]);
            // console.log([testCases.input]);
          } else {
            console.error("Test cases not found in the response data");
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle error if needed
        });
    }, [id, token]);

          
    
  
    const handleLanguageSelect = (language) => {
      setLanguage(language);
    };
    
    // useEffect(() => {
    //   console.log("Updated Test Cases:", testCases);
    // }, [testCases]);

    const languageToModeMap = {
      'cpp': 'c_cpp',
      'py': 'python',
      'java': 'java',
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      if (language === '') {
        setErrorMessage('Select a language');
        return;
      }
  
      if (code.trim() === '') {
        setErrorMessage('Please enter code');
        return;
      }
  
      setErrorMessage('');
      setDisplayDialog(true);
  
      try {
        const currentDate = new Date();
  
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
  
        const formattedDateTime = currentDate.toLocaleString("en-US", options);
  
        // const result = await submitquestion(
        //   {
        //     code: code,
        //     user: userId,
        //     question: id,
        //     language: language,
        //     submittedAt: formattedDateTime
        //   }, token);
          // console.log(code,userId,id,language, formattedDateTime)
          
          const result = await submitquestion(
            {
              language: language,
              code: code,
              id,
              userId,
              submittedAt: formattedDateTime
            }, token);
  
        setLoading(false);
        setMessage(result.message);

      } catch (error) { 
        // if (error) {
        //   return <Navigate to="/error" />;
        // }
        
        console.log(error);
      }
    };

    const handleLogout = () => {
      logout();
     
    };
    
    return (
      <div>
        <div className="header">
                <h1>Coders Arena</h1>
                <button  onClick={handleLogout}>Logout</button>
            </div>
      <div className="online-judge-container">
        
      <div className="left-pane">
        
        <div className="content">
          <label className='titleh2'>{title}</label>
            <div className="incontent">
            <label>Difficulty: </label>
            <p>{difficulty}</p>
            <label>Description: </label>
            <p>{description}</p>
            <label>Example</label>
            <p>Input: {[testCases.input]}</p>
            <p>Output: {[testCases.output]}</p>
            <label>Time Limit</label>
            <p>{[testCases.timeTaken]} ms</p>
            </div>
        </div>
      </div>
      <div className="right-pane">
        <div className="editor-section">
          <div className="dropdown">
            <button onClick={myFunction} className="dropbtn">{language || 'Select Language'}</button>
            <div id="myDropdown" className="dropdown-content">
              <a onClick={() => handleLanguageSelect('cpp')}>Cpp</a>
              <a onClick={() => handleLanguageSelect('py')}>Python</a>
              <a onClick={() => handleLanguageSelect('java')}>Java</a>
              </div>
            </div>
          
          <Form>
            <Form.Group controlId="editorTextarea">
            <AceEditor
              mode={languageToModeMap[language] || 'python'}
              theme="twilight"
              value={code}
              onChange={(value) => setCode(value)}
              name="editorTextarea"
              fontSize={14}
              editorProps={{ $blockScrolling: true }}
              width="100%"
              height="300px"
            />
            </Form.Group>
          </Form>
          <div className="editor-submit-btn">
            <Button variant="outline-dark" onClick={handleSubmit}>Submit</Button>
          </div>
          {/* <div className="result-section">
          <label className="Rh">Result</label>
          </div> */}
        
        
        {/* Verdict Panel */}
        {displayDialog && (
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Verdict</Accordion.Header>
              <Accordion.Body className="verdict-panel">
                {loading ? (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                ) : (
                  <p>{message}</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
        </div>
      </div>
    </div>
    </div>
  );
}



  export default CodeEditor;
