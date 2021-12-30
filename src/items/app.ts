import {Item} from "../classes/item";
const host = 'http://localhost:8765/api/v1';

export class App {
    async addItem(item: Item) {
        const data = {title: item.title};
        let request = {
            method : 'POST',
            contentType : 'application/json',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        };

        let addItemRequest = new Request(`${host}/item`, request)

        fetch(addItemRequest).then(function (res){
            return res;
        })
    }

    async editItem(item: Item) {
        const data = {title: item.title};

        let request = {
            method : 'PUT',
            contentType : 'application/json',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        };

        let addItemRequest = new Request(`${host}/item/${item.id}`, request)

        fetch(addItemRequest).then(function (res){
            return res;
        })
    }

    async deleteItem(item: Item) {
        let request = {
            method : 'DELETE',
            contentType : 'application/json',
            headers: { 'Content-Type': 'application/json'},
        };

        let addItemRequest = new Request(`${host}/item/${item.id}`, request)

        fetch(addItemRequest).then(function (res){
            return res;
        })
    }
    async getListItem () {
        await fetch(`${host}/item?fields=[\"$all\"]`)
            .then(function (res){
                return res.json();
            })
            .then(function (data){
                const items = data.results.objects.rows;
                return items;
            });
    }
}
