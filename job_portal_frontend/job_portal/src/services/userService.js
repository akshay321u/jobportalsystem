import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:7777",
  timeout: 10000,
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN SENT:", token);

    if (
      token &&
      token !== "undefined" &&
      token !== "null"
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      "Something went wrong";

    console.error("API Error:", status, message);

    const token = localStorage.getItem("token");

   
    if (
      status === 401 &&
      token &&
      token !== "undefined" &&
      token !== "null"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");

      alert("Session expired. Please login again.");
      window.location.href = "/login";
    }

    return Promise.reject({
      status,
      message,
      originalError: error,
    });
  }
);


export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);

  console.log("FULL LOGIN RESPONSE:", response.data);

  
  if (typeof response.data === "string") {
    throw new Error(response.data);
  }

  const {
    id,
    token,
    role,
    name = "",
    email = credentials.email,
  } = response.data;

  if (!token) {
    throw new Error("Token not received from backend");
  }


  localStorage.setItem("token", token);

  
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      id,
      name,
      email,
      role,
      ...response.data,
    })
  );

  console.log("TOKEN SAVED:", localStorage.getItem("token"));
  console.log(
    "CURRENT USER:",
    JSON.parse(localStorage.getItem("currentUser"))
  );

  return response.data;
};


export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
};




export const applyForJob = async (applicationData) => {
  const response = await API.post(
    "/applications/apply",
    applicationData
  );
  return response.data;
};


export const getMyApplications = async () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser?.id) {
    throw new Error("User not logged in");
  }

  const response = await API.get(
    `/applications/user/${currentUser.id}`
  );

  return response.data;
};


export const getProfile = async () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser?.email) {
    throw new Error("User not logged in");
  }

  const response = await API.get(
    `/users/profile?email=${currentUser.email}`
  );

  return response.data;
};


export const updateProfile = async (profileData) => {
  const response = await API.put(
    "/users/profile",
    profileData
  );
  return response.data;
};

export const uploadResume = async (formData) => {
  const response = await API.post(
    "/users/resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const uploadProfileImage = async (formData) => {
  const response = await API.post(
    "/users/profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const getJobs = async () => {
  const response = await API.get("/jobs");
  return response.data;
};


export const getJobById = async (id) => {
  const response = await API.get(`/jobs/${id}`);
  return response.data;
};


export const createJob = async (jobData) => {
  const response = await API.post("/jobs", jobData);
  return response.data;
};


export const updateJob = async (id, jobData) => {
  const response = await API.put(`/jobs/${id}`, jobData);
  return response.data;
};


export const deleteJob = async (id) => {
  const response = await API.delete(`/jobs/${id}`);
  return response.data;
};


export const getStudents = async () => {
  const response = await API.get("/students");
  return response.data;
};

export const addStudent = async (student) => {
  const response = await API.post("/students", student);
  return response.data;
};

export const updateStudent = async (id, student) => {
  const response = await API.put(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await API.delete(`/students/${id}`);
  return response.data;
};

export const scheduleInterview = async (data) => {
  const response = await API.post(
    "/interviews",
    data
  );

  return response.data;
};

export const getUserInterviews = async (userId) => {
  const response = await API.get(
    `/interviews/user/${userId}`
  );

  return response.data;
};

export const getEmployerInterviews = async (
  employerId
) => {
  const response = await API.get(
    `/interviews/employer/${employerId}`
  );

  return response.data;
};
export default API;