
const charCapital = (str="")=>{

    let capital = str.charAt(0).toUpperCase() + str.slice(1);

    return capital;

}



module.exports = {
    charCapital
}