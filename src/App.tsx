import "./styles.css";
import axios from "axios";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Question from "./Question";

/*
 * Subjects covered by coding challenge
 * ------------------------------
 * 1. Naming Convention
 * 2. Debugging
 * 3. Data Structures and Algorithms
 * 4. React and TypeScript
 * 5. Calling API
 * 6. HTML & CSS styling
 *
 */

const getToken = async (setToken: Dispatch<SetStateAction<string>>) =>
  await axios
    .post("https://interview-questions-dbs.herokuapp.com/login")
    .then((res) => {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

const getData = async (
  token: string,
  setMenu: Dispatch<SetStateAction<any | undefined>>
) => {
  // Add REST API call here to get data using token retrieved from first API
  // (https://interview-questions-dbs.herokuapp.com/welcome (GET))
  // Header: { headers: { Authorization: 'Bearer <<token>>'} }
  axios
    .get("https://interview-questions-dbs.herokuapp.com/welcome", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res) => {
      // console.log(res?.data?.data);
      setMenu(res?.data?.data);
    })

    .catch((err) => {
      console.log(err);
    });
};

const App = () => {
  const [token, setToken] = useState("");
  const [menu, setMenu] = React.useState<any>([]);
  const [history, setHistory] = useState([]);

  // const [oldMenu, setOldMenu] = React.use

  useEffect(() => {
    getToken(setToken);
    if (token) {
      getData(token, setMenu);
    }
    // You can make another API call here to set dropdown menu data
  }, [token]);

  const handleMenu = (oldMenu: any | undefined, newMenu: any = []) => {
    // Handle Menu data here
    let abc = [...history];
    abc.push(oldMenu);
    setHistory(abc);

    if (newMenu?.data) {
      setMenu(newMenu.data);
    }
  };

  const handleBack = () => {
    // Handle Back Button here
    console.log(history);

    setMenu(history[history.length - 1]);

    let temp = [...history];
    temp.pop();
    setHistory(temp);
    //  setMenu()
  };

  return (
    <div className="flex justify-center">
      {/* Start component code here */}
      {/* Code above this line or comment the line below when starting */}

      {history.length > 0 ? <div onClick={handleBack}>Back</div> : ""}
      {menu.map((item, index) => (
        <div
          style={{ padding: "10px", backgroundColor: "cyan", margin: "10px" }}
          onClick={() => handleMenu(menu, item?.children)}
          key={index}
        >
          {item?.name}
        </div>
      ))}
      <Question />
    </div>
  );
};

export default App;
