import {Item} from '../classes/item.js' ;
import {App} from './app.js' ;
const table = document.querySelector('.tbl-items') as HTMLTableElement;
const app = new App();
const host = 'http://localhost:8765/api/v1';

async function getListItem () {
    await fetch(`${host}/item?fields=[\"$all\"]`)
        .then(function (res){
            return res.json();
        })
        .then(function (data){
            const items = data.results.objects.rows;
            items.forEach((item: Item) => {
                createItem(item);
            })
        });
}
getListItem();

const exportJson = document.querySelector('.btn-export-json') as HTMLButtonElement;
const listItemJson = document.querySelector('.list-item-json') as HTMLDivElement;
const form = document.querySelector('.new-item-form') as HTMLFormElement;

form.addEventListener('submit',  async (e: Event) => {
    e.preventDefault();

    let title = (document.getElementById("title") as HTMLInputElement).value;
    if(title == '' )
    {
        alert("Title is empty")
    }
    else{
        const item = new Item(`id`, title);
        // const it = await app.addItem(item);
        const data = {title: item.title};
        let request = {
            method : 'POST',
            contentType : 'application/json',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        };

        let addItemRequest = new Request(`${host}/item`, request)

        const newItem = await fetch(addItemRequest)
            .then(function (response){
                return response;
            })
            .then(function (data){
                fetch(`${host}/item?fields=[%22$all%22]&order=[["created_at","DESC"]]&limit=1`)
                    .then(function (res){
                        return res.json();
                    })
                    .then(function (data){
                        const item = data.results.objects.rows[0];
                            createItem(item);
                    });
            });

    }
});

exportJson.addEventListener('click', () => {
    fetch(`${host}/item?fields=[\"$all\"]`)
        .then(function (res){
            return res.json();
        })
        .then(function (data){
            const items = data.results.objects.rows;
            const json = JSON.stringify(items)
            const spanItem= document.createElement('span');
            spanItem.innerHTML = `data is: ${json}`;
            listItemJson.append(spanItem)
        });

})

const deleteItem = (item: Item, tr: any) => {
    app.deleteItem(item);
    tr.remove();
}

const inputTitle = document.createElement('input');


function editItem  (item: Item, tdTitle: any, btnEdit: any, tdEdit: any, btnDelete: any, tdDelete: any)  {

    const btnSave = document.createElement('button');
    const btnCancel = document.createElement('button');
    btnEdit.style.display = "none";
    btnDelete.style.display = "none";

    const oldTitle = tdTitle.innerHTML
    tdTitle.innerHTML='';
    inputTitle.value = `${oldTitle}`
    tdTitle?.appendChild(inputTitle);
    btnSave.textContent = 'Save';
    btnCancel.textContent = 'Cancel';
    tdEdit?.appendChild(btnSave);
    tdDelete?.appendChild(btnCancel);

    btnSave.removeAttribute('style')
    btnCancel.removeAttribute('style')

    btnSave.addEventListener('click', () => {
        btnEdit.removeAttribute('style')
        btnDelete.removeAttribute('style')

        const newTitle = inputTitle.value
        inputTitle.remove();
        item.title = newTitle;
        tdTitle.innerHTML = newTitle;
        app.editItem(item);

        btnSave.remove()
        btnCancel.remove()
    })

    btnCancel.addEventListener('click', () => {
        btnEdit.removeAttribute('style')
        btnDelete.removeAttribute('style')

        btnSave.style.display = "none";
        btnCancel.style.display = "none";

        inputTitle.remove();
        tdTitle.innerHTML = oldTitle;
    })
}

async function createItem(item : Item){
    const tr = document.createElement('tr');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');

    const tdTitle = document.createElement('td');

    const tdEdit = document.createElement('td');
    const tdDelete = document.createElement('td');

    btnEdit.textContent = 'Edit';
    btnDelete.textContent = 'Delete';

    tdTitle.innerHTML = `${item.title}`
    tdTitle.title = `${item.id}`;

    tdEdit?.appendChild(btnEdit);
    tdDelete?.appendChild(btnDelete);
    tr?.appendChild(tdTitle);
    tr?.appendChild(tdEdit);
    tr?.appendChild(tdDelete);
    table?.appendChild(tr);

    btnDelete.addEventListener('click', () => {
        item.id = tdTitle.title;
        deleteItem(item, tr);
    })
    btnEdit.addEventListener('click', () => {
        item.id = tdTitle.title;
        editItem(item, tdTitle,btnEdit,tdEdit,btnDelete, tdDelete);
    })
}


