const {model,Schema} = require('mongoose')
const TodoSchema = Schema(
    {
        name:{
            type:String,
            require: true
        },
        description:{
            type:String,
            require: true
        },
        done:{
            type:Boolean,
            default : 0,
            require:false
        }
    },{
        timestamps:true
    }
)
const Task = model("quests",TodoSchema)
module.exports = Task;