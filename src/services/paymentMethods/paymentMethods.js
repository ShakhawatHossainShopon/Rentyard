import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllPaymentMethods = createAsyncThunk(
  "getAllPaymentMethods",
  async () => {
    return await apiClient
      .get(apiEndPoints.PAYMENT.PAYMENT)
      .then((res) => res.data);
  }
);

export const addPaymentMethod = createAsyncThunk(
  "addPaymentMethod",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.PAYMENT.PAYMENT, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Payment Method...",
      }
    );
    dispatch(getAllPaymentMethods());
  }
);

export const updatePaymentMethod = createAsyncThunk(
  "updatePaymentMethod",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.PAYMENT.PAYMENT, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Payment Method...",
      }
    );
    dispatch(getAllPaymentMethods());
  }
);

export const deletePaymentMethod = createAsyncThunk(
  "deletePaymentMethod",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.PAYMENT.PAYMENT}?paymentMethodId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Payment Method...",
      }
    );
    dispatch(getAllPaymentMethods());
  }
);
