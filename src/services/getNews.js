import axios from "axios";

export const getNews = async (category = "sports") => {
  const API_URL = `https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json`;

  try {
    const res = await axios.get(API_URL);

    if (res.status !== 200) {
      throw new Error(`Failed to get news: ${res.statusText}`);
    }

    return res.data;
  } catch (err) {
    return err.message;
  }
};
