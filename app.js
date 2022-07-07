// mobile nav dislay toggle
const mobileNav = document.querySelector('.mobile-nav')
const navBtn = document.querySelector('.hamburger')

const showNav = () => {
    mobileNav.classList.toggle('active')
}
navBtn.addEventListener('click', showNav)

// form validation
const form = document.querySelector('.shorten-form')
const input = document.querySelector('.shorten-input')
const errorMsg = document.querySelector('.errormsg')
const html = document.querySelector('.resulttab')

form.addEventListener('submit', e => {
    e.preventDefault();
    if(input.value == ""){
            input.style.border = "2px solid red"
            errorMsg.style.display = "block";
        } else {
            input.style.border = "none"
            errorMsg.style.display = "none";
        }
    
    console.log(input.value.trim());
    
    html.innerHTML = "";
    submitForm();
    form.reset();
   
})

//clear error when user starts typing
form.addEventListener("keypress", () => {
       input.style.border = "none"
        errorMsg.style.display = "none";    
    
})

//shorten API 
const getShortenedUrl = async () => {
    const url = input.value.trim();

    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)


    if(res.ok !== true){
        throw new Error('cannot fetch data')
    } else {
        return res.json()
    }
}

const submitForm = () => { getShortenedUrl()
    .then(data => {
        
        
        let resultdiv = document.createElement("div")
        
        resultdiv.classList.add("results")

        resultdiv.innerHTML = `
                <div class="card">
                    <p>${data.result.original_link}</p>
                    <span></span>
                    <p class="shortlink">${data.result.short_link}</p>
                    <div onclick="youcopied()" class="button">Copy</div>
                </div>

                <div class="card">
                    <p>${data.result.original_link}</p>
                    <span></span>
                    <p class="shortlink">${data.result.short_link2}</p>
                <div onclick="copyText()" class="button">Copy</div>
            </div>
        `
        console.log(resultdiv);
        localStorage.setItem('shortlink1', `${data.result.short_link}`)
        localStorage.setItem('shortlink2', `${data.result.short_link2}`)
        html.appendChild(resultdiv)
    })
    .catch(err => console.log(err))
}

// function to copy text to clipboard

const copyBtn = document.querySelector('.button')


const youcopied = (e) => {
    if(localStorage.getItem('shortlink1')){
    navigator.clipboard.writeText(localStorage.getItem('shortlink1'));
    console.log('you copied' + " " + localStorage.getItem('shortlink1'))
    }
    console.log(e);
    // copyBtn.style.backgroundColor = "purple"
    // setTimeout(() => {
    //     copyBtn.style.backgroundColor = "cyan"
    // }, 3000)
}
