const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Connection
mongoose.connect('mongodb://localhost:27017/Logindemo',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

const useSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    }
})
//Useful methods
useSchema.pre("save",function(next){
    if(!this.isModified('password')){
        return next();
    }
        this.password = bcrypt.hashSync(this.password,12);
        next();
})

useSchema.methods.comparePassword=function(plaitext,callback){
    return callback(null,bcrypt.compareSync(plaitext,this.password));
}

const useModel = mongoose.model('LoginUser', useSchema);

module.exports = useModel;