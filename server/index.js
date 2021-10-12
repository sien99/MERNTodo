//* RESTFUL API
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//process.env
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

//connect to mongo atlas
const mongoAtlasPassword = process.env.MONGOPASSWORD
mongoose.connect('mongodb+srv://admin-yh:'+mongoAtlasPassword+'@cluster0.ea91s.mongodb.net/todolistv3DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
     console.log("Mongo Atlas Online database connected.")
   }).catch((error)=>{
       console.error(error)
    });

const noteSchema={
    title: String,
    content: String,
    userId: String
}

const Note = mongoose.model("Note",noteSchema);

const note1 = {
    title: "This is sample note title",
    content: "This is sample note content"
}

const note2 = {
    title: "This is sample note title",
    content: "This is sample note content"
}

const noteDef = [note1,note2];
//ROUTES  

//get todos
app.get("/todos", async(req,res)=>{
    try{
        Note.find({},function (err,foundNotes){
        //insert default notes if empty Notes collection
        // if(foundNotes.length===0){
        //     Note.insertMany(noteDef,function(err){
        //         if(err){
        //             console.error(err);
        //         }else{
        //             console.log("Successfully added default notes");
        //         }
        //         res.redirect("/");
        //     });
        // }

        //else just res all foundNotes
        const response = res.json(foundNotes);
        // console.log(response);

        });
    }catch(err){
        console.error(err.message);
    }
});

//insert a todo into atlas
app.post("/todos",(req,res)=>{
    try{
        // const small = new Tank({ size: 'small' });
        // small.save(function (err) {
        // if (err) return handleError(err);
        // // saved!
        // });
        console.log(req.body); //should use console to see
        const title  = req.body.newNote.title;
        const content  = req.body.newNote.content;
        const userId  = req.body.newNote.userId;

        const noteInput = new Note({
            title: title,
            content: content,
            userId: userId
        });

        noteInput.save(function(err){
            if(err){
                return handleError(err);
            }else{
                console.log("Successfully added data into db!");
            } 
            //saved!
        });

    }catch(err){
        console.error(err.message);
    }
});

app.put("/todos/:id", async(req,res) => {
    try {
        // console.log(req.body);
        const { id } = req.params;
        const { title, content } = req.body.edit;
        const edit = await Note.findOneAndUpdate({_id:id}, {
                title: title,
                content: content
            },
            function (err, docs) {
            if(!err){
                console.log("Successfully edit item:" + docs);
                res.json(docs)
            }
        })
        // Example: Update name to Gourav
        // User.findByIdAndUpdate(user_id, {
        //         name: 'Gourav'
        //     },
        //     function (err, docs) {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log("Updated User : ", docs);
        //         }
        //     });
    } catch (error) {
        console.error(error);
    }
});

//delete note based on unique id
app.delete("/todos/:id",async(req,res) => {
    try {
        // console.log(req.params.id);
        deleteId = req.params.id;
        const remove = await Note.findByIdAndRemove(deleteId, function(err,docs){
            if(!err){
                console.log("Successfully delete item "+deleteId);
                res.json(docs)
                // res.redirect("/");
            }else{
                console.error(err);
            }
        });
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000,()=>{
    console.log("Server has started on port 5000");
});