let upper = document.querySelector(".upper");
let row = document.querySelector(".products-row");
let spanCount = document.querySelectorAll("#basket span");
let basket = document.querySelectorAll("#basket");
let overlay = document.querySelector(".overlay");
let overRow = document.querySelector(".over-row");
let leftImage = document.querySelector(".left-image2 img");
let price = document.querySelector(".price2 span");
let disc = document.querySelector(".disc2 span");
let closeIt = document.querySelector(".close");
let title = document.querySelector(".right-info h2");
let overlay2 = document.querySelector(".overlay2");
let asideCart = document.querySelector(".cart");
let closeCart = document.querySelector(".top-row i");
let empty = document.querySelector(".empty");
let choosenRow = document.querySelector(".choosen-row");
let bottomCart = document.querySelector(".bot-cart");
let addToCart2 = document.querySelector(".addToCart2");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");
let counter = document.querySelector(".left-counters input");
let total = document.querySelector(".bot-row h4 span")
let clearAll = document.querySelector(".clearAll");
let aside1 = document.querySelector(".aside1");
let bars = document.querySelectorAll(".logo i");
let closeAside = document.querySelector(".close2");

bars.forEach((item) => {
    item.addEventListener("click", function(){
        aside1.style.transform = "translateX(0)";
        aside1.style.opacity = "1";
    });
});

closeAside.addEventListener("click", function(){
    aside1.style.transform = "translateX(calc(-100% + -41px))";
});

window.addEventListener("scroll", function(){
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if(x > 200){
        nav.style.transform = "translateY(0)";
        upper.style.transform = "translateY(0)";
        upper.style.opacity = "1";
    }else{
        nav.style.transform = "translateY(calc(-100% + -2px))";
        upper.style.transform = "translateY(100%)";
        upper.style.opacity = "0";
    };
});

upper.addEventListener("click", function(){
    scrollTo(0,0);
});

let up = document.querySelector(".up");
let closeUp = document.querySelector(".up i");

closeUp.addEventListener("click", function(){
    up.style.display = "none";
});

plus.addEventListener("click", function(){
    counter.value++;
});

minus.addEventListener("click", function(){
    counter.value--;
    if(counter.value < 1){
        counter.value = 1;
    };
});

let list = [];

let index1;

let cart;
if(localStorage.getItem("newItems") == null){
    cart = [];
    putInCart();
    checkBtn();
}else{
    cart = JSON.parse(localStorage.getItem("newItems"));
    putInCart();
    checkBtn();
};

let getData = async function(){
    let api = await fetch("data.json");
    let response = await api.json();
    let products = response.products;
    list = products;
    displayProducts(products);
}
getData();

function displayProducts(take){
    let card = "";
    take.forEach((item, index) => {
        card += `
        <div class="card2">
        <div class="image">
            <img src="${item.image1}"
                alt="">
            <img src="${item?.image2}"
                alt="" class="img2">
            <button onclick="openInfo(${index})">quick view</button>
        </div>
        <div class="card-body">
            <h3>${item.title}</h3>
            <div class="stars">
                <div class="star"><i class="fa-solid fa-star"></i></div>
                <div class="star"><i class="fa-solid fa-star"></i></div>
                <div class="star"><i class="fa-solid fa-star"></i></div>
                <div class="star"><i class="fa-solid fa-star"></i></div>
                <div class="star"><i class="fa-solid fa-star"></i></div>
            </div>
            <div class="discount">
                <span class="disc">$${item.disc}</span>
                <span class="realPrice">$${item.price}</span>
            </div>
            <div class="card-last">
                <div class="left-counts">
                    <button>-</button>
                    <input type="text" value="1">
                    <button>+</button>
                </div>
                <button class="addToCart" onclick="addtocart(${index})"><i class="fa-solid fa-bag-shopping"></i> add to cart</button>
            </div>
        </div>
    </div>
        `
    });
    row.innerHTML = card;
};

function openInfo(index){
    index1 = index;
    overlay.style.display = "flex";
    setTimeout(() => {
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        overRow.style.transform = "translateY(0)";
        overRow.style.opacity = "1";
    }, 100);
    leftImage.src = list[index].image1;
    price.textContent = list[index].price;
    disc.textContent = list[index].disc;
    title.textContent = list[index].title;
};

