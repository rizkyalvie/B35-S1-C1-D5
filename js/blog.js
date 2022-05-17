let blogs = []



let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
]

function addBlog(event) {
    event.preventDefault()

    let inputName = document.getElementById("inputProjectName").value
    let inputContent = document.getElementById("inputDescription").value
    let inputImage = document.getElementById("inputImage").files[0]

    const projectDate = {

        startDate: document.getElementById("inputStartDate").value,
        endDate: document.getElementById("inputEndDate").value
    }

    inputImage = URL.createObjectURL(inputImage)

    let cardDuration = {
        startDate: document.getElementById('inputStartDate').value,
        endDate: document.getElementById('inputEndDate').value
    }

    let cardIcons = {
        html: document.querySelector('input[name="checkHtml"]').checked,
        css: document.querySelector('input[name="checkCss"]').checked,
        nodeJs: document.querySelector('input[name="checkNode"]').checked,
        reactJs: document.querySelector('input[name="checkReact"]').checked
    }

    let blog = {
        title: inputName,
        date: projectDate,
        content: inputContent,
        icons: cardIcons,
        duration: cardDuration,
        image: inputImage
    }

    blogs.push(blog)

    console.table(blogs)

    renderCard()
}

function getProjectDuration(endDate, startDate) {

    const distance = endDate - startDate

    const miliseconds = 1000
    const secondInMinute = 60
    const minuteInHour = 60
    const secondInHour = secondInMinute * minuteInHour // 3600
    const hourInDay = 23
    const dayInMonth = 30

    let dayDistance = distance / (miliseconds * secondInHour * hourInDay)

    if (dayDistance >= 30) {
        return `${Math.floor(dayDistance / dayInMonth)}` + ` Month`
    } else {
        return `${Math.floor(dayDistance)}` + ' day'
    }

}

function renderCard() {

    let containerBlog = document.getElementById("contents")
    containerBlog.innerHTML = '';

    const objectBlogString = JSON.stringify(blogs);

    for (let i = 0; i < blogs.length; i++) {

        const startDateVariable = new Date(blogs[i].date.startDate)
        const endDateVariable = new Date(blogs[i].date.endDate)
        const duration = getProjectDuration(endDateVariable, startDateVariable)

        localStorage.setItem(`${blogs[i].title}`, objectBlogString);

        containerBlog.innerHTML += `
        <div id="contents" class="mp-card">
            <!--MPC = My Project Card-->
            <div class="mpc-img">
                <img src="${blogs[i].image}" alt="">
            </div>
            <div class="mpc-title">
            <a href="blog-detail.html?${blogs[i].title}" id='${blogs[i].title}' target="_blank" action="blog-detail.html?${blogs[i].title}">
                <p>${blogs[i].title}</p>
            </a>
            </div>
            <div class="mpc-duration">
                <small>Durasi: ${duration}</small>
            </div>
            <div class="mpc-content">
                ${blogs[i].content}
            </div>
            <div class="mpc-icons">
                ${(blogs[i].icons.html === true) ? '<i class="fa-brands fa-html5"></i>' : ''}
                ${(blogs[i].icons.css === true) ? '<i class="fa-brands fa-css3-alt"></i>' : ''}
                ${(blogs[i].icons.nodeJs === true) ? '<i class="fa-brands fa-node-js"></i>' : ''}
                ${(blogs[i].icons.reactJs === true) ? '<i class="fa-brands fa-react"></i>' : ''}  
            </div>
            <div class="mpc-mod">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        `
    }
}

// function renderBlog(event) {

//     let keyName;

//     if (event) {

//         keyName = event.path[1].id;

//         const myProjectBody = document.getElementById('myProjectBody');

//         const data = JSON.parse(localStorage.getItem(keyName))

//         myProjectBody.innerHTML = '';



//         for (let i = 0; i < data.length; i++) {

//             const startDateVariable = new Date(blogs[i].date.startDate)
//             const endDateVariable = new Date(blogs[i].date.endDate)
//             const duration = getProjectDuration(endDateVariable, startDateVariable)

//             myProjectBody.innerHTML += `
//             <div id="blog-detail">
//         <!--BD = Blog Detail-->
//         <div class="bd-title">
//             <p>${data[i].title}</p>
//         </div>
//         <!--IDC = Image, Duration, Categories-->
//         <div class="bd-idc">
//             <div class="idc-left">
//                 <img src="${data[i].image}" alt="Blog Image">
//             </div>
//             <div class="idc-right">
//                 <p>Duration</p>
//                 <div class="bd-duration">
//                     <div style="padding-left: 2px;">
//                         <i class="fa-solid fa-calendar-days"></i>
//                         <p>${startDateVariable} - ${endDateVariable}</p>
//                     </div>
//                     <div>
//                         <i class="fa-solid fa-clock"></i>
//                         <p>${duration}</p>
//                     </div>
//                 </div>
//                 <div class="bd-tech">
//                     <p>Technologies</p>
//                     <div class="tech-body">
//                     ${(data[i].icons.html === true) ? '<div class="tech-html"><i class="fa-brands fa-html5"></i><p>HTML</p></div>' : ''}
//                     ${(data[i].icons.css === true) ? '<div class="tech-css"><i class="fa-brands fa-css3-alt"></i><p>CSS</p></div>' : ''}
//                     ${(data[i].icons.nodeJs === true) ? '<div class="tech-node"><i class="fa-brands fa-node-js"></i><p>nodeJs</p></div>' : ''}
//                     ${(data[i].icons.reactJs === true) ? '<div class="tech-react"><i class="fa-brands fa-react"></i><p>reactJs</p></div>' : ''}
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div class="bd-content">
//             <p>
//                 ${data[i].content}
//             </p>
//         </div>
//     </div>
//             `
//         }
//     }
// }