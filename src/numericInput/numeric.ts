
const btnReset = document.querySelector('.btn-reset') as HTMLButtonElement;

export class Numeric {
    async NumericInput(inputNumber: any) {
        const btnPrevious = document.createElement('button');
        const btnNext = document.createElement('button');
        const spanNum = document.createElement('span');
        console.log(inputNumber);
        spanNum.setAttribute('id', `span_${inputNumber.id}`);
        spanNum.setAttribute('value', '0');

        spanNum.innerHTML = ' 0 ';
        btnNext.textContent = '+';
        btnPrevious.textContent = '-';

        inputNumber?.appendChild(btnPrevious);
        inputNumber?.appendChild(spanNum);
        inputNumber?.appendChild(btnNext);

        btnPrevious.addEventListener('click', () => {
            let oldNum = (spanNum as HTMLSpanElement).innerHTML;

            if(isNumeric(oldNum)){
                let newNum = parseInt(oldNum) - 1;
                (spanNum as HTMLInputElement).innerHTML = ` ${newNum} `;
                checkValidate()
            }
            else{
                alert("Number is invalid")
                spanNum.innerHTML = ' 0 ';
            }
            compareNumber();
        })

        btnNext.addEventListener('click', () => {
            let oldNum = (spanNum as HTMLInputElement).innerHTML;

            if(isNumeric(oldNum)){
                let newNum = parseInt(oldNum) + 1;
                (spanNum as HTMLInputElement).innerHTML = ` ${newNum} `;
                checkValidate()
            }
            else{
                alert("Number is invalid")
                spanNum.innerHTML = ' 0 ';
            }
            compareNumber();
        })
        btnReset.addEventListener('click', () => {
            spanNum.innerHTML = ' 0 ';
            btnPrevious.setAttribute('disabled', 'true');
            compareNumber()
        })
        const checkValidate = () => {
            if( parseInt((spanNum as HTMLSpanElement).innerHTML ) <= 0 ) {
                btnPrevious.setAttribute('disabled', 'true');
            }
            else {
                btnPrevious.removeAttribute("disabled");
            }
        }
        const isNumeric = (val: string) : boolean => {
            return !isNaN(Number(val));
        }
        checkValidate();

        const compareNumber = () => {
            let numA =parseInt ((document.getElementById(`span_number_input_1`) as HTMLSpanElement).innerHTML);
            let numB =parseInt ((document.getElementById(`span_number_input_2`) as HTMLSpanElement).innerHTML);
            const result = document.getElementById('result');

            if(numA > numB){
                result.innerHTML= 'A is greater than B'
            }
            else{
                if(numA < numB)
                    result.innerHTML= 'A is less than B'
                else
                    result.innerHTML= 'A is equal to B'
            }
        }

    }
}




