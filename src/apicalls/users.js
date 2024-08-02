import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import firestoreDatabase from "../firebaseConfig";
import CryptoJS from "crypto-js";

export const CreateUser = async (payload) => {
  try {
    // check if user already exists using email
    const qry = query(
      collection(firestoreDatabase, "users"),
      where("email", "==", payload.email)
    );
    const querySnapshot = await getDocs(qry);
    if (querySnapshot.size > 0) {
      throw new Error("User already exists");
    }

    //hashed password
    const hashedPassword = CryptoJS.AES.encrypt(
      payload.password,
      "immunicare"
    ).toString();
    payload.password = hashedPassword;

    const docRef = collection(firestoreDatabase, "users");
    await addDoc(docRef, payload);
    return {
      success: true,
      message: "User created succesfully",
    };
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (payload) => {
  try {
    const qry = query(
      collection(firestoreDatabase, "users"),
      where("email", "==", payload.email)
    );
    const userSnapshots = await getDocs(qry);
    if (userSnapshots.size === 0) {
      throw new Error("User does not exist");
    }

    //decrypt password
    const user = userSnapshots.docs[0].data();
    const bytes = CryptoJS.AES.decrypt(user.password, "immunicare");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== payload.password) {
      throw new Error("Incorrect password");
    }

    return {
      success: true,
      message: "User logged in successfully",
      data: user,
    };
  } catch (error) {
    return error;
  }
};
