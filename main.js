const { createApp } = Vue

const app = createApp ({
    data(){
        return{
            productos: [],
            productosJuguete : [],
            productosFarmacia:[],
            carrito: [],
            consumoTotal: 0,
            contador:0,
            productosFarmaciaFiltrados: [],
            inputBusqueda: '',
            productosJuguetesFiltrados:[],
        }
    },
    created(){
        fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(response => response.json())
        .then( json => {
            this.contador=0
            this.carrito = JSON.parse(localStorage.getItem('carrito'))
            this.controlCarrito()
            this.productos=json.response
            this.productosJuguete= this.productos.filter(e => e.tipo == "Juguete")
            this.productosFarmacia= this.productos.filter(e => e.tipo == "Medicamento")
            this.productosFarmaciaFiltrados = this.productosFarmacia
            this.productos.map(e => this.nuevaPropiedad(e))
            this.calcularCompraCarrito()
            this.aumentarContador()
            
            
        })
        .catch(error => console.log(error))

    },methods:{
        aumentarContador(){
            this.contador++
        },
        nuevaPropiedad(objeto){{
            objeto.cantidad= 0; 
        }
        },
        enviarCarrito(e){
            let aux = {}
            aux = this.productos.find( element => element._id == e.target.id)
            console.log(aux._id)
            if ((this.carrito.length == 0) || !(this.carrito.find( e => e._id == aux._id ))) {
                aux.cantidad=1
                this.carrito.push(aux)
                localStorage.setItem('carrito', JSON.stringify(this.carrito))
            }
            
            console.log(this.carrito)
        },
        controlCarrito(e){
            if(this.carrito==null){
            localStorage.setItem('carrito', JSON.stringify([]))
            }
        },
        sumarProducto(e){
            let aux = e.target.id.slice(5)            
            if((this.carrito.find(elemento => elemento._id == aux))){
                this.carrito.filter(e => aux == e._id).map(e => {if(e.cantidad<e.stock){e.cantidad++}})
                localStorage.setItem('carrito', JSON.stringify(this.carrito))
            }            
        },
        restarProducto(e){
            let aux = e.target.id.slice(6)
            if((this.carrito.find(elemento => elemento._id == aux))){
                this.carrito.filter(e => aux == e._id).map(e => {if(e.cantidad>1){e.cantidad--}})
                localStorage.setItem('carrito', JSON.stringify(this.carrito))
            }
        },
        finalizarCompra(e){
            e.preventDefault()
            alert(`Compra finalizada el monto a abonar es de ${this.consumoTotal}`)
            this.borraCarrito(e)

        },
        borraCarrito(e){
            e.preventDefault()
            localStorage.setItem('carrito', JSON.stringify([]))
            this.carrito = []
        },
        calcularCompraCarrito(){
            if (this.carrito.length!=0){
                this.consumoTotal = this.carrito.map(e => e.precio*e.cantidad).reduce((a,b) => a+=b)
            } else{
                this.consumoTotal= 0
            }
        },
        eliminarProducto(e){
            let aux = e.target.id.slice(8)
            console.log(aux)
            this.carrito = this.carrito.filter(e => !(e._id==aux))
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
        }
    },
    computed:{
        calcularCompra(){
            if(this.carrito.length!=0){
            let aux = '$' + this.carrito.map(e => e.precio*e.cantidad).reduce((a,b) => a+=b)
            console.log(aux)
           this.consumoTotal = aux
            }else{this.consumoTotal = '$' + 0}
        },
        filtrar(){
            
            this.productosFarmaciaFiltrados = this.productosFarmacia.filter( producto => producto.nombre.toLowerCase().trim().includes( this.inputBusqueda.toLowerCase().trim() ) )
            
        },
        filtrarJuguetes(){
            
            this.productosJuguetesFiltrados = this.productosJuguete.filter( producto => producto.nombre.toLowerCase().trim().includes( this.inputBusqueda.toLowerCase().trim() ) )
            
        }
    }
})

app.mount('#app')