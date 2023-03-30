let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == '='){
            string = eval(string);
            input.value = string;
        }

        else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
        }
        else if(e.target.innerHTML == 'DEL'){
            // string=string.slice(0,(string.length-1));
            string=input.e.slice(0,(input.value.length-1));
            input.value=string;
        }
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
        
    })
})
