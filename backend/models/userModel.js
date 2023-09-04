const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const axios=require('axios')

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
      gender:{
        type:String,
      }
})

userSchema.pre('save',async function(next) {
  this.password=await bcrypt.hash(this.password,12);
  this.passwordConfirm=undefined

  let value=await axios.get(`https://api.genderize.io?name=${this.name.split(' ')[0]}`)
  this.gender=value.data.gender;

});


userSchema.methods.correctPassword=async function(passwordDB,typedPassword)
{
    return await bcrypt.compare(typedPassword,passwordDB);
}


const User=mongoose.model('User',userSchema);
module.exports=User;