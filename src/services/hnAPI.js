import axios from "axios";

export const BASE_URL = "https://hacker-news.firebaseio.com/v0/";

export const getStoryIds = async (category) => {
  const res = await axios.get(`${BASE_URL}${category}.json`);
  return res.data;
};

export const getStory = async (storyId) => {
  const resp = await axios.get(`${BASE_URL}item/${storyId}.json`);
  return resp.data;
};
