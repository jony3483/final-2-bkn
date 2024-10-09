document.addEventListener('DOMContentLoaded', () => {

    const socket = io();

    socket.on("productos", (data) => {
        renderProductos(data);
    })


    const renderProductos = (data) => {
        const contenedorProductos = document.getElementById("contenedorProductos");
        if (contenedorProductos) {
            contenedorProductos.innerHTML = "";

            data.forEach(item => {
                const card = document.createElement("div");

                card.innerHTML = `<p> ${item.id} </p>
                                    <p> ${item.title} </p>
                                    <p> ${item.description} </p>
                                    <p> ${item.thumbnails} </p>
                                    <p> ${item.code} </p>
                                    <p> ${item.stock} </p>
                                    <p> ${item.category} </p>
                                    <p> ${item.status} </p>
                                    <button>Eliminar</button>
                                `;
                contenedorProductos.appendChild(card);

                const eliminarButton = card.querySelector("buton");
                if (eliminarButton) {
                    eliminarButton.addEventListener("click", () => {
                        eliminarProducto(item.id);
                    });
                }
            })
        } else {
            console.log.error("contenedorProductos no encontrado");
        }
    };


    const eliminarProducto = (id) => {
        socket.emit("eliminarProducto", id);
    }

    const btnEnviar = document.getElementById("btnEnviar");
        if (btnEnviar) {
            btnEnviar.addEventListener("click", () => {
                agregarProducto();
            });
        } else {
            console.error("boton Enviar no encontrado");
        }

        const agregarProducto = () => {
            const producto = {
                title : document.getElementById("title").value,
                description : document.getElementById("description").value,
                price : document.getElementById("price").value,
                thumbnails : document.getElementById("thumbnails").value,
                code : document.getElementById("code").value,
                stock: document.getElementById("stock").value,
                category: document.getElementById("category").value,
                status: document.getElementById("status").value === "true",
            }

            socket.emit("agregarProducto", producto);

            //limpiar los campos del formulario despues de enviar el producto
            document.getElementById("title").value = '';
            document.getElementById("description").value = '';
            document.getElementById("price").value = '';
            document.getElementById("thumbnails").value = 'Sin Imagen';
            document.getElementById("code").value = '';
            document.getElementById("stock").value = '';
            document.getElementById("category").value = '';
            document.getElementById("status").value = 'true';
        };
})