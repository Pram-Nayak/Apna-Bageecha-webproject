let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");



let basket = JSON.parse(localStorage.getItem("data")) || [];




let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);


};
calculation();


let generateCartItems = () => {
    if (basket.length !== 0) {

        return (ShoppingCart.innerHTML = basket
            .map((x) => {

                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                let { img, name, price } = search;
                return `
            <div class="cart-item">
                <img width = "100" src=${img} alt ="" />
                <div class ="details">
                   <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">₹ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                   </div>  
                   <div class="buttons">
                        <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${item}
                        </div>
                        <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
           
                   <h3>₹ ${item * search.price}</h3>
                </div>

            </div>


            `;
            })
            .join(""));

    }
    else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button> 
        </a>
        `;
    }

};



generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,

        });
    } else {
        search.item += 1;
    }


    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    //console.log(basket);
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id) => {

    let search = basket.find((x) => x.id === id);
    //console.log(search.item);

    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};


let removeItem = (id) => {

    let selectedItem = id;
    //console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));

};
let checkout = () => {
    // Simulate processing time (e.g., 3 seconds)
    setTimeout(() => {
        
        alert("Checkout completed successfully! Your order has been placed.");

        // Clear the cart after successful checkout
        clearCart();
    }, 1000); // 3000 milliseconds = 3 seconds
};


let TotalAmount = () => {

    if (basket.length !== 0) {

        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;

        }).reduce((x, y) => x + y, 0);

        label.innerHTML = `

        <h2>Total Bill: ₹ ${amount}</h2>
        <button  onclick="checkout()" class="checkout">Checkout</button>

        <button onclick="clearCart()" class="removeAll">Clear Cart</button>

        `;
    }
    else return;
};

TotalAmount();