export const validateEmail = (email) => {
  if (email.length === 0) {
    return true;
  }

  return (
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) && email.length <= 50
  );
};

export const validatePassword = (password) => {
  if (password.length === 0) {
    return true;
  }

  return password.length >= 4 && password.length <= 16;
};
