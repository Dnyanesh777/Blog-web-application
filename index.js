import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];


function createPost(pTitle,pContent){
    this.pTitle = pTitle;
    this.pContent = pContent;
    this.d = new Date();
    this.dateCurr = this.d.toLocaleString();
}

function addPost(pTitle, pContent) {
    let post = new createPost(pTitle, pContent);
    posts.push(post);
}

// Delete Post
function deletePost(index) {
    posts.splice(index, 1);
}
// Edit Post
function editPost(index, pTitle, pContent) {
    posts[index] = new createPost(pTitle, pContent);
}



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});



app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post. pTitle, date: post.dateCurr, content: post.pContent});
});

// Delete Post
app.post("/delete", (req, res) => {
    let index = req.body["index"];
    deletePost(index);
    res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.pTitle, content: post.pContent});
});

// Update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

// Create Post Page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});


// Save Post
app.post("/upload", (req, res) => {
    let title = req.body["title"];
    let content = req.body["blogText"];
    
    addPost(title, content);
    res.redirect("/");
});

app.listen(port,()=>{
    addPost("Is Social Media Making the Same Mistake as The Church?","Over the last few years, the American Church has been hemorrhaging people. With the advent of the internet and other cultural shifts, churches began seeing their main competition as the entertainment industry. Because their primary contact with the public was during the weekend service, many leaders lamented the rise in families' choices when deciding what to do during their precious days off. It's understandable at a glance. A priority of the generations before was being eroded before leaders' eyes. But if we look deeper, we can see the fatal flaw that created the modern exodus was instilled by the Protestant Reformation and exacerbated by the Church Growth Movement. Believe it or not, the Church's story looks eerily similar to the trajectory of social media platforms. Is Social Media making the same mistake as the Church? What was the Church's error?");
    addPost("NewBreed Welcomes Chestly Lunday to the Team","With a name like Chestly, he has to be cool. And he is. Chestly Lunday is a practitioner and pioneer in the digital church space. Now, before you start to roll your eyes, understand that Chestly was speaking about digital church before COVID happened. As an apostolically-wired pastor, he was experiencing high engagement with Gen-Z when many churches hadn’t even discovered streaming their services online. When Chestly hit the scene, it was almost prophetic. It was like he was preparing the church leaders for what was coming. Of course, they didn’t listen. They rarely listen to apostolics, leaving them to simply chart a course and forge the future of mission ahead of where the church is stuck. I once sat with Chestly at a lunch, pushing back on the whole digital church thing in general, telling him that incarnation and face-to-face was where it was at. He agreed, and began talking about hybrid models, where the church utilizes both. He asked me if I thought that Paul might utilize that technology...and I got it. Yes. Yes he would. He would have harnessed anything that would have helped him to reach the next generation.");

    console.log(`Listening on Port ${port}`);
});