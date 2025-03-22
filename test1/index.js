function validate() {
  const email = document.getElementById("email").value;
  console.log(email);
  let valid = email.includes("@");
  if (!valid) {
    alert("Email is bad. Fix it!");
  }
  const name = document.getElementById("name").value;
  if (name.length < 5 && name.length > 20) {
    valid = false;
    alert("Email is bad. Fix it!");
  }
  const state = document.getElementById("state").value;
  if (state.charCodeAt(0) >= 65 && state.charCodeAt(0) <= 90 && state.charCodeAt(1) >= 65 && state.charCodeAt(1) <= 90) {
    alert("state is bad. Fix it!");
    valid = false
  }
  return valid;
}



