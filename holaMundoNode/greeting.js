function greet(){

    const d = new Date();
    let hour = d.getHours();

    let greet = ""

    if(hour < 12){
        greet = "buenos dias"
    }else if (hour < 19){
        greet = "buenos dias"
    }else{
        greet = "buenas noches"
    }
    
    console.log(greet)

}