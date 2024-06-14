import axios from "axios";
// import { BACK_SERVER_URL } from "../config/config";
const BACK_SERVER_URL = '13.232.180.30';

export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `http://${BACK_SERVER_URL}:5000/user/signUp`,
      userData
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getUser = async (userData) => {
  try {
    const response = await axios.post(
      `https://${BACK_SERVER_URL}:5000/user/signIn`,
      userData
    );
    return response;
  } catch (error) {
    return error;
  }
};

// export const forgotPassword = async (email) => {
//   try {
//     const response = await axios.post(
//       `https://${BACK_SERVER_URL}:5000/user/forgotPassword`,
//       { email }
//     );
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const resetPassword = async (password, token) => {
//   try {
//     const response = await axios.put(`https://${BACK_SERVER_URL}:5000/user/resetPassword`, {
//       password,
//       token,
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const createProblem = async (problemData, token) => {
//   try {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     const response = await axios.post(
//       `https://${BACK_SERVER_URL}:5000/problems/add`,
//       problemData,
//       { headers }
//     );
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const getProblemToEdit = async (problemId, token) => {
//   try {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     const response = await axios.get(
//       `https://${BACK_SERVER_URL}:5000/problems/edit/${problemId}`,
//       { headers }
//     );

//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const getProblem = async (problemId, token) => {
//   try {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     const response = await axios.get(
//       `https://${BACK_SERVER_URL}:5000/problems/${problemId}`,
//       { headers }
//     );

//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const updateProblem = async (token, problemId, problemData) => {
//   try {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     const response = await axios.put(
//       `https://${BACK_SERVER_URL}:5000/problems/edit/${problemId}`,
//       problemData,
//       { headers }
//     );

//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const fetchProblems = async (token) => {
//   try {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     const response = await axios.get(`https://${BACK_SERVER_URL}:5000/problems/list`, {
//       headers,
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const deleteProblem = async (token, problemId) => {
//   try {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     const response = await axios.delete(
//       `https://${BACK_SERVER_URL}:5000/problems/delete/${problemId}`,
//       {
//         headers,
//       }
//     );
//     return response.status === 200;
//   } catch (error) {
//     return error;
//   }
// };

export const submitquestion = async (data, token) => { 
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept:'application/json',
    };
    const response = await axios.post(
      `http://${BACK_SERVER_URL}:5000/question/submit`,
      data,
      
      {
        headers,
      }
    ); 
    return response.data;
  } catch (error) { 
    return error;
  }
};

export const fetchSubmissions = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`http://${BACK_SERVER_URL}:5000/submissions/history`, {
      headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// export const fetchScores = async (token) => {
//   try {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     const response = await axios.get(
//       `https://${BACK_SERVER_URL}:5000/submissions/leaderBoard`,
//       {
//         headers,
//       }
//     );
//     return response.data.data;
//   } catch (error) { 
//     return error;
//   }
// };