closeIt.addEventListener("click", function(){
    overRow.style.transform = "translateY(-30%)";
    overRow.style.opacity = "0";
    overlay.style.backgroundColor = "transparent";
    setTimeout(() => {
        overlay.style.display = "none";
        counter.value = 1;
    }, 400);
});

function addtocart(index){
    let choosenProducts = list[index];
    let final = cart.find((item) => item.id == choosenProducts.id);
    if(final){
        final.count++;
    }else{
        cart.push({...choosenProducts, count: 1});
    };
    localStorage.setItem("newItems", JSON.stringify(cart));
    putInCart();
    checkBtn();
};

addToCart2.addEventListener("click", function(){
    let choosenProducts = list[index1];
    let final = cart.find((item) => item.id == choosenProducts.id);
    if(final && counter.value > 1){
        final.count = counter.value;
    }else{
        cart.push({...choosenProducts, count: 1});
    };
    localStorage.setItem("newItems", JSON.stringify(cart));
    putInCart();
    checkBtn();
});

basket.forEach((item) => {
    item.addEventListener("click", function(){
        overlay2.style.display = "flex";
        setTimeout(() => {
            overlay2.style.backgroundColor = "rgba(0,0,0,0.5)";
            asideCart.style.transform = "translateX(0)";
            asideCart.style.opacity = "1";
        }, 100);
    });
});

closeCart.addEventListener("click", function(){
    overlay2.style.backgroundColor = "transparent";
    asideCart.style.transform = "translateX(100%)";
    asideCart.style.opacity = "0";
    setTimeout(() => {
        overlay2.style.display = "none";
    }, 400);
});

function putInCart(){
    let card = "";
    let counter2 = 0;
    cart.forEach((item, index) => {
        card += `
        <div class="card4">
        <div class="left-info">
            <h3>${item.title}</h3>
            <p>details <i class="fa-solid fa-angle-down"></i></p>
            <span>QTY: ${item.count}</span>
        </div>
        <div class="right-imgs">
            <img src="${item.image1}" alt="">
            <i class="fa-solid fa-xmark" onclick="deleteElement(${index})"></i>
        </div>
        </div>
        `
        counter2 += item.price * item.count;
    });
    total.textContent = counter2;
    choosenRow.innerHTML = card;
};
putInCart();

function deleteElement(index){
    cart.splice(index, 1);
    putInCart();
    checkBtn();
    localStorage.setItem("newItems", JSON.stringify(cart));
};

clearAll.addEventListener("click", function(){
    cart.splice(0);
    localStorage.clear();
    putInCart();
    checkBtn();
});

function checkBtn(){
    if(cart.length == 0){
        empty.style.display = "block";
        clearAll.style.display = "none";
        bottomCart.style.display = "none";
        spanCount.forEach((item) => {
            item.innerHTML = cart.length;
        });
    }else{
        empty.style.display = "none";
        clearAll.style.display = "block";
        bottomCart.style.display = "block";
        spanCount.forEach((item) => {
            item.innerHTML = cart.length;
        });
    };
};

function searchingProducts(searching){
    let card = "";
    list.forEach((item, index) => {
        if(item.title.includes(searching)){
            card += `
            <div class="card2">
            <div class="image">
                <img src="${item.image1}"
                    alt="">
                <img src="${item?.image2}"
                    alt="" class="img2">
                <button onclick="openInfo(${index})">quick view</button>
            </div>
            <div class="card-body">
                <h3>${item.title}</h3>
                <div class="stars">
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                </div>
                <div class="discount">
                    <span class="disc">$${item.disc}</span>
                    <span class="realPrice">$${item.price}</span>
                </div>
                <div class="card-last">
                    <div class="left-counts">
                        <button>-</button>
                        <input type="text" value="1">
                        <button>+</button>
                    </div>
                    <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i> add to cart</button>
                </div>
            </div>
            </div>
            `
        };
    });
    row.innerHTML = card;
};