import Mongoose from 'mongoose';


const RoleSchema = Mongoose.Schema(
    name:{
        type:String,
        unique:true
    },{ timestamps: true, versionKey: false }
);

export default new Mongoose.model('Role', RoleSchema);