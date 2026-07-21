document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-button');
    const contactInfoForm = document.getElementById('contact-info-form');
    const cartButton = document.getElementById('cart-button');

    // El carrito solo existe en la vista pública (no en el panel de administración)
    if (!cartButton) return;

    // Instancias de los modales (API de Bootstrap 5)
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const contactModal = new bootstrap.Modal(document.getElementById('contact-info-modal'));

    // Cargar el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;

    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

    const cartTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const cartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

    // Mostrar el número de artículos sobre el botón flotante
    function updateCartBadge() {
        let badge = cartButton.querySelector('.cart-badge');
        const count = cartCount();

        if (!count) {
            if (badge) badge.remove();
            return;
        }
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartButton.appendChild(badge);
        }
        badge.textContent = count;
    }

    // Agregar un producto al carrito, sumando si ya estaba
    function addToCart(product) {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        saveCart();
        updateCartBadge();
        showToast(`${product.title} agregado al carrito`);
    }

    // Aviso flotante, en lugar de alert()
    function showToast(message) {
        const container = document.getElementById('alert-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'alert alert-success shadow-sm mb-2';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    }

    // Manejar el evento de clic en el botón "Agregar al Carrito"
    document.querySelectorAll('.btn-agregar').forEach(button => {
        button.addEventListener('click', () => {
            const form = button.closest('.purchase-form');
            const quantity = parseInt(form.querySelector('input[name="quantity"]').value) || 1;

            addToCart({
                id: button.dataset.id,
                title: button.dataset.title,
                description: button.dataset.description.substring(0, 60) + '...',
                image: button.dataset.image,
                price: parseFloat(button.dataset.price) || 0,
                quantity
            });
        });
    });

    // Mostrar el carrito
    cartButton.addEventListener('click', () => {
        renderCartItems();
        cartModal.show();
    });

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalContainer = document.getElementById('cart-total');
        // Limpiar el contenedor
        cartItemsContainer.innerHTML = '';

        // Carrito está vacío, mostrar un mensaje
        if (cart.length === 0) {
            cartItemsContainer.innerHTML =
                '<div class="alert alert-warning text-center mb-0">Tu carrito está vacío.</div>';
            if (totalContainer) totalContainer.textContent = formatMoney(0);
            checkoutButton.disabled = true;
            return;
        }

        checkoutButton.disabled = false;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item', 'd-flex', 'align-items-center', 'gap-3', 'mb-3');
            itemElement.innerHTML = `
                <div class="item-image">
                     <img src="${item.image}" alt="${item.title}" class="img-fluid rounded" style="width: 70px; height: auto;">
                </div>
                <div class="item-details flex-grow-1">
                    <h6 class="mb-1">${item.title}</h6>
                    <p class="mb-2 text-muted small">${formatMoney(item.price)} c/u</p>
                    <div class="d-flex align-items-center gap-2">
                        <label for="quantity-cart-${index}" class="mb-0 small">Cantidad:</label>
                        <input type="number" id="quantity-cart-${index}" class="form-control form-control-sm quantity-input" min="1" value="${item.quantity}" data-index="${index}" style="width: 5rem;">
                    </div>
                </div>
                <div class="text-end">
                    <p class="fw-bold mb-2">${formatMoney(item.price * item.quantity)}</p>
                    <button class="btn btn-outline-danger btn-sm remove-item-button" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        if (totalContainer) totalContainer.textContent = formatMoney(cartTotal());

        // event listeners para los botones de eliminar
        document.querySelectorAll('.remove-item-button').forEach(button => {
            button.addEventListener('click', (event) => {
                removeItemFromCart(event.target.getAttribute('data-index'));
            });
        });

        // event listeners para los inputs de cantidad
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (event) => {
                const index = event.target.getAttribute('data-index');
                updateCartItemQuantity(index, parseInt(event.target.value));
            });
        });
    }

    // Función para eliminar un producto del carrito
    function removeItemFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartBadge();
        renderCartItems();
    }

    // Función para actualizar la cantidad de un producto en el carrito
    function updateCartItemQuantity(index, newQuantity) {
        cart[index].quantity = Math.max(1, newQuantity || 1);
        saveCart();
        updateCartBadge();
        renderCartItems();
    }

    // Manejar el evento de clic en el botón "Proceder al Pago"
    checkoutButton.addEventListener('click', () => {
        cartModal.hide();
        contactModal.show();
    });

    contactInfoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        // Validar que todos los campos estén llenos
        if (!name || !phone || !address) {
            showToast('Por favor completa todos los campos');
            return;
        }

        try {
            const user = { name, phone, address };
            const items = cart.map(item => ({
                title: item.title,
                description: item.description,
                image: item.image,
                price: item.price,
                quantity: item.quantity
            }));

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user, items, total: cartTotal() })
            });

            const data = await response.json();
            if (response.ok) {
                contactModal.hide();
                alert(`¡Pedido confirmado! Total: ${formatMoney(cartTotal())}`);
                localStorage.removeItem('cart');
                window.location.reload();
            } else {
                showToast(`Error: ${data.message}`);
            }
        } catch (error) {
            showToast(`Error procesando la orden: ${error}`);
        }
    });

    updateCartBadge();
});
