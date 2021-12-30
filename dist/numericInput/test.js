var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const btnReset = document.querySelector('.btn-reset');
export class Numeric {
    NumericInput(inputNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const btnPrevious = document.createElement('button');
            const btnNext = document.createElement('button');
            const spanNum = document.createElement('span');
            console.log(inputNumber);
            spanNum.setAttribute('id', `span_${inputNumber.id}`);
            spanNum.setAttribute('value', '0');
            spanNum.innerHTML = ' 0 ';
            btnNext.textContent = '+';
            btnPrevious.textContent = '-';
            inputNumber === null || inputNumber === void 0 ? void 0 : inputNumber.appendChild(btnPrevious);
            inputNumber === null || inputNumber === void 0 ? void 0 : inputNumber.appendChild(spanNum);
            inputNumber === null || inputNumber === void 0 ? void 0 : inputNumber.appendChild(btnNext);
            btnPrevious.addEventListener('click', () => {
                let oldNum = spanNum.innerHTML;
                if (isNumeric(oldNum)) {
                    let newNum = parseInt(oldNum) - 1;
                    spanNum.innerHTML = ` ${newNum} `;
                    checkValidate();
                }
                else {
                    alert("Number is invalid");
                    spanNum.innerHTML = ' 0 ';
                }
                compareNumber();
            });
            btnNext.addEventListener('click', () => {
                let oldNum = spanNum.innerHTML;
                if (isNumeric(oldNum)) {
                    let newNum = parseInt(oldNum) + 1;
                    spanNum.innerHTML = ` ${newNum} `;
                    checkValidate();
                }
                else {
                    alert("Number is invalid");
                    spanNum.innerHTML = ' 0 ';
                }
                compareNumber();
            });
            btnReset.addEventListener('click', () => {
                spanNum.innerHTML = ' 0 ';
                btnPrevious.setAttribute('disabled', 'true');
            });
            const checkValidate = () => {
                if (parseInt(spanNum.innerHTML) <= 0) {
                    btnPrevious.setAttribute('disabled', 'true');
                }
                else {
                    btnPrevious.removeAttribute("disabled");
                }
            };
            const isNumeric = (val) => {
                return !isNaN(Number(val));
            };
            checkValidate();
            const compareNumber = () => {
                let numA = parseInt(document.getElementById(`span_number_input_1`).innerHTML);
                let numB = parseInt(document.getElementById(`span_number_input_2`).innerHTML);
                const result = document.getElementById('result');
                if (numA > numB) {
                    result.innerHTML = 'A is greater than B';
                }
                else {
                    if (numA < numB)
                        result.innerHTML = 'A is less than B';
                    else
                        result.innerHTML = 'A is equal to B';
                }
            };
        });
    }
}
