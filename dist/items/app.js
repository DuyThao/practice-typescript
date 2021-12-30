var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const host = 'http://localhost:8765/api/v1';
export class App {
    addItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = { title: item.title };
            let request = {
                method: 'POST',
                contentType: 'application/json',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            };
            let addItemRequest = new Request(`${host}/item`, request);
            fetch(addItemRequest).then(function (res) {
                return res;
            });
        });
    }
    editItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = { title: item.title };
            let request = {
                method: 'PUT',
                contentType: 'application/json',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            };
            let addItemRequest = new Request(`${host}/item/${item.id}`, request);
            fetch(addItemRequest).then(function (res) {
                return res;
            });
        });
    }
    deleteItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = {
                method: 'DELETE',
                contentType: 'application/json',
                headers: { 'Content-Type': 'application/json' },
            };
            let addItemRequest = new Request(`${host}/item/${item.id}`, request);
            fetch(addItemRequest).then(function (res) {
                return res;
            });
        });
    }
    getListItem() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${host}/item?fields=[\"$all\"]`)
                .then(function (res) {
                return res.json();
            })
                .then(function (data) {
                const items = data.results.objects.rows;
                return items;
            });
        });
    }
}
