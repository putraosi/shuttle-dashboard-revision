import ApiClient from "./ApiClient";

export const Api = {
  post: async ({ url, body = {}, showLog }) => {
    try {
      if (showLog) {
        console.log("API URL", url);
        console.log("API BODY", body);
      }

      const res = await ApiClient.post(url, body);

      if (showLog) console.log("API RES", res);

      return res?.data?.data || res?.data;
    } catch (error) {
      if (showLog) console.log("API ERROR", error);

      throw error;
    }
  },

  graphql: async ({ query, variables = {}, showLog }) => {
    try {
      if (showLog) {
        console.log("GRAPHQL BODY", variables);
      }

      const res = await ApiClient.post("/graphql", { query, variables });

      if (showLog) console.log("GRAPHQL RES", res.data);

      if (res?.data?.errors) {
        throw res.data.errors[0];
      }

      return res?.data?.data || res?.data;
    } catch (error) {
      if (showLog) console.log("GRAPHQL ERROR", error);

      if (error?.response?.data?.errors?.length)
        throw error?.response?.data?.errors[0];
      throw error;
    }
  },

  get: async ({ url, params = {}, showLog }) => {
    try {
      if (showLog) {
        console.log("API URL", url);
        console.log("API PARAMS", params);
      }

      const res = await ApiClient.get(url, { params });

      if (showLog) console.log("API RES", res);

      return res?.data?.data || res?.data;
    } catch (error) {
      if (showLog) console.log("API ERROR", error);

      throw error;
    }
  },
};
