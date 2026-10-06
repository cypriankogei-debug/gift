const cards=[...document.querySelectorAll('.card')];
const favorites=new Set();
const search=document.querySelector('#search');
const count=document.querySelector('#count');
const dialog=document.querySelector('#details');
let currentGift=null;

function refresh(){
  const category=document.querySelector('.filter.active').dataset.category;
  const term=search.value.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const show=(category==='All'||card.dataset.category===category)&&card.dataset.name.includes(term);
    card.hidden=!show;
    if(show) visible++;
  });
  document.querySelector('#empty').hidden=visible>0;
  count.textContent=favorites.size;
  document.querySelectorAll('[data-favorite]').forEach(button=>{
    const active=favorites.has(button.dataset.favorite);
    button.setAttribute('aria-pressed',String(active));
    button.textContent=active?'♥':'♡';
  });
}
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(item=>item.classList.toggle('active',item===button));refresh();
}));
search.addEventListener('input',refresh);
document.querySelectorAll('[data-favorite]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.favorite;favorites.has(id)?favorites.delete(id):favorites.add(id);refresh();
}));
function openGift(id){
  const card=cards.find(item=>item.querySelector(`[data-open="${id}"]`));if(!card)return;
  currentGift=id;
  const image=card.querySelector('img');
  document.querySelector('#dialog-image').src=image.src;
  document.querySelector('#dialog-image').alt=image.alt;
  document.querySelector('#dialog-category').textContent=card.dataset.category;
  document.querySelector('#dialog-title').textContent=card.querySelector('h3').textContent;
  document.querySelector('#dialog-description').textContent=card.querySelector('.description').textContent;
  document.querySelector('#dialog-price').textContent=card.querySelector('.item-foot b').textContent;
  const fav=document.querySelector('#dialog-favorite');fav.textContent=favorites.has(id)?'In your wishlist ♥':'Add to wishlist ♡';
  dialog.showModal();
}
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openGift(button.dataset.open)));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-favorite').addEventListener('click',()=>{
  if(!currentGift)return;favorites.has(currentGift)?favorites.delete(currentGift):favorites.add(currentGift);refresh();
  document.querySelector('#dialog-favorite').textContent=favorites.has(currentGift)?'In your wishlist ♥':'Add to wishlist ♡';
});
document.querySelector('#surprise').addEventListener('click',()=>openGift(cards[Math.floor(Math.random()*cards.length)].querySelector('[data-open]').dataset.open));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
