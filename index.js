let find = (name) => document.getElementById(name);

let findClass = (name) => document.getElementsByClassName(name);

let entries_arr = [];

function getSavedEntries() {
    let data = localStorage.getItem("entries_arr");
    if (data) {
        entries_arr = JSON.parse(data);
    } else {
        entries_arr = [];
    }
    return entries_arr;
}
entries_arr = getSavedEntries();

let user = find("name"),
  email = find("email"),
  pass = find("password"),
  terms = find("terms"),
  dob = find("dob");

let errorClass = findClass("errorClass");

let myform = find("form123");

function validateField(field, msg, cond) {
    if (cond) {
        field.style.border = "2px solid red";
        field.setCustomValidity(msg);
        field.reportValidity();
    } else {
        field.style.border = "2px solid green";
        field.setCustomValidity('');
    }
}

function checkAge() {
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    return age >= 18 && age <= 55;
}

let err_msg_user = "Name should have at least 3 characters";
let err_msg_email = "Enter a valid email";
let err_msg_terms = "Agree to the terms and conditions";
let err_msg_dob = "Age must be between 18 and 55";

user.addEventListener("input", (e) => {
    let user_cond = user.value.length < 3;
    e.preventDefault();
    validateField(user, err_msg_user, user_cond);
});

email.addEventListener("input", (e) => {
    let email_cond = !(email.value.includes("@") && email.value.includes("."));
    e.preventDefault();
    validateField(email, err_msg_email, email_cond);
});

dob.addEventListener("input", (e) => {
    let dob_cond = !checkAge();
    e.preventDefault();
    validateField(dob, err_msg_dob, dob_cond);
});

terms.addEventListener("input", (e) => {
    let terms_cond = !terms.checked;
    e.preventDefault();
    validateField(terms, err_msg_terms, terms_cond);
});

function makeEntry() {
    let agreed = terms.checked ? true : false;
    let entry = {
        name: user.value,
        email: email.value,
        password: pass.value,
        dob: dob.value,
        agreed: agreed
    };
    return entry;
}

function showTable() {
    let table = find("entries");
    let entries = entries_arr;
    let content = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
    for (let i = 0; i < entries.length; i++) {
        content += `<tr>
                    <td>${entries[i].name}</td>
                    <td>${entries[i].email}</td>
                    <td>${entries[i].password}</td>
                    <td>${entries[i].dob}</td>
                    <td>${entries[i].agreed}</td>
                </tr>\n`;
    }
    table.innerHTML = content;
}

myform.addEventListener("submit", (e) => {
    let terms_cond = !terms.checked;
    e.preventDefault();
    if (!terms_cond) {
        let entry = makeEntry();
        entries_arr.push(entry);
        localStorage.setItem("entries_arr", JSON.stringify(entries_arr));
    }
    showTable();
});

window.onload = (event) => {
    showTable();
};
