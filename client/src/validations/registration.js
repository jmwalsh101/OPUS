// https://www.youtube.com/watch?v=RQ1E2EjyqY4
// regex taken from: https://stackoverflow.com/questions/54405911/yup-validation-with-regex-using-matches-problem

import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(0)
    .max(10)
    /*
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Invalid format"
    )
    */
    .required(),
});
