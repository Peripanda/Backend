// Function
function checkPassword(str) {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
  return re.test(str);
}

exports.checkPassword = checkPassword;
