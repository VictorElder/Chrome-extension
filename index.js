let myLeads = []
//let oldLeads = {name:"victor", surname:"Elder", age:22}
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("my Leads"))
const deleteBtn = document.getElementById("delete-btn")

//console.log(leadsFromLocalStorage)
//console.log( Boolean( localStorage.getItem("my Leads")))

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
//const tabs = [{url:"https://www.linkedin.com/in/per-harald-borgem/"}]

 tabBtn.addEventListener('click', ()=> {
     chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
     myLeads.push(tabs[0].url)
     localStorage.setItem("my Leads", JSON.stringify(myLeads))
     render(myLeads)
     })})

function render(leads) {
    let listItems = ""   

for(let i = 0; i < leads.length; i++){
     listItems += `<li>
            <a href='${leads[i]}' target='_blank'>${leads[i]} </a>
                </li>`
}
ulEl.innerHTML = listItems
}

deleteBtn.addEventListener('dblclick', ()=> {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener('click', (e) => {
    myLeads.push(inputEl.value)
    //console.log(myLeads)
    inputEl.value = ""
    localStorage.setItem("my Leads",JSON.stringify(myLeads))
    render(myLeads)
    console.log( localStorage.getItem("my Leads"))
})  

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
      const event = new Event("click");
      inputBtn.dispatchEvent(event);
  }
})

