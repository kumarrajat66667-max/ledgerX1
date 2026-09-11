const products=[
{id:'acc-ebook',name:'Accounting Revision E-Book',type:'E-BOOK',category:'ebook',price:199,desc:'Quick concepts, key formulas and exam-focused practice for Accounting.'},
{id:'bst-ebook',name:'Business Studies Revision E-Book',type:'E-BOOK',category:'ebook',price:199,desc:'Structured chapter revision, keywords and important questions.'},
{id:'eco-ebook',name:'Economics Revision E-Book',type:'E-BOOK',category:'ebook',price:199,desc:'Micro + Macro concepts, diagrams, definitions and quick revision.'},
{id:'acc-physical',name:'Accounting Revision Book',type:'PHYSICAL BOOK',category:'physical',price:399,desc:'A printed Accounting revision companion for your study desk.'},
{id:'bst-physical',name:'Business Studies Revision Book',type:'PHYSICAL BOOK',category:'physical',price:399,desc:'A printed Business Studies revision companion.'},
{id:'eco-physical',name:'Economics Revision Book',type:'PHYSICAL BOOK',category:'physical',price:449,desc:'A printed Economics revision companion covering key topics.'}
];
let cart=JSON.parse(localStorage.getItem('ledgerxCart')||'[]');

function renderProducts(){
 document.getElementById('ebookProducts').innerHTML=products.filter(p=>p.category==='ebook').map(card).join('');
 document.getElementById('physicalProducts').innerHTML=products.filter(p=>p.category==='physical').map(card).join('');
 updateCart();
}
function card(p){return `<article class="product"><div class="product-visual"><span class="type">${p.type}</span><strong>${p.name.replace(' Revision E-Book','').replace(' Revision Book','')}<br>REVISION</strong><span>LEDGERX • 2026</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="price"><strong>₹${p.price}</strong><button class="add" onclick="addToCart('${p.id}')">Add to Cart</button></div><button class="view" onclick="viewProduct('${p.id}')">View details</button></div></article>`}

function addToCart(id){
 const p=id==='bundle'?{id:'bundle',name:'Complete Commerce Revision Pack',price:999,desc:'Commerce bundle'}:products.find(x=>x.id===id);
 const found=cart.find(x=>x.id===id);
 if(found)found.qty++;else cart.push({...p,qty:1});
 save();openCart();toast('Added to cart');
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();}
function save(){localStorage.setItem('ledgerxCart',JSON.stringify(cart));updateCart();}
function updateCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0);document.getElementById('cartCount').textContent=count;
 document.getElementById('cartItems').innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div><b>${x.name}</b><small>₹${x.price} × ${x.qty}</small></div><button class="remove" onclick="removeItem('${x.id}')">Remove</button></div>`).join(''):'<p style="color:#777;font-size:13px">Your cart is empty.</p>';
 document.getElementById('cartTotal').textContent='₹'+cart.reduce((s,x)=>s+x.price*x.qty,0);
}
function openCart(){document.getElementById('cartOverlay').classList.remove('hidden');updateCart()}
function closeCart(){document.getElementById('cartOverlay').classList.add('hidden')}
function viewProduct(id){
 const p=products.find(x=>x.id===id);
 document.getElementById('productModalBody').innerHTML=`<div class="modal-cover"><span>${p.type}</span><strong>${p.name}</strong><span>LEDGERX</span></div><h2>${p.name}</h2><p style="margin-top:8px">${p.desc}</p><div class="modal-actions"><strong style="font-size:22px">₹${p.price}</strong><button class="add" onclick="addToCart('${p.id}');closeProduct()">Add to Cart</button></div>`;
 document.getElementById('productOverlay').classList.remove('hidden');
}
function closeProduct(){document.getElementById('productOverlay').classList.add('hidden')}
function checkout(){
 if(!cart.length){toast('Your cart is empty');return}
 alert('Checkout is ready for integration. Connect a payment gateway and order system before accepting real payments.');
}
function toast(msg){const t=document.createElement('div');t.textContent=msg;Object.assign(t.style,{position:'fixed',bottom:'22px',left:'50%',transform:'translateX(-50%)',background:'#111',color:'#fff',padding:'11px 17px',borderRadius:'9px',zIndex:200,fontSize:'12px'});document.body.appendChild(t);setTimeout(()=>t.remove(),1800)}
renderProducts();
