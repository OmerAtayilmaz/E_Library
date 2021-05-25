module.exports=(temp,data)=>{
    
    let output = temp.replace(/{%BOOK%}/g,data.book);
    output = output.replace(/{%AUTHOR%}/g,data.author);
    output = output.replace(/{%ID%}/g,data.id);
    output = output.replace(/{%SORT%}/g,data.sort);
    output=output.replace(/{%READ%}/g,data.read);
    output=output.replace(/{%CREDIT_TABLE%}/g,data.Credit);
    const progress=Number(data.Credit)*10;
    output = output.replace(/{%PROCESS%}/g,"style=width:"+progress+"%");
    output = output.replace(/{%CREDIT%}/g,progress);
    return output;
}