import { useState, useEffect } from "react";

export function useData () {

    const [data, setData] = useState([]);


    useEffect( () => {

    console.log("長野で研究しています" )

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        console.log(response, "取得の確認");

        const data = await response.json();
        console.log(data,"中身を確認");

        setData(data);

      } catch (error) {
        console.error("Error !!!!!!", error);
      }

      // この下は消さない🤗
    };

    fetchData();

  },[]);


  return{
    data
  };

}