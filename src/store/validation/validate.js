

export const validate_user_post = (f, l) => {
    return new Promise(resolve => {
        if(!f || !l) {
            resolve("empty handed");
        }else{
            resolve("not empty")
        }
    }) 
}