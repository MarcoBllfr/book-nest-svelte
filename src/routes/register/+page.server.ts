import type { Action } from "./$types";
interface RegisterReturnObject {
    success: boolean;
    errors : string[];
}
export const actions = {
    default: async ({request}) =>{
        const formData = await request.formData();
        const name= formData.get("name") as string;
        const email= formData.get("email") as string;
        const password= formData.get("password") as string;
        const passwordConfirmation= formData.get("passwordConfirmation") as string;
        
        const returnObject : RegisterReturnObject= {
            success: true,
            errors : [],
        }

        if(name.length < 3){
            returnObject.errors.push("The name is too short, must be lengt 3 characters");
        }
        if(!email.length){
            returnObject.errors.push("email required.");
        }
        if(!password.length){
            returnObject.errors.push("password required");
        }

        if(password !== passwordConfirmation){
            returnObject.errors.push("the password and confirmation password do not match");
        }

        if(returnObject.errors.length){
            returnObject.success= false;
            return returnObject;
        }

        return returnObject;
    }

};