// checking inputs validation (register form)
// initialState is passed on from consuming component (register component)
export const validateField = (fieldName, fieldValue, initialState) => {
  let nameValid = false,
    emailValid = false,
    passwordValid = false,
    feedBackMsg = "";

  switch (fieldName) {
    case "name":
      nameValid = /^[a-zA-Z]+/i.test(fieldValue) && fieldValue.length > 2;
      feedBackMsg = nameValid ? "" : "Please check Name!";
      break;
    case "email":
      emailValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g.test(fieldValue);
      feedBackMsg = emailValid ? "" : "Please check Email!";
      break;
    // case "password":
    // case "confirmPassword":
    //   passwordValid =
    //     fieldValue.length > 5 &&
    //     initialState.password === initialState.confirmPassword;
    //   feedBackMsg = passwordValid ? "" : "Please check Password!";
    // break;
    default:
      break;
  }

  return {
    nameValid,
    emailValid,
    passwordValid,
    feedBackMsg,
  };
};
