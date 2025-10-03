import axios from 'axios';
import { config } from './config';

export async function login(email,password){

  const url = `${config.cocoServerBaseURL}/coco/login`
 try {
    const response = await axios.post(url, {
      email,
      password
    });

    return response.data; 
  } catch (error) {
    console.error("Login error:", error);
    return {
      status: "error",
      error: error.response?.data?.error || error.message,
    };
  }
}

export async function register(first_name,last_name,course_name,email,password){

  const url = `${config.cocoServerBaseURL}/coco/newRegister`
     try{
    const response = await axios.post(url, {
        first_name,
        last_name,
        course_name,
        email,
        password,
        
    });
    return response.data;
 } catch (err) {
    return {
        status: "error",
        error:err.response?.data?.error || err.message
    };
 }
}

