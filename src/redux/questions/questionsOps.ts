import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IQuestionsIdResponse } from "../../types/index.types";

const SPACE = import.meta.env.VITE_SPACE_ID;
const ENVIRONMENTS = import.meta.env.VITE_ENVIRONMENTS;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const contentfulAxios = axios;

axios.defaults.baseURL = "https://cdn.contentful.com";

export const fetchQuestionsId = createAsyncThunk<IQuestionsIdResponse>(
  "questions/fetchQuestions",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/spaces/${SPACE}/environments/${ENVIRONMENTS}/entries/5VLkNsPSoRFhqEFNPQpJKc?&access_token=${ACCESS_TOKEN}`,
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  },
);
