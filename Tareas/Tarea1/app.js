let mateBasica = require('./mate.js');

let readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

function continu(){
    readline.question("¿Deseas realizar alguna otra operación? 1 = Si / 0 = No: ", function(election){
        if(election == 1){
            operations();
        }else if(election == 0){
            readline.close();
        }else{
            console.log("Operación no reconocida, ingresa de nuevo el comando");
            continu();
        }
    });
};

function operations(){
    readline.question("Selecciona la operación a realizar ( + - * / %): ", (op) => {
        if(op != "+" && op != "-" && op != "*" && op != "/" && op != "%"){
            console.log("Operación no reconocida, ingresa de nuevo el comando");
            operations();
        }else{
            readline.question("Ingresa el primer número: ", (n1) =>{
                readline.question("Ingresa el segundo número: ", (n2) => {
                    switch(op){
                        case "+":
                            opRes = mateBasica.suma(n1, n2);
                            console.log(`${n1} + ${n2} = ${opRes}`);
                            break;
                        case "-":
                            opRes = mateBasica.resta(n1, n2);
                            console.log(`${n1} - ${n2} = ${opRes}`);
                            break;
                        case "*":
                            opRes = mateBasica.producto(n1, n2);
                            console.log(`${n1} * ${n2} = ${opRes}`);
                            break;
                        case "/":
                            opRes = mateBasica.division(n1, n2);
                            console.log(`${n1} / ${n2} = ${opRes}`);
                            break;
                        case "%":
                            opRes = mateBasica.modulo(n1, n2);
                            console.log(`${n1} % ${n2} = ${opRes}`);
                            break;
                    };
                    continu();
                });
            });
        }
    });
};

operations();

