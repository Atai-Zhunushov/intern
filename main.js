const modal = document.querySelector('.modal')
const btn = document.querySelector('.btn')
const btnDelete = document.querySelector('.btnDelete')
const input = document.querySelector('input')
const getUser = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(resp => resp.json())
        .then(data => {
            updateTable(data)
        })
        .catch(error => {
            console.error("Ошибка при получении данных:", error);
            showModal()
        });
}
const deleteRow = () => {
   const tableBody = document.querySelector('tbody');
   tableBody.innerHTML = ''
}
const updateTable = (data) => {
    const keyword = input.value.trim().toLowerCase();
    const filteredUsers = data.filter(user =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    );
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    if (filteredUsers.length > 0) {
        filteredUsers.forEach((user) => {
            const newRow = document.createElement('tr');
            const userColumn = document.createElement('td');
            const nameColumn = document.createElement('td');
            const phoneColumn = document.createElement('td');
            const emailColumn = document.createElement('td');

            userColumn.textContent = user.id;
            nameColumn.textContent = user.name;
            phoneColumn.textContent = user.phone;
            emailColumn.textContent = user.email;

            newRow.appendChild(userColumn);
            newRow.appendChild(nameColumn);
            newRow.appendChild(phoneColumn);
            newRow.appendChild(emailColumn);
            tbody.appendChild(newRow);
        });
    } else {
        deleteRow();
    }
}
const showModal = () => {
    modal.style.display = 'block';
}

const closeModal = () => {
    modal.style.display = 'none';
}
btn.addEventListener('click' , getUser)
btnDelete.addEventListener('click' , deleteRow)
input.addEventListener('input', getUser);


