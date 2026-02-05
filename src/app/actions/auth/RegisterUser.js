// "use server";
// import dbConnect from "@/lib/dbConnect";
// import bcrypt from "bcrypt";

// export const RegisterUser = async (payload) => {
//   const userCollection = await dbConnect("userInfo");
//   const { email, password } = payload;

//   if (!email || !password) {
//     return { success: false, message: "Email and password are required" };
//   }

//   const user = await userCollection.findOne({ email: payload.email });

//   if (!user) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     payload.password = hashedPassword;
//     payload.role = "user";
//     const result = await userCollection.insertOne(payload);

//     return { success: true, insertedId: result.insertedId.toString() };
//   }
//   console.log("User already exists");
//   return { success: false, message: "User already exists", status: 500 };
// };
"use server"
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const RegisterUser=async(payload)=>{
    const userCollection= await dbConnect("userInfo")
    console.log("payload", payload);
    // validation
    const {email,password}=payload
    if(!email || !password){
        return {success : false}
    }
    const user= await userCollection.findOne({email: payload.email})
    if(!user){
        const hashPassword= await bcrypt.hash(password,10)
        payload.password= hashPassword
        payload.role="user"
        const result=await userCollection.insertOne(payload)
        // console.log("result =====>",result);
        return { success : true , insertedId: result.insertedId.toString()}

    }
    console.log( "all rady have",user);
    return {success : false ,status: 500}
}