import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";



import firestoreDatabase from "../firebaseConfig";
import { message } from "antd";

export const BookDoctorAppointment = async (payload) => {
  try {
    // First, save the appointment to your database
    const docRef = await addDoc(collection(firestoreDatabase, "appointments"), payload);
    
    // Then make a request to your backend to send an email
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: payload.userEmail,  // "to" instead of "toEmail"
        subject: 'Appointment Confirmation',  // Added a subject
        text: `Your appointment on ${payload.bookedOn} is confirmed. Details: ${payload.problem}`  // "text" instead of "description"
      })
    });
    
    
    const responseData = await response.json(); // Adjust based on how your backend sends responses
    if (response.ok) {
      return { success: true, message: "Appointment booked successfully, " + responseData.message };
    } else {
      throw new Error(responseData.message);
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const GetDoctorAppointmentsOnDate = async (doctorId, date) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestoreDatabase, "appointments"),
        where("doctorId", "==", doctorId),
        where("date", "==", date)
      )
    );
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const GetDoctorAppointments = async (doctorId) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestoreDatabase, "appointments"),
        where("doctorId", "==", doctorId)
      )
    );
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const GetUserAppointments = async (userId) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestoreDatabase, "appointments"),
        where("userId", "==", userId)
      )
    );
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const UpdateAppointmentStatus = async (id, status) => {
  try {
    await updateDoc(doc(firestoreDatabase, "appointments", id), {
      status,
    });
    return { success: true, message: "Appointment status updated" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
