let collapseExpanse= ()=>{         
    document.activeElement.querySelector('i').classList.toggle("collapse");
    document.activeElement.parentNode.parentNode.querySelector('ul').classList.toggle("visible")
}


let inputNumber = (number)=>{
    document.activeElement.parentNode.querySelector("#input-number").stepUp(number);
    console.log(`hola que ase me pone el numero ${number} o k ase`)
    // console.log(document.activeElement.parentNode.getElementById("input-number"))
}



let collapseExpanse2= ()=>{         
    // document.activeElement.querySelector('i').classList.toggle("collapse");
    document.activeElement.parentNode.querySelector('ul').classList.toggle("visible");   
}

//buttons


    //toast


