function isEmpty(value){
    if(value===null || value == undefined){
        return true;
    } 

    if(typeof value === 'object'){
        let kv = Object.keys(value);
        let vv = Object.values(value);
        if(kv.length === 0) {
            return true;
        }
        
        let cnt = 0;
       for(const v in vv){
            if(vv[v] === null || vv[v] === undefined) {cnt ++;}
            else if(Object.keys(vv[v]).length === 0) {cnt ++;}
            else if(Object.values(vv[v])[0].length === 0) {cnt ++;}
       }
       if(cnt === vv.length) return true;

    }

    if(value === ''){
        return true;
    }
    
    return false;
}