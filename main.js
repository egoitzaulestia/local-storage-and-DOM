// JS script of Personal Contact Local Storage exercise

// const { json } = require("express");

const form = document.getElementById('contact-form');
const idInput = document.getElementById('id')
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageImput = document.getElementById('message');
const imageUrlInput = document.getElementById('image-url');
const peopleList = document.getElementById('users-list');

// Load exiting data on page load 
document.addEventListener('DOMContentLoaded', displayPeople);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = parseInt(idInput.value);
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageImput.value.trim();
    const imageURL = imageUrlInput.value.trim();


    if (isNaN(id) || !name || !email || !message || !imageURL) {
        return;
    }

    let data = JSON.parse(localStorage.getItem('users')) || [];

    // Check if ID already exists
    /////////////////////////////
    // findIndex will go through the array and check each object's `id`
    // If it finds an object with id equal to the provided id,
    // it returns the index (position in the array).
    // Otherwise, it returns -1.
    const existingIndex = data.findIndex(p => p.id === id);

    if (existingIndex !== -1) {
        // If an object with the given id is found (existingIndex is not -1),
        // update that object's name. 
        data[existingIndex].name = name;
    } else {
        // If no object with the given id is found (existingIndex is -1),
        // add a new object to the array.
        data.push({ id, name, email, message, imageURL });
    }

    localStorage.setItem('users', JSON.stringify(data));

    idInput.value = '';
    nameInput.value = '';
    emailInput.value = '';
    messageImput.value = '';
    imageUrlInput.value = '';
    displayPeople();
})

function displayPeople() {
    const data = JSON.parse(localStorage.getItem('users')) || [];
    peopleList.innerHTML = '';
    data.forEach(user => {
        const li = document.createElement('li');
        // li.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Message: ${user.message}, ImageURL: ${user.imageURL}`;
        li.innerHTML = `<b>ID:</b> ${user.id},<br><b>Name:</b> ${user.name},<br><b>Email:</b> ${user.email},<br><b>Message:</b> ${user.message},<br><b>ImageURL:</b> ${user.imageURL}`;
        peopleList.appendChild(li);
    });
}

const clearAllData = document.getElementById('clear-data-btn');
const removeUser = document.getElementById('remove-user-btn');

clearAllData.addEventListener('click', clearLocalStorage);
removeUser.addEventListener('click', removeUserFromLocalStorage);

function clearLocalStorage() {
    localStorage.clear();
    peopleList.innerHTML = '';
}

function removeUserFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('users')) || [];
    const idUserToRemove = Number(document.getElementById('id-remove-user').value || '');
    console.log(idUserToRemove);

    // Validate input
    if (!idUserToRemove) {
        console.error('User not found');
        return;
    }

    // Check if the ID exists in the data
    const userToRemove = data.find(user => user.id === idUserToRemove);
    // If the user is not found, log an error
    if (!userToRemove) {
        console.error('User not found');
        return;
    }

    // Remove the user from the data array
    const updatedData = data.filter(user => user.id !== idUserToRemove);
        
    // Update localStorage with the modified data
    localStorage.setItem('users', JSON.stringify(updatedData));
    
    // Clear the input field
    document.getElementById('id-remove-user').value = '';
    
    // Refresh the displayed list of users
    displayPeople();
}

function dbAlertMessage(){
    
}

/*

- I have to delete an object from the array of objects
- I'm gonna act through the index
- localStorage.removeItem()

*/

// localStorage.clear()
