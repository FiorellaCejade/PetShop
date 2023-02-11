const userName = document.getElementById("userName")
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')
const cuerpoModal = document.getElementById('cuerpoModal')


myModal.addEventListener('click', (e)=>{
    e.preventDefault()
    datosCliente(userName)
})

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

function datosCliente(inputDelNombre){
  console.log(inputDelNombre.value)
    cuerpoModal.innerHTML = `<p> Hola ${inputDelNombre.value}, gracias por enviarnos tu informacion. Pronto nos contactaremos con ud! :D</p>`
}