import axios from "axios";

export const BASE_URL = "https://hacker-news.firebaseio.com/v0/";
export const newStories_URL = `${BASE_URL}newstories.json`;
export const topStories_URL = `${BASE_URL}topstories.json`;
export const showStories_URL = `${BASE_URL}showstories.json`;
export const jobStories_URL = `${BASE_URL}jobstories.json`;
export const askStories_URL = `${BASE_URL}askstories.json`;
export const bestStories_URL = `${BASE_URL}beststories.json`;
export const story_URL = `${BASE_URL}item/`;

export const getStoryIds = async (category) => {
  const res = await axios.get(`${BASE_URL}${category}.json`);
  return res.data;
};

export const newStoryIds = async () => {
  const res = await axios.get(newStories_URL);
  return res.data;
};
export const askStoryIds = async () => {
  const res = await axios.get(askStories_URL);
  return res.data;
};

export const getStory = async (storyId) => {
  const resp = await axios.get(`${story_URL + storyId}.json`);
  return resp.data;
};
