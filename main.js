let tasks = [];
let info = [];

const task_name = document.querySelector('#task_name');
const task_priority = document.querySelector('#priority');
const task_date = document.querySelector('#task_date');
const task_add = document.querySelector('#task_add');
const task_container = document.querySelector('#task_container');

const json = load();

try {
    info = JSON.parse(json);
} catch (error) {
    info = [];
}
tasks = info ? [...info] : [];

render_task();

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    if (task_date.value === "" || task_name.value === "") {
        Swal.fire(
            'No ha especificado ninguna tarea',
            '',
            'question'
          )
    } else {
        const fecha = new Date(task_date.value);
        const mes = fecha.getMonth() + 1;
        let feriadosMSN = feriados[mes].map((obj, index) => {
            return `<b>${obj.name}</b> que es el ${obj.date}`
        }).join("<br>");
        Swal.fire(
            'Tarea añadida correctamente',
            `Ten en cuenta los feriados de ese mes para que no interfieran con tus planes:<br>
            ${feriadosMSN}`,
            'success'
          )
    }
    add_task();

})

function add_task(){
    if(task_name.value === '' || task_date.value === ''){
        return;
    }

    if(date_diff(task_add.value) < 0){
        return;
    }

    const new_task = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: task_name.value,
        priority: task_priority.value,
        date: task_date.value,
    };

    tasks.unshift(new_task);

    save(JSON.stringify(tasks));
    task_name.value = "";

    render_task();
}

