export const emailValidator = (email) => {
  let error;
  // RFC 2822 compliant regex
  if (!email) error = "Email required.";
  else if (
    email.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )
  ) {
    return null;
  } else error = "Invalid email";
  return error;
};

export const passwordValidator = (password) => {
  let error;
  // {6,100}           - Assert password is between 6 and 100 characters
  // (?=.*[0-9])       - Assert a string has at least one number
  if (!password) error = "Password required.";
  else if (password) {
    if (
      password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
    ) {
      return null;
    } else error = "Invalid password.";
  }
  return error;
};

export const matchPassword = (password, confirmPassword) => {
  let error;
  if (!confirmPassword) error = "Confirm password required.";
  else if (confirmPassword) {
    if (password === confirmPassword) return null;
    else error = `password doesn't match.`;
  }
  return error;
};

export const onlyNumber = (control) => {
  let error;
  if (!control) error = "Required.";

  if (control) {
    if (control.toString().match(/^-?(0|[1-9]\d*)?$/)) return null;
    else error = "Should be a number.";
  }
  return error;
};

export const onlyChars = (control) => {
  if (control.value) {
    if (
      control.value
        .toString()
        .match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    ) {
      return null;
    }
    return { invalidChar: true };
  }
};

export const alphaNumericValidator = (control) => {
  if (control.value) {
    if (control.value.match(/^[a-z A-Z0-9_]*$/)) {
      return null;
    } else {
      return { invalidPattern: true };
    }
  }
};

export const userNameValidator = (username) => {
  let error;
  if (!username) error = "Username required.";
  else if (username) {
    if (username.match(/^[a-z A-Z0-9_-]{3,30}$/)) {
      return null;
    } else error = "Invalid username.";
  }
  return error;
};

export const checkNumber = (control) => {
  if (control.value) {
    if (control.value.includes("(")) {
      control.value = control.value
        .replace("(", "")
        .replace(")", "")
        .replace("-", "")
        .replace(" ", "");
    }
    if (
      control.value
        .toString()
        .match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    ) {
      return null;
    } else {
      return { invalidNum: true };
    }
  }
};

export const urlValidator = (control) => {
  if (control.value) {
    if (
      control.value.match(
        /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
      )
    ) {
      return null;
    } else {
      return { invalidUrl: true };
    }
  }
};

export const onlyCharsWithSpace = (control) => {
  if (control.value) {
    if (control.value.toString().match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)) {
      return null;
    }
    return { invalidChar: true };
  }
};

export const onlyPhoneNumber = (control) => {
  if (control.value) {
    if (
      control.value
        .toString()
        .match(
          /^(?=(?:\D*\d){10,15}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$/
        )
    ) {
      return null;
    }
    return { invalidPhoneNumber: true };
  }
};

export const removeNullError = (errors) => {
  Object.keys(errors).forEach((key) => {
    if (errors[key] === null) {
      delete errors[key];
    }
  });
  return errors;
};
