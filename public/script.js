const API = "/api";

// REGISTER
async function register() {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  });

  alert("Registered");
  window.location = "login.html";
}

// LOGIN
async function login() {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.accessToken) {
    localStorage.setItem("token", data.accessToken);
    window.location = "dashboard.html";
  } else {
    alert("Login Failed");
  }
}

// GET BALANCE
async function getBalance() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/account/balance`, {
    headers: { Authorization: token }
  });

  if (res.status === 401) {
    alert("Token expired or invalid");
    return;
  }

  const data = await res.json();
  balance.innerText = "Balance: ₹" + data.balance;
}

// DEPOSIT
async function deposit() {
  const token = localStorage.getItem("token");

  await fetch(`${API}/account/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ amount: Number(amount.value) })
  });

  alert("Deposited");
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location = "login.html";
}