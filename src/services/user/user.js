import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("getUser", async () => {
  return await apiClient.get(apiEndPoints.USER.USER).then((res) => res.data);
});

export const addUser = createAsyncThunk(
  "getUser",
  async (data, { dispatch }) => {
    await await toast.promise(
      apiClient
        .put(apiEndPoints.USER.USER, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating User Info...",
      }
    );
    dispatch(getUser());
  }
);
