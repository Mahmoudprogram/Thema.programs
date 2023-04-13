const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Lieber Thomas Wie gehts dir',
    'ich hoffe es geht dir gut',
    'ich mache eine party am Sonntag',
    'denn es ist mein Geburtstag',
    'ich lade dich ein',
    'Die party ist am sonntag um 18:00 Uhr',
    'im hotel "kaiser wilhelm',
    'bitte bring cola und pizza mit',
    'bis bald liebe',
    'grüße Amani'
];

// Store listitems
const listItems =[]; 

let dragStartIndex;

createList();

const numbers = [1,3,110,40,302];
console.log(numbers.sort(function (a,b){
    return a - b;
}));

// Insert list items into Dom 
function createList(){
    [...richestPeople]
    .map(a=> ({ value:a , sort: Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person,index)=>{
        const listItem = document.createElement('li');
        //listItem.classList.add('over');
        
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class ="draggable" draggable ="true">
          <p class ="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
        `;
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });

    addEventListeners();
}
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}
function dragEnter() {
    this.classList.add('over');
    
}
function dragLeave() {
    this.classList.remove('over');
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex , dragEndIndex);
    this.classList.remove('over');
}
// Swap list items that are drag and drop
function swapItems(fromIndex , toIndex){
   const itemOne = listItems[fromIndex].querySelector('.draggable');
   const itemTow = listItems[toIndex].querySelector('.draggable');
   listItems[fromIndex].appendChild(itemTow);
   listItems[toIndex].appendChild(itemOne);
}
// Check the order of list items 
function checkOrder(){
    listItems.forEach((listItem,index)=>{
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');

        }else{
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems= document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })


}
check.addEventListener('click',checkOrder);



/*
Lieber Thomas Wie gehts dir
 ich hoffe es geht dir gut, 
 ich mache eine party am Sonntag 
 denn es ist mein Geburtstag,
ich lade dich ein 
Die party ist am sonntag um 18:00 Uhr,
im hotel "kaiser wilhelm"
bitte bring cola und pizza mit 
bis bald liebe 
grüße Amani
  'jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry page'
*/