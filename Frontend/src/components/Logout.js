// import { useNavigate, Link } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "./context/AuthProvider";
// import React from 'react';

// const Logout = () => {
//     const { setAuth } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const logout = async () => {
//         // if used in more components, this should be in context 
//         // axios to /logout endpoint 
//         setAuth({});
//         navigate('/');
//     }

//     return (
//         <section>
            
//             <br />
//             <p>Do you want to log out?</p>
//             <br />
//             <div className="flexGrow">
//                 <button onClick={logout}>Log out</button>
//             </div>
//         </section>
//     )
// }

// export default Logout