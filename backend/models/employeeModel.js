const mongoose= require ('mongoose')
const bcrypt= require('bcrypt')

const EmploySchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})
EmploySchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};
EmploySchema.pre('save',async function (next) {
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

const Employmodel = mongoose.model("employees",EmploySchema)
module.exports = Employmodel 