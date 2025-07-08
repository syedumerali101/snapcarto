const isEmailValid = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordValid = (password: string) => password.length >= 6;

const isNameValid = (name: string) => /^[A-Za-z]+$/.test(name);



export default {
    isEmailValid,
    isPasswordValid,
    isNameValid
}