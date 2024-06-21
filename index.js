import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 4000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

let submittedData = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {submittedData});
});
app.get("/create", (req, res) => {
    res.render("create.ejs");
});
app.get("/view", (req, res) => {
    res.render("view.ejs");
});
app.post("/submit", (req, res) => {
    const pname = req.body['name'];
    const ptitle = req.body['title'];
    const ptext = req.body['text'];
    const today = new Date();
    const newPost = {
        fName: pname,
        fTitle: ptitle,
        fText: ptext,
        tDate: today.toDateString()
    };
    submittedData.push(newPost);
    res.redirect("/"); 
})
app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    // Fetch the post from submittedData based on the postId
    const postToEdit = submittedData[postId];

    // Render an edit page/form passing the post data
    res.render("create.ejs", { postToEdit, postId });
});

app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    // Update the post in submittedData based on the edited data in req.body
    submittedData[postId].fName = req.body.name;
    submittedData[postId].fTitle = req.body.title;
    submittedData[postId].fText = req.body.text;
    // Redirect back to the main page after editing
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const postId = req.params.id;
    // Remove the post from submittedData based on the postId
    submittedData.splice(postId, 1);

    // Redirect back to the main page after deleting
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`App Listening at port:- ${port}`);
});
