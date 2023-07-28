let container = document.getElementById('cont');
let all = document.getElementById('all');
let reg = document.getElementById('reg');
let sug = document.getElementById('sug');

let baseUrl = 'http://localhost:8000/api/user';

if(!localStorage.getItem("userToken")){
    window.location.href="http://127.0.0.1:5500/Rupeek_event/Frontend/index.html";
}


// const utils=require('./utils');
const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
    }
};

const register = async (id) => {
    try {
        ///event/:id
        await axios.put(baseUrl + `/event/${id}`, {}, config);
        alert("Registration successful");
    } catch (error) {
        console.log(error);
    }
}

const getAllEvents = () => {
    axios.get(baseUrl + '/events', config)
        .then(({ data }) => {
            console.log(data);
            let html = "";
            data.forEach((e) => {
                // e[0]=e[0].toUpperCase();
                let eventname = e.name.text;
                eventname = eventname[0].toUpperCase()+eventname.slice(1);
                let date = new Date(e.start.utc).toString().slice(0, 15);
                console.log(date);
                html += `<div class="card">
          <div class="box">
            <div class="content">
              <h3>${eventname}</h3>
              <p><i class="fa-regular fa-calendar"></i> ${date}</p>
              <button onclick="register(${e.id})" >Register</button>
            </div>
          </div>
        </div>`
            })
            container.innerHTML = html;
        })
        .catch((err) => {
            console.log(err);
        })
}


const getSuggestions = async () => {
    try {
        const { data } = await axios.get(baseUrl + '/events/suggestions', config);
        let html = "";
        data.forEach((e) => {
            // e[0]=e[0].toUpperCase();
            let eventname = e.name.text;
            eventname[0] = eventname[0].toUpperCase();
            let date = new Date(e.start.utc).toString().slice(0, 15);
            console.log(date);
            html += `<div class="card">
          <div class="box">
            <div class="content">
              <h3>${eventname}</h3>
              <p><i class="fa-regular fa-calendar"></i> ${date}</p>
              <button onclick="register(${e.id})" >Register</button>
            </div>
          </div>
        </div>`
        })
        container.innerHTML = html;
    } catch (error) {
        console.log(error);
    }
}

const getRegistered = async () => {
    try {
        const { data } = await axios.get(baseUrl + '/events/registered', config);
        let html = "";
        data.forEach((e) => {
            // e[0]=e[0].toUpperCase();
            let eventname = e.name.text;
            eventname[0] = eventname[0].toUpperCase();
            let date = new Date(e.start.utc).toString().slice(0, 15);
            console.log(date);
            html += `<div class="card">
              <div class="box">
                <div class="content">
                  <h3>${eventname}</h3>
                  <p><i class="fa-regular fa-calendar"></i> ${date}</p>
                </div>
              </div>
            </div>`
        })
        container.innerHTML = html;
    } catch (error) {
        console.log(error);
    }
}


getAllEvents();

all.addEventListener('click', () => {
    console.log("clicked!")
    getAllEvents();
})

sug.addEventListener('click', async () => {
    console.log("clicked!")
    await getSuggestions();
})


reg.addEventListener('click', async () => {
    console.log("clicked!")
    await getRegistered();
})