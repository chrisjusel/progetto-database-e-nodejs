const urlAPI = "http://localhost:3000/api/employees"
let employeeList = [];

document.addEventListener('DOMContentLoaded', function(){
    getAllEmployees();
})

function getAllEmployees(){
    fetch(urlAPI, {method: 'GET'}).then(response => response.json()).then(json => {
        employeeList = json;
        console.log(employeeList);
        printEmployeeList();
    })
}

function printEmployeeList(){
    let lista = document.querySelector('.container');
    lista.innerHTML = '';
    employeeList.forEach(ele => {
        let data = new Date(Date.parse(ele.START_DATE));
        let formattedData = new Intl.DateTimeFormat('it-IT', { dateStyle: 'full'}).format(data);
        
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML =
        `
        <img class="card-img-top" src="img/man.png" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${ele.FIRST_NAME + ' ' + ele.LAST_NAME}</h5>
            <p class="card-text">Inizio lavoro: ${formattedData}</p>
            <a href="#" class="btn btn-primary">Visualizza profilo</a>
        </div>
        `
        lista.appendChild(card);
        //
    })
}