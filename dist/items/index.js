var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Item } from '../classes/item.js';
import { App } from './app.js';
const table = document.querySelector('.tbl-items');
const app = new App();
const host = 'http://localhost:8765/api/v1';
function getListItem() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${host}/item?fields=[\"$all\"]`)
            .then(function (res) {
            return res.json();
        })
            .then(function (data) {
            const items = data.results.objects.rows;
            items.forEach((item) => {
                createItem(item);
            });
        });
    });
}
getListItem();
const exportJson = document.querySelector('.btn-export-json');
const listItemJson = document.querySelector('.list-item-json');
const form = document.querySelector('.new-item-form');
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let title = document.getElementById("title").value;
    if (title == '') {
        alert("Title is empty");
    }
    else {
        const item = new Item(`id`, title);
        // const it = await app.addItem(item);
        const data = { title: item.title };
        let request = {
            method: 'POST',
            contentType: 'application/json',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        };
        let addItemRequest = new Request(`${host}/item`, request);
        const newItem = yield fetch(addItemRequest)
            .then(function (response) {
            return response;
        })
            .then(function (data) {
            fetch(`${host}/item?fields=[%22$all%22]&order=[["created_at","DESC"]]&limit=1`)
                .then(function (res) {
                return res.json();
            })
                .then(function (data) {
                const item = data.results.objects.rows[0];
                createItem(item);
            });
        });
    }
}));
exportJson.addEventListener('click', () => {
    fetch(`${host}/item?fields=[\"$all\"]`)
        .then(function (res) {
        return res.json();
    })
        .then(function (data) {
        const items = data.results.objects.rows;
        const json = JSON.stringify(items);
        const spanItem = document.createElement('span');
        spanItem.innerHTML = `data is: ${json}`;
        listItemJson.append(spanItem);
    });
});
const deleteItem = (item, tr) => {
    app.deleteItem(item);
    tr.remove();
};
const inputTitle = document.createElement('input');
function editItem(item, tdTitle, btnEdit, tdEdit, btnDelete, tdDelete) {
    const btnSave = document.createElement('button');
    const btnCancel = document.createElement('button');
    btnEdit.style.display = "none";
    btnDelete.style.display = "none";
    const oldTitle = tdTitle.innerHTML;
    tdTitle.innerHTML = '';
    inputTitle.value = `${oldTitle}`;
    tdTitle === null || tdTitle === void 0 ? void 0 : tdTitle.appendChild(inputTitle);
    btnSave.textContent = 'Save';
    btnCancel.textContent = 'Cancel';
    tdEdit === null || tdEdit === void 0 ? void 0 : tdEdit.appendChild(btnSave);
    tdDelete === null || tdDelete === void 0 ? void 0 : tdDelete.appendChild(btnCancel);
    btnSave.removeAttribute('style');
    btnCancel.removeAttribute('style');
    btnSave.addEventListener('click', () => {
        btnEdit.removeAttribute('style');
        btnDelete.removeAttribute('style');
        const newTitle = inputTitle.value;
        inputTitle.remove();
        item.title = newTitle;
        tdTitle.innerHTML = newTitle;
        app.editItem(item);
        btnSave.remove();
        btnCancel.remove();
    });
    btnCancel.addEventListener('click', () => {
        btnEdit.removeAttribute('style');
        btnDelete.removeAttribute('style');
        btnSave.style.display = "none";
        btnCancel.style.display = "none";
        inputTitle.remove();
        tdTitle.innerHTML = oldTitle;
    });
}
function createItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const tr = document.createElement('tr');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        const tdTitle = document.createElement('td');
        const tdEdit = document.createElement('td');
        const tdDelete = document.createElement('td');
        btnEdit.textContent = 'Edit';
        btnDelete.textContent = 'Delete';
        tdTitle.innerHTML = `${item.title}`;
        tdTitle.title = `${item.id}`;
        tdEdit === null || tdEdit === void 0 ? void 0 : tdEdit.appendChild(btnEdit);
        tdDelete === null || tdDelete === void 0 ? void 0 : tdDelete.appendChild(btnDelete);
        tr === null || tr === void 0 ? void 0 : tr.appendChild(tdTitle);
        tr === null || tr === void 0 ? void 0 : tr.appendChild(tdEdit);
        tr === null || tr === void 0 ? void 0 : tr.appendChild(tdDelete);
        table === null || table === void 0 ? void 0 : table.appendChild(tr);
        btnDelete.addEventListener('click', () => {
            item.id = tdTitle.title;
            deleteItem(item, tr);
        });
        btnEdit.addEventListener('click', () => {
            item.id = tdTitle.title;
            editItem(item, tdTitle, btnEdit, tdEdit, btnDelete, tdDelete);
        });
    });
}
