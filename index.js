const ale=document.querySelector('.ale')
let aleTimer;
const showAle=(msg)=>{
    ale.innerHTML=`<b>${msg}</b>`
    ale.style.transform='translate(-50%,0)';
    clearTimeout(aleTimer)
    aleTimer=setTimeout(()=>{
    ale.style.transform='translate(-50%,-100px)'
    },2000)
}
const tbody=document.getElementById('tbody')
let dat=""

/* Fetching the data from the given url. */
fetch('https://assignment-intern.herokuapp.com/api/add/all')
  .then((response) => response.json())
  .then((data) => {
    data=data.data;
    dat=data
    data.forEach(e=>{
        let tr=document.createElement('tr');
        tr.id=`${e.id}`
        let html=`
                    <td>${e.name}</td>
                    <td>${(e.dob).split("T")[0]}</td>
                    <td>${e.country}</td>
                    <td>${e.ctime}</td>
                    <td class="details" onclick="visit(this.parentElement.id);">Visit</td>
                    <td class="delete" onclick="delRo(this.parentElement.id);">Del</td>
        `
        tr.innerHTML=html;
        tbody.appendChild(tr)
    })
  });



const tableFilter=document.getElementById('table-filter');
tableFilter.addEventListener('click', ()=>{

  ////////////// Name Sorting  /////////////////

   /* Checking if the value of the select element is equal to "Name". */
   if(tableFilter.value=="Name"){ 
    /* Sorting the data in ascending order. */
    let sort=dat.sort(function(a, b){
        return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
    })
    tbody.innerHTML=``;
    sort.forEach(e=>{
        let tr=document.createElement('tr');
        tr.id=`${e.id}`

        let html=`
                <td>${e.name}</td>
                <td>${(e.dob).split("T")[0]}</td>
                <td>${e.country}</td>
                <td>${e.ctime}</td>
                <td class="details"  onclick="visit(this.parentElement.id);">Visit</td>
                <td class="delete" onclick="delRo(this.parentElement.id);">Del</td>
        `
        tr.innerHTML=html;
        tbody.appendChild(tr)
        showAle('Sorted By: Name')

    })}


  ////////////// Date-Time Sorting  /////////////////

    /* Checking if the value of the select element is equal to "Date-Time". */
    if(tableFilter.value=="Date-Time"){ 
    
       /* Sorting the data in descending order. */
        let sort=dat.sort(function(a,b){
            return new Date(b.ctime) - new Date(a.ctime);
          });
    tbody.innerHTML=``;
    sort.forEach(e=>{
        let tr=document.createElement('tr');
        tr.id=`${e.id}`
        let html=`
        <td>${e.name}</td>
        <td>${(e.dob).split("T")[0]}</td>
        <td>${e.country}</td>
        <td>${e.ctime}</td>
        <td class="details" onclick="visit(this.parentElement.id);">Visit</td>
        <td class="delete" onclick="delRo(this.parentElement.id);">Del</td>
        `
        tr.innerHTML=html;
        tbody.appendChild(tr)
        showAle('Sorted By: Date-Time')
    })}
});





/* Deleting the row from the table. */
function delRo(th){
    let url=`https://assignment-intern.herokuapp.com/api/add/drop/${th}`
    fetch(url)
    .then((response) => response.json())
  .then((data) => {
      window.location.reload();
      showAle('Deleted')
  });

}

/* Opening a new tab with the url of the image. */
function visit(th){
  showAle('Visiting...')
  let url=`https://assignment-intern.herokuapp.com/api/add/download/${th}`
  window.open(url,'_blank');

}




