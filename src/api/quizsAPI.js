const BASE_URL = "http://localhost:5000/quizs";

export const createQuiz = async (quizData) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
    });
    const data = await res.json();
    return {
      success: true,
      message: "Create quiz success",
      data: data,
    };
  } catch (error) {
    console.log("Error in create quiz : ", error);
    return {
      success: false,
      message: "Fail to Create quiz",
    };
  }
};

export const getAllQuizs = async (options) => {
  try {
    let queryString = "";
    if (options && options.length > 0) {
      queryString = options.reduce(
        (prev, option) => prev + "&" + option.key + "=" + option.value,
        ""
      );
      queryString = "?" + queryString.slice(1, queryString.length);
    }
    const res = await fetch(`${BASE_URL}${queryString}`);
    const data = await res.json();
    return {
      success: true,
      message: "get all quiz success",
      data: data,
    };
  } catch (error) {
    console.log("Error in get all quiz : ", error);
    return {
      success: false,
      message: "Fail to get all quiz",
    };
  }
};

export const getQuizById = async (quizId) => {
  try {
    const res = await fetch(`${BASE_URL}/${quizId}`);
    const data = await res.json();
    return {
      success: true,
      message: "Get quiz success",
      data: data,
    };
  } catch (error) {
    console.log("Error in get quiz : ", error);
    return {
      success: false,
      message: "Fail to get quiz",
    };
  }
};

export const updateQuiz = async (quizId, newData) => {
  try {
    const res = await fetch(`${BASE_URL}/${quizId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    const data = await res.json();
    return {
      success: true,
      message: "Update quiz success",
      data: data,
    };
  } catch (error) {
    console.log("Error in update quiz : ", error);
    return {
      success: false,
      message: "Fail to update quiz",
    };
  }
};

export const patchQuiz = async (quizId, newData) => {
  try {
    const res = await fetch(`${BASE_URL}/${quizId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    const data = await res.json();
    return {
      success: true,
      message: "Patch quiz success",
      data: data,
    };
  } catch (error) {
    console.log("Error in patch quiz : ", error);
    return {
      success: false,
      message: "Fail to patch all quiz",
    };
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const res = await fetch(`${BASE_URL}/${quizId}`, {
      method: "DELETE",
    });
    return {
      success: true,
      message: "Delete quiz success",
    };
  } catch (error) {
    console.log("Error in delete quiz : ", error);
    return {
      success: false,
      message: "Fail to delete the specified quiz",
    };
  }
};
