import axios from 'axios';

export async function login(email,password){
 try {
    const response = await axios.post("http://localhost:4003/coco/login", {
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
     try{
    const response = await axios.post("http://localhost:4003/coco/newRegister", {
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

