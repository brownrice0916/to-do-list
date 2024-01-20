// src/hooks/useSaveStateMsg.js
import { useState, useEffect } from "react";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import db from "../firebaseconfig";

const useSaveStateMsg = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, collectionName, "unique-doc-id");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [collectionName]);

  const addData = async (newData) => {
    try {
      await setDoc(doc(db, collectionName, "unique-doc-id"), newData);
      setData(newData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const updateData = async (newData) => {
    try {
      const docRef = doc(db, collectionName, "unique-doc-id");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, newData);
      } else {
        // 문서가 존재하지 않으면 setDoc을 사용하여 새 문서를 생성
        await setDoc(docRef, newData);
      }

      setData(newData);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return { data, loading, addData, updateData };
};

export default useSaveStateMsg;
