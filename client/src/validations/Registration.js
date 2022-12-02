// https://www.youtube.com/watch?v=RQ1E2EjyqY4
// regex taken from: https://stackoverflow.com/questions/54405911/yup-validation-with-regex-using-matches-problem

import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Your username must be at least 5 characters long.")
    .required("You must enter a username."),
  email: yup
    .string()
    .email("You must enter a valid email.")
    .required("You must enter an email"),
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
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Your password doesn't match the confirmation."
    )
    .required(),
});
