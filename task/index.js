console.log("JS CODE GOES HERE");
const users =[];
const URL = 'https://jsonplaceholder.typicode.com/users';
const loader = document.querySelector('.loader');
const grid = document.querySelector('.grid');
const searching = document.querySelector('.search-input');
async function distplayUsers() {
    const api = await fetch(URL);
    try {
        if (api.ok) {
            loader.style.display = "none";
            const data = await api.json();
            console.log(data, 'data');
            eachUser(data);
            users.push(...data);
    
        } else {
            throw new Error("something gose wrong");

        }
    } catch (error) {
        console.log(error);
    }
}

distplayUsers();

function eachUser(data) {
    // data.map((name, user, company, address) => {
    //     styleUser(name, user, company, address.street, address.suite, address.city);
    // })
    data.forEach((user) => {
        styleUser(user.name, user.user, user.company, user.address.street, user.address.suite, user.address.city)
    });
}


function styleUser(name, user, company, street, suite, city) {
    const space = name.search(' ');
    // console.log(space);
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    div.innerHTML = `
        <div class="card-header">
          <div class="card-avatar">${name[0]}${name[space + 1]}</div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <p class="card-username">@${user}</p>

          <div class="card-details">
            <p class="card-details-title">Address</p>
            <p class="card-address">
              ${street}, ${suite}<br />
              ${city}
            </p>
          </div>

          <div class="card-details">
            <p class="card-details-title">Company</p>
            <p class="card-company">${company.name}</p>
          </div>
        </div>
    `
    grid.appendChild(div);
}




    searching.addEventListener("input", (e) => {
        grid.innerHTML = ``;
        console.log(users);
        const keyword = e.target.value.toLowerCase();
        const filtered = users.filter(user => user.name.toLowerCase().includes(keyword));
        console.log(filtered);
        eachUser(filtered);
        // console.log(keyword);
        // grid.innerHTML = ``;
        // let word = searching.value.toLowerCase();
        // console.log(word);
        // let filtered = Object.entries(data).filter(user => {
        //     user[1].name.toLowerCase().includes(word);
        //     console.log(user[1].name.toLowerCase().includes(word));
        // });
        // console.log(filtered);
        // eachUser(filtered);
    });
