function SignUp() {
    const User_name = document.getElementById("user_name").value;
    if (!(User_name.length > 8 && User_name.length < 15)) {
        alert("Username cannot be less than 8 or more than 15");
        return false;
    }
    const Email = document.getElementById("email").value;
    console.log(Email);
    if (!((Email.includes("@") && Email.includes(".in")) || (Email.includes("@") && Email.includes(".com")) || (Email.includes("@") && Email.includes(".edu")))) {
        alert("Please check your mail and try again");
        return false;
    }
    const Phone_No = document.getElementById("telephone").value;
    if (Phone_No.length != 10) {
        alert("Phone no cannot be more than 10 digits long");
        return false;
    }
}

function Login() {
    const User_name = document.getElementById("user_name").value;
    const Pass_word = document.getElementById("pass").value;
    if (User_name == "snehil" && Pass_word == "password") {
        alert("Login successfull");
    }
    else {
        alert("Invalid username or password!please try again");
    }
}