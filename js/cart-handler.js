document.addEventListener("DOMContentLoaded", function () {
    const cartQty = document.querySelector(".cart-qty");
    const cartList = document.querySelector(".cart-list");
    const cartSummaryText = document.querySelector(".cart-summary small");
    const cartSubtotalText = document.querySelector(".cart-summary h5");

    const wishlistQty = document.querySelector(".wishlist-qty");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    function renderCart() {
        cartList.innerHTML = "";
        let totalItems = 0;
        let subtotal = 0;

        cart.forEach((item, index) => {
            const productWidget = document.createElement("div");
            productWidget.classList.add("product-widget");
            productWidget.innerHTML = `
                <div class="product-img">
                    <img src="${item.img}" alt="">
                </div>
                <div class="product-body">
                    <h3 class="product-name"><a href="#">${item.name}</a></h3>
                    <h4 class="product-price"><span class="qty">1x</span>$${item.price.toFixed(2)}</h4>
                </div>
                <button class="delete"><i class="fa fa-close"></i></button>
            `;

            productWidget.querySelector(".delete").addEventListener("click", function () {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });

            cartList.appendChild(productWidget);
            totalItems++;
            subtotal += item.price;
        });

        cartQty.textContent = totalItems;
        cartSummaryText.textContent = `${totalItems} Item(s) selected`;
        cartSubtotalText.textContent = `SUBTOTAL: $${subtotal.toFixed(2)}`;
    }

    function renderWishlist() {
        wishlistQty.textContent = wishlist.length;
    }

    // Eventos para botones de agregar
    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            const name = product.querySelector(".product-name a").textContent.trim();
            const price = parseFloat(product.querySelector(".product-price").textContent.replace(/[^0-9.]/g, ''));
            const imgSrc = product.querySelector(".product-img img").src;

            cart.push({ name, price, img: imgSrc });
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    });

    document.querySelectorAll(".add-to-wishlist").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            const name = product.querySelector(".product-name a").textContent.trim();
            const price = parseFloat(product.querySelector(".product-price").textContent.replace(/[^0-9.]/g, ''));
            const imgSrc = product.querySelector(".product-img img").src;

            wishlist.push({ name, price, img: imgSrc });
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            renderWishlist();
            alert("Producto agregado a Wishlist");
        });
    });

    // Inicializa al cargar la página
    renderCart();
    renderWishlist();
});
