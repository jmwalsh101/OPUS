// https://www.youtube.com/watch?v=RQ1E2EjyqY4

import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(0).max(10).required(),
});
