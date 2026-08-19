const giftContainer = document.getElementById("giftContainer");
let cart = [];

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    alert(name + " added to cart! 🎁");

}
let allGifts = [];

fetch("http://localhost:3000/api/gifts")

    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load gifts");
        }

        return response.json();

    })

    .then(gifts => {

        allGifts = gifts;

        showGifts(gifts);

    })

    .catch(error => {

        console.log(error);

        giftContainer.innerHTML =
            "<p>Gifts could not be loaded.</p>";

    });


function showGifts(gifts) {

    giftContainer.innerHTML = "";


    gifts.forEach(gift => {

        let images = gift.images;

        if (images.length === 0 && gift.image) {

            images.push(gift.image);

        }


        const card = document.createElement("div");

        card.className = "gift-card";


        card.innerHTML = `

            <div class="gift-image-area">

                <img
                    class="main-gift-image"
                    src="images/${images[0]}"
                    alt="${gift.name}"
                >


                <button
                    class="prev-btn">
                    ❮
                </button>


                <button
                    class="next-btn">
                    ❯
                </button>


                <div class="thumbnail-container">

                    ${images.map((image, index) => `

                        <img
                            class="thumbnail"
                            src="images/${image}"
                            data-index="${index}"
                        >

                    `).join("")}

                </div>

            </div>


            <div class="gift-info">

                <span class="category">
                    ${gift.category}
                </span>


                <h3>
                    ${gift.name}
                </h3>


                <p>
                    ${gift.description}
                </p>


                <div class="rating">
                    ⭐ ${gift.rating}
                    (${gift.review_count} reviews)
                </div>


                <h4>
                    ৳${gift.price}
                </h4>


                <small>
                    ${gift.stock} available
                </small>


                <button class="view-button">
                    View Gift
                </button>

            </div>

        `;


        giftContainer.appendChild(card);


        setupImages(card, images);

    });

}

function setupImages(card, images) {

    let current = 0;


    const mainImage =
        card.querySelector(".main-gift-image");


    const thumbnails =
        card.querySelectorAll(".thumbnail");


    const previous =
        card.querySelector(".prev-btn");


    const next =
        card.querySelector(".next-btn");


    function changeImage(index) {

        current = index;

        mainImage.src =
            "images/" + images[current];

    }


    thumbnails.forEach((thumbnail, index) => {

        thumbnail.addEventListener("click", () => {

            changeImage(index);

        });

    });


    next.addEventListener("click", () => {

        current++;

        if (current >= images.length) {
            current = 0;
        }

        changeImage(current);

    });


    previous.addEventListener("click", () => {

        current--;

        if (current < 0) {
            current = images.length - 1;
        }

        changeImage(current);

    });

}
function findGift() {

    let person =
        document.getElementById("person").value;

    let occasion =
        document.getElementById("occasion").value;

    let budget =
        document.getElementById("budget").value;


    if (
        person === "" ||
        occasion === "" ||
        budget === ""
    ) {

        alert("Please select all options.");

        return;

    }


    localStorage.setItem(
        "person",
        person
    );

    localStorage.setItem(
        "occasion",
        occasion
    );

    localStorage.setItem(
        "budget",
        budget
    );


    window.location.href =
        "results.html";

}
function checkout() {

   let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}

function updateCartCount() {

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

function openCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Your Cart 🛒\n\n";

    cart.forEach(function(item, index) {

        message +=
            (index + 1) +
            ". " +
            item.name +
            " - ৳" +
            item.price +
            "\n";

    });

    alert(message);
}

document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    
});

