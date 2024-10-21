document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("productModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.querySelector(".close");
    const form = document.getElementById("modalForm");
    const productList = document.getElementById("productos");
    const searchBar = document.getElementById("searchBar");

    let productos = JSON.parse(localStorage.getItem("productos")) || [];
  
    if (productos.length === 0) {
      productos = [
        {
          nombre: "Hamburguesa Clásica",
          imagen: "https://www.carniceriademadrid.es/wp-content/uploads/2022/09/smash-burger-que-es.jpg",
          precio: 5500,
          categoria: "hamburguesa",
        },
        {
          nombre: "Papas Fritas",
          imagen: "https://i0.wp.com/soyproesa.com/wp-content/uploads/2022/04/recetas-de-papas-fritas.png?resize=1024%2C683&ssl=1",
          precio: 3500,
          categoria: "papas",
        },
        {
          nombre: "Coca-Cola",
          imagen: "https://www.coca-cola.com/content/dam/onexp/sv/es/brands/coca-cola/7840058001870.png/width1338.png",
          precio: 2000,
          categoria: "gaseosa",
        },
        {
          nombre: "Cono Helado",
          imagen: "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kfXguNk0/200/200/original?country=pa",
          precio: 1500,
          categoria: "postre",
        }
      ];
      localStorage.setItem("productos", JSON.stringify(productos));
    }
 
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("modalNombre").value;
      const imagen = document.getElementById("modalImagen").value;
      const precio = document.getElementById("modalPrecio").value;
      const categoria = document.getElementById("modalCategoria").value;
  
      const producto = { nombre, imagen, precio: parseFloat(precio), categoria };
      productos.push(producto);
      localStorage.setItem("productos", JSON.stringify(productos));
      mostrarProductos(productos);
      form.reset();
      modal.style.display = "none";
    });
  
    function mostrarProductos(productosFiltrados) {
      productList.innerHTML = "";
      productosFiltrados.forEach((producto, index) => {
        productList.innerHTML += `
                <div class="producto">
                    <h3>${producto.nombre}</h3>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <p>Precio: $${producto.precio}</p>
                    <button class="delete-btn" data-index="${index}">Eliminar</button>
                </div>
            `;
      });
  
      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          eliminarProducto(index);
        });
      });
    }
  
    function eliminarProducto(index) {
      productos.splice(index, 1);
      localStorage.setItem("productos", JSON.stringify(productos));
      mostrarProductos(productos);
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
    
        filterButtons.forEach(btn => btn.classList.remove("selected"));
        
      
        button.classList.add("selected");
        
      
        let productosFiltrados = productos;
        const category = button.getAttribute("data-category");
        const sort = button.getAttribute("data-sort");
    
        if (category && category !== "all") {
          productosFiltrados = productos.filter((p) => p.categoria === category);
        }
    
        if (sort === "asc") {
          productosFiltrados.sort((a, b) => a.precio - b.precio);
        } else if (sort === "desc") {
          productosFiltrados.sort((a, b) => b.precio - a.precio);
        }
    
        mostrarProductos(productosFiltrados);
      });
    });
  
    searchBar.addEventListener("input", () => {
      const searchValue = searchBar.value.toLowerCase();
      const productosFiltrados = productos.filter((p) =>
        p.nombre.toLowerCase().includes(searchValue)
      );
      mostrarProductos(productosFiltrados);
    });
  
    mostrarProductos(productos);
  
    document.getElementById("openModalBtn").addEventListener("click", function () {
      const modal = document.getElementById("productModal");
      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("show");
      }, 10); 
    });
  
    document.querySelector(".close").addEventListener("click", function () {
      const modal = document.getElementById("productModal");
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300); 
    });
  
    window.onclick = function (event) {
      const modal = document.getElementById("productModal");
      if (event.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => {
          modal.style.display = "none";
        }, 300);
      }
    };
  });