const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic: {
        type:String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
})

userSchema.pre('save',async function(next) {
  this.password=await bcrypt.hash(this.password,12);
  this.passwordConfirm=undefined
});


userSchema.methods.correctPassword=async function(passwordDB,typedPassword)
{
    return await bcrypt.compare(typedPassword,passwordDB);
}


const User=mongoose.model('User',userSchema);
module.exports=User;