function date_diff(d){
    const target_date = new Date(d);
    const today = new Date();
    const difference = target_date.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

function render_task(){
    const task_HTML = tasks.map(task =>{
        return `
            <div class="task">
                <div class="days">
                    <span class="days-number">${date_diff(task.date)}</span>
                    <span class="days-text">días</span>
                </div>

                <div class="task-name">${task.name}</div>
                <div class="task-priority">${task.priority}</div>
                <div class="task-date">${task.date}</div>
                <div class="actions">
                    <button class="btn_delete" data-id="${task.id}">Eliminar</button>
                </div>
            </div>
        `;
    })
    task_container.innerHTML = task_HTML.join("");
    document.querySelectorAll('.btn_delete').forEach(button => {
        button.addEventListener('click', e => {
            const id = button.getAttribute('data-id');
            tasks = tasks.filter(task => task.id != id);

            save(JSON.stringify(tasks));

            render_task();

        })
    })
}

function save(data){
    localStorage.setItem('items', data);
}

function load(){
    return localStorage.getItem('items')
}


// Objeto con los nombres de sus paises y su respectivo codigo (ISO-3166) segun la documentacion de calendarific.com
const contries = {
    "Afghanistan":"af",
    "Albania":"al",
    "Algeria":"dz",
    "American Samoa":"as",
    "Andorra":"ad",
    "Angola":"ao",
    "Anguilla":"ai",
    "Antigua and Barbuda":"ag",
    "Argentina":"ar",
    "Armenia":"am",
    "Aruba":"aw",
    "Australia":"au",
    "Austria":"at",
    "Azerbaijan":"az",
    "Bahrain":"bh",
    "Bangladesh":"bd",
    "Barbados":"bb",
    "Belarus":"by",
    "Belgium":"be",
    "Belize":"bz",
    "Benin":"bj",
    "Bermuda":"bm",
    "Bhutan":"bt",
    "Bolivia":"bo",
    "Bosnia and Herzegovina":"ba",
    "Botswana":"bw",
    "Brazil":"br",
    "British Virgin Islands":"vg",
    "Brunei":"bn",
    "Bulgaria":"bg",
    "Burkina Faso":"bf",
    "Burundi":"bi",
    "Cabo Verde":"cv",
    "Cambodia":"kh",
    "Cameroon":"cm",
    "Canada":"ca",
    "Cayman Islands":"ky",
    "Central African Republic":"cf",
    "Chad":"td",
    "Chile":"cl",
    "China":"cn",
    "Colombia":"co",
    "Comoros":"km",
    "Congo":"cg",
    "Congo Democratic Republic":"cd",
    "Cook Islands":"ck",
    "Costa Rica":"cr",
    "Cote d'Ivoire":"ci",
    "Croatia":"hr",
    "Cuba":"cu",
    "Curaçao":"cw",
    "Cyprus":"cy",
    "Czech Republic":"cz",
    "Denmark":"dk",
    "Djibouti":"dj",
    "Dominica":"dm",
    "Dominican Republic":"do",
    "East Timor":"tl",
    "Ecuador":"ec",
    "Egypt":"eg",
    "El Salvador":"sv",
    "Equatorial Guinea":"gq",
    "Eritrea":"er",
    "Estonia":"ee",
    "Ethiopia":"et",
    "Falkland Islands":"fk",
    "Faroe Islands":"fo",
    "Fiji":"fj",
    "Finland":"fi",
    "France":"fr",
    "French Polynesia":"pf",
    "Gabon":"ga",
    "Gambia":"gm",
    "Georgia":"ge",
    "Germany":"de",
    "Ghana":"gh",
    "Gibraltar":"gi",
    "Greece":"gr",
    "Greenland":"gl",
    "Grenada":"gd",
    "Guam":"gu",
    "Guatemala":"gt",
    "Guernsey":"gg",
    "Guinea":"gn",
    "Guinea-Bissau":"gw",
    "Guyana":"gy",
    "Haiti":"ht",
    "Holy See (Vatican City)":"va",
    "Honduras":"hn",
    "Hong Kong":"hk",
    "Hungary":"hu",
    "Iceland":"is",
    "India":"in",
    "Indonesia":"id",
    "Iran":"ir",
    "Iraq":"iq",
    "Ireland":"ie",
    "Isle of Man":"im",
    "Israel":"il",
    "Italy":"it",
    "Jamaica":"jm",
    "Japan":"jp",
    "Jersey":"je",
    "Jordan":"jo",
    "Kazakhstan":"kz",
    "Kenya":"ke",
    "Kiribati":"ki",
    "Kosovo":"xk",
    "Kuwait":"kw",
    "Kyrgyzstan":"kg",
    "Laos":"la",
    "Latvia":"lv",
    "Lebanon":"lb",
    "Lesotho":"ls",
    "Liberia":"lr",
    "Libya":"ly",
    "Liechtenstein":"li",
    "Lithuania":"lt",
    "Luxembourg":"lu",
    "Macau":"mo",
    "Madagascar":"mg",
    "Malawi":"mw",
    "Malaysia":"my",
    "Maldives":"mv",
    "Mali":"ml",
    "Malta":"mt",
    "Marshall Islands":"mh",
    "Martinique":"mq",
    "Mauritania":"mr",
    "Mauritius":"mu",
    "Mayotte":"yt",
    "Mexico":"mx",
    "Micronesia":"fm",
    "Moldova":"md",
    "Monaco":"mc",
    "Mongolia":"mn",
    "Montenegro":"me",
    "Montserrat":"ms",
    "Morocco":"ma",
    "Mozambique":"mz",
    "Myanmar":"mm",
    "Namibia":"na",
    "Nauru":"nr",
    "Nepal":"np",
    "Netherlands":"nl",
    "New Caledonia":"nc",
    "New Zealand":"nz",
    "Nicaragua":"ni",
    "Niger":"ne",
    "Nigeria":"ng",
    "North Korea":"kp",
    "North Macedonia":"mk",
    "Northern Mariana Islands":"mp",
    "Norway":"no",
    "Oman":"om",
    "Pakistan":"pk",
    "Palau":"pw",
    "Panama":"pa",
    "Papua New Guinea":"pg",
    "Paraguay":"py",
    "Peru":"pe",
    "Philippines":"ph",
    "Poland":"pl",
    "Portugal":"pt",
    "Puerto Rico":"pr",
    "Qatar":"qa",
    "Reunion":"re",
    "Romania":"ro",
    "Russia":"ru",
    "Rwanda":"rw",
    "Saint Helena":"sh",
    "Saint Kitts and Nevis":"kn",
    "Saint Lucia":"lc",
    "Saint Martin":"mf",
    "Saint Pierre and Miquelon":"pm",
    "Saint Vincent and the Grenadines":"vc",
    "Samoa":"ws",
    "San Marino":"sm",
    "Sao Tome and Principe":"st",
    "Saudi Arabia":"sa",
    "Senegal":"sn",
    "Serbia":"rs",
    "Seychelles":"sc",
    "Sierra Leone":"sl",
    "Singapore":"sg",
    "Sint Maarten":"sx",
    "Slovakia":"sk",
    "Slovenia":"si",
    "Solomon Islands":"sb",
    "Somalia":"so",
    "South Africa":"za",
    "South Korea":"kr",
    "South Sudan":"ss",
    "Spain":"es",
    "Sri Lanka":"lk",
    "St. Barts":"bl",
    "Sudan":"sd",
    "Suriname":"sr",
    "Sweden":"se",
    "Switzerland":"ch",
    "Syria":"sy",
    "Taiwan":"tw",
    "Tajikistan":"tj",
    "Tanzania":"tz",
    "Thailand":"th",
    "The Bahamas":"bs",
    "Togo":"tg",
    "Tonga":"to",
    "Trinidad and Tobago":"tt",
    "Tunisia":"tn",
    "Turkey":"tr",
    "Turkmenistan":"tm",
    "Turks and Caicos Islands":"tc",
    "Tuvalu":"tv",
    "US Virgin Islands":"vi",
    "Uganda":"ug",
    "Ukraine":"ua",
    "United Arab Emirates":"ae",
    "United Kingdom":"gb",
    "United States":"us",
    "Uruguay":"uy",
    "Uzbekistan":"uz",
    "Vanuatu":"vu",
    "Venezuela":"ve",
    "Vietnam":"vn",
    "Wallis and Futuna":"wf",
    "Yemen":"ye",
    "Zambia":"zm",
    "Zimbabwe":"zw",
    "eSwatini":"sz"
}

// API call para detectar el pais del usuario 
let feriados = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[], 10:[], 11:[], 12:[]};
fetch("https://ipapi.co/json/")
.then(response => response.json())
.then(data => {
    country = data.country_name;
    country = contries[country]
    const api_key = 'b250659cb4e743e1b0a59dd34889a4bca9e120bd';
    const country_code = country;
    const year = '2023'; 
    // API call para detectar los feriados y agruparlos por mes
    fetch(`https://calendarific.com/api/v2/holidays?api_key=${api_key}&country=${country_code}&year=${year}`)
    .then(response => response.json())
    .then(data => {
    let festivos = data.response.holidays
    for (let i=0; i<festivos.length; i++){
        let month = festivos[i]["date"]["datetime"]["month"]
        nameHolly = festivos[i]["name"]
        dateHolly = festivos[i]["date"]["iso"]
        feriados[month].push({date:dateHolly, name:nameHolly})
    }
    })
    .catch(error => console.error(error));
})
.catch(error => console.log(error));





