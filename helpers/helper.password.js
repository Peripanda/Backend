//Function
function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
    return re.test(str);
}

exports.checkPassword = checkPassword