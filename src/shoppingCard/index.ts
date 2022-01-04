
import {Numeric} from '../numericInput/numeric.js'
import {Item} from '../classes/item.js' ;
import {App} from '../items/app.js' ;
import {Product} from "../classes/product";

const host = 'http://localhost:8765/api/v1';
const app = new App();
const table = document.querySelector('.tbl-items') as HTMLTableElement;
const cardTotal = document.querySelector('.total') as HTMLTableElement;

async function getListItem () {
    await fetch(`${host}/item?fields=[\"$all\"]`)
        .then(function (res){
            return res.json();
        })
        .then(function (data){
            const items = data.results.objects.rows;
            items.forEach((item: Item) => {
                createItem(item).then(()=>{
                    cardTotal.innerHTML = `Total: ${total}`
                })
            })
        });
}
getListItem();
let price = 1;
let total = 0;
async function createItem(item : Item){

    const tr = document.createElement('tr');
    const btnDelete = document.createElement('button');

    const tdTitle = document.createElement('td');
    const tdImage = document.createElement('td');
    const tdPrice = document.createElement('td');
    const tdQuantity = document.createElement('td');
    const tdSubtotal = document.createElement('td');
    const image = document.createElement('div');
    const tdDelete = document.createElement('td');

    NumericInput(tdQuantity, tdSubtotal, price);

    image.style.width = '100px';
    image.style.height = '100px';
    image.style.backgroundColor = 'blue';

    btnDelete.textContent = 'Delete';
    tdTitle.innerHTML = `${item.title}`
    tdTitle.title = `${item.id}`;
    tdImage.append(image);
    tdPrice.innerHTML = `${price}`
    tdSubtotal.innerHTML = `${price}`
    total += price;
    price++

    tdDelete?.appendChild(btnDelete);
    tr?.appendChild(tdImage);
    tr?.appendChild(tdTitle);
    tr?.appendChild(tdPrice);
    tr?.appendChild(tdQuantity);
    tr?.appendChild(tdSubtotal);
    tr?.appendChild(tdDelete);
    table?.appendChild(tr);

    btnDelete.addEventListener('click', () => {
        tr.remove()
    })
}

async function NumericInput(inputNumber: any, tdSubtotal: any, price: number) {
    const btnPrevious = document.createElement('button');
    const btnNext = document.createElement('button');
    const spanNum = document.createElement('span');
    console.log(inputNumber);
    spanNum.setAttribute('id', `span_${inputNumber.id}`);
    spanNum.setAttribute('value', '0');

    spanNum.innerHTML = ' 1 ';
    btnNext.textContent = '+';
    btnPrevious.textContent = '-';

    inputNumber?.appendChild(btnPrevious);
    inputNumber?.appendChild(spanNum);
    inputNumber?.appendChild(btnNext);

    btnPrevious.addEventListener('click', () => {
        let oldNum = (spanNum as HTMLSpanElement).innerHTML;
        total -= price
        if(isNumeric(oldNum)){
            let newNum = parseInt(oldNum) - 1;
            (spanNum as HTMLInputElement).innerHTML = ` ${newNum} `;

            const subTotal = sumSubTotal(newNum, price);
            tdSubtotal.innerHTML = `${subTotal}`
            cardTotal.innerHTML = `Total: ${total}`
        }
        else{
            alert("Number is invalid")
            spanNum.innerHTML = ' 1 ';
            const subTotal = sumSubTotal(1, price);
            tdSubtotal.innerHTML = `${subTotal}`
            cardTotal.innerHTML = `Total: ${total}`

        }
        checkValidate()
    })

    btnNext.addEventListener('click', () => {
        let oldNum = (spanNum as HTMLInputElement).innerHTML;
        total += price;
        if(isNumeric(oldNum)){
            let newNum = parseInt(oldNum) + 1;
            (spanNum as HTMLInputElement).innerHTML = ` ${newNum} `;

            const subTotal = sumSubTotal(newNum, price);
            tdSubtotal.innerHTML = `${subTotal}`
            cardTotal.innerHTML = `Total: ${total}`
        }
        else{
            alert("Number is invalid")
            spanNum.innerHTML = ' 1 ';
            const subTotal = sumSubTotal(1, price);
            tdSubtotal.innerHTML = `${subTotal}`
            cardTotal.innerHTML = `Total: ${total}`

        }
        checkValidate()
    })
    const sumSubTotal = (newNum: number, price: number) : number  => {
        const subTotal = newNum*price;
        return subTotal;
    }

    const checkValidate = () => {
        if( parseInt((spanNum as HTMLSpanElement).innerHTML ) <= 1 ) {
            btnPrevious.setAttribute('disabled', 'true');
        }
        else {
            btnPrevious.removeAttribute("disabled");
        }
    }
    const isNumeric = (val: string) : boolean => {
        if(!isNaN(Number(val))){
            if(parseInt(val) < 1){
                return false;
            }
            else{
                return true;
            }
        }else{
            return !isNaN(Number(val));
        }
    }
    checkValidate();

}