// import React, { createContext, useContext, useEffect, useState } from "react";
// import { authDataContext } from "./AuthContext";
// import axios from "axios";

// export const userDataContext = createContext();

// const UserContext = ({ children }) => {
//   let { serverUrl } = useContext(authDataContext);
//   const [userdata, setUserData] = useState(null);

//   const getCurrentUser = async () => {
//     try {
//       const result = await axios.get(serverUrl + "/user/currentuser", {
//         withCredentials: true,
//       });
//       setUserData(result.data);
//     } catch (error) {
//       setUserData(null);
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getCurrentUser();
//   }, []);
//     let value = {
//     userdata,
//     setUserData,
//   };
//   return (
//     <div>
//       <userDataContext.Provider value={value}>
//         {children}
//       </userDataContext.Provider>
//     </div>
//   );
// };

// export default UserContext;
import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const { serverUrl } = useContext(authDataContext);

  const [userdata, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/user/currentuser", {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={{ userdata, setUserData, loading,getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
