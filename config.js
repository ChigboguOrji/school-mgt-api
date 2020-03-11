process.argv.forEach(function(val,index,array){
    const arg = val.split("=")
    if(arg.length>0){
        if(arg[0]==='env'){
            console.log(arg[1])
            const env =  require("./"+arg[1]+'.json')
            module.exports = env
        }
    }
})