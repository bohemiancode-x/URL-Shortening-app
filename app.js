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
        
        const html = document.querySelector('.shorten-cta')
        let resultdiv = document.createElement("div")
        resultdiv.classList.add("results")
        resultdiv.innerHTML = `
                <div class="card">
                    <p>${data.result.original_link}</p>
                    <span></span>
                    <p>${data.result.short_link}</p>
                    <div class="button">Copy</div>
                </div>

                <div class="card">
                    <p>${data.result.original_link}</p>
                    <span></span>
                    <p>${data.result.short_link2}</p>
                <div class="button">Copy</div>
            </div>
        `
        console.log(resultdiv);
        html.appendChild(resultdiv)
    })
    .catch(err => console.log(err))
}
