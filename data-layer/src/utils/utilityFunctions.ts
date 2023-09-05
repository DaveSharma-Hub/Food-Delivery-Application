export function validateObjectSchema(obj:object , schema:string[]){
    schema.forEach((key:any)=>{
        if(!(key in obj) ){
            throw new Error(`Schema validation error.Key ${key} doesnt exist on schema`);
        }
    });
}

export function distanceBetweenLocations(firstLocation, secondLocation){
    return 10;
}

export function timeBetweenLocations(firstLocation, secondLocation){
    return 10;
}