const postBtn = document.getElementById('submit_ambulance')
var src = document.getElementById('start')
var src_option, dest_option;
var dest = document.getElementById('end')

const baseUrl = 'http://localhost:8080'

postBtn.addEventListener('click',testMe)

function testMe(){
    updateOptions()
    console.log(src_option, dest_option);
    console.log('sending data to server');
    sendData(src_option, dest_option)
}


function updateOptions(){
    src_option = src.options[src.selectedIndex].value
    dest_option = dest.options[dest.selectedIndex].value
}

async function getData(){
    const res = await fetch(baseUrl,
    {
        method: 'GET'
    })
    console.log(res);
}

async function checkData(){
    var baseUrl = 'http://localhost:8080/info'
    const res = await fetch(baseUrl,
    {
        method:'GET'
    })
    console.log(res);
}

async function sendData(source_chosen, destination_chosen){
    console.log(source_chosen,destination_chosen);
    const res = await fetch(baseUrl,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            source: source_chosen,
            destination: destination_chosen
        })
    })
    console.log(res);
}