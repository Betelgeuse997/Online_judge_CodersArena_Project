import React, {useState} from "react";
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
const BACK_SERVER_URL = '3.7.68.95';

const DeleteQuestion = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useAuth();
    const { id } = useParams();
    const handleDeleteQuestion = () => {
        setLoading(true);
        axios.delete(`https://${BACK_SERVER_URL}:5000/question/delete/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then(() => {
            setLoading(false);
            navigate('/');
        }).catch((error) => {
            setLoading(false);
            alert('An error occured. Please check console');
            console.log(error);
    });
};
    return (
        <div>
            <BackButton/>
            {loading ? <Spinner /> : ''}
            <div className="container">
                <h3>Are you sure you want to delete this question?</h3>

                <button
                onClick={handleDeleteQuestion}
                >
                    Yes
                </button>
            </div>
        </div>
    )

}

export default DeleteQuestion
