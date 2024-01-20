import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import db from "../firebaseconfig"; // Firebase 설정 파일 경로에 맞게 수정

const useFirestore = (collectionName, selectedDate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedDate);

        startDate.setDate(selectedDate.getDate() - (selectedDate.getDay() - 1)); // Monday
        endDate.setDate(selectedDate.getDate() + (7 - selectedDate.getDay())); // Thursday

        // Fetch data within the date range (Monday to Thursday)
        const querySnapshot = await getDocs(
          query(
            collection(db, collectionName),
            where("date", ">=", startDate),
            where("date", "<=", endDate),
            orderBy("date")
          )
        );

        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Filter documents based on the selectedDate
        // const filteredData = documents.filter((item) => {
        //   // Assuming your data has a 'date' property
        //   return item.date === selectedDate;
        // });
        setData(documents);
        console.log("filteredData", documents);
        setLoading(false);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [collectionName, selectedDate]);

  const addDocument = async (document) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), document);
      console.log("Document added with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteDocument = async (docId) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const updateDocument = async (docId, updatedFields) => {
    try {
      const docRef = doc(collection(db, collectionName), docId);
      await updateDoc(docRef, updatedFields);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const getCollectionData = async (selectedDate, orderBy) => {
    try {
      // 특정 날짜에 해당하는 데이터만 가져오기 위한 쿼리 작성
      const querySnapshot = await getDocs(
        query(
          collection(db, collectionName),
          where("date", "==", selectedDate),
          orderBy(orderBy)
        )
      );

      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Documents loaded successfully:", documents);
      setData(documents);
      return documents;
    } catch (error) {
      console.error("Error loading documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    addDocument,
    deleteDocument,
    getCollectionData,
    updateDocument,
  };
};

export default useFirestore;
