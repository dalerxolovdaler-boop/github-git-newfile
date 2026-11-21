const PRODUCTS=[
 {id:1,name:"Ceramic Mug",cat:"Home",price:14,icon:"☕"},
 {id:2,name:"Linen Tote Bag",cat:"Accessories",price:22,icon:"👜"},
 {id:3,name:"Desk Plant",cat:"Home",price:18,icon:"🪴"},
 {id:4,name:"Canvas Sneakers",cat:"Clothing",price:59,icon:"👟"},
 {id:5,name:"Wool Beanie",cat:"Clothing",price:25,icon:"🧢"},
 {id:6,name:"Scented Candle",cat:"Home",price:16,icon:"🕯️"},
 {id:7,name:"Sunglasses",cat:"Accessories",price:35,icon:"🕶️"},
 {id:8,name:"Denim Jacket",cat:"Clothing",price:79,icon:"🧥"}
];
const getCart=()=>JSON.parse(localStorage.getItem("cart")||"{}");
const saveCart=c=>{localStorage.setItem("cart",JSON.stringify(c));updateCount()};
function updateCount(){const n=Object.values(getCart()).reduce((a,b)=>a+b,0);document.querySelectorAll(".count").forEach(e=>e.textContent=n)}
function toast(msg){let t=document.querySelector(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1600)}
function addToCart(id){const c=getCart();c[id]=(c[id]||0)+1;saveCart(c);toast("Added to cart ✓")}
function card(p){return `<div class="card"><div class="img">${p.icon}</div><div class="body"><span class="cat">${p.cat}</span><h3>${p.name}</h3><div class="row"><span class="price">$${p.price}</span><button class="btn" onclick="addToCart(${p.id})">Add</button></div></div></div>`}
function renderGrid(el,list){el.innerHTML=list.map(card).join("")}
function renderCart(){
 const el=document.getElementById("cart");if(!el)return;
 const c=getCart();const items=Object.keys(c).map(id=>({...PRODUCTS.find(p=>p.id==id),qty:c[id]}));
 if(!items.length){el.innerHTML=`<div class="empty"><p style="font-size:60px">🛒</p><p>Your cart is empty.</p><br><a class="btn" href="products.html">Browse products</a></div>`;return}
 const total=items.reduce((s,i)=>s+i.price*i.qty,0);
 el.innerHTML=`<table class="cart-table"><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr>${items.map(i=>`<tr><td>${i.icon} ${i.name}</td><td>$${i.price}</td><td class="qty"><button onclick="chg(${i.id},-1)">−</button> ${i.qty} <button onclick="chg(${i.id},1)">+</button></td><td>$${i.price*i.qty}</td></tr>`).join("")}</table>
 <div class="summary"><span>Total: <b>$${total}</b></span><button class="btn" onclick="checkout()">Checkout</button></div>`;
}
function chg(id,d){const c=getCart();c[id]=(c[id]||0)+d;if(c[id]<=0)delete c[id];saveCart(c);renderCart()}
function checkout(){alert("This is a demo shop — no real payment was made. Thanks for visiting!");saveCart({});renderCart()}
document.addEventListener("DOMContentLoaded",()=>{
 updateCount();
 const feat=document.getElementById("featured");if(feat)renderGrid(feat,PRODUCTS.slice(0,4));
 const all=document.getElementById("all");
 if(all){renderGrid(all,PRODUCTS);document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("on"));b.classList.add("on");const f=b.dataset.cat;renderGrid(all,f==="All"?PRODUCTS:PRODUCTS.filter(p=>p.cat===f))})}
 renderCart();
 const form=document.getElementById("contact");if(form)form.onsubmit=e=>{e.preventDefault();form.reset();document.querySelector(".notice").style.display="block"};
});
