import { PUBLIC_FRONT_END_URL } from "$env/static/public";
import { fail, redirect } from "@sveltejs/kit";

interface RegisterReturnObject {
  success: boolean;
  email:string;
  password:string;
  passwordConfirmation?:never;
  name?:never;
  errors: string[];
}
export const actions = {
  signInWithPassword: async ({ request, locals:{supabase} }) => {
    const formData = await request.formData();
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    

    const returnObject: RegisterReturnObject = {
      success: true,
      email,
      password,
      errors: [],
    };

    if (!email.length) {
      returnObject.errors.push("email required.");
    }
    if (!password.length) {
      returnObject.errors.push("password required");
    }

    if (returnObject.errors.length) {
      returnObject.success = false;
      return returnObject;
    }
   
    const {data,error} =await supabase.auth.signInWithPassword({
        email,
        password,
     });
     if(error || !data.user){
        returnObject.success=false;
        return fail(400, returnObject as any)
     }
     redirect(303,"/private/dashboard");
  },
  googleLogin:async({locals:{supabase}}) => {
   const{data, error}= await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        redirectTo:`${PUBLIC_FRONT_END_URL}/auth/callback`
      }
    });
    if(error){
      return fail(400,{message:"Something went erong with Google login"});
    }

    throw redirect(303,data.url);
  },
};