const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const shortUrl = require("./models/urlSchema")

const dotenv = require("dotenv")
dotenv.config({path: "./.env"})


const database = require("./database/database")
const app = express();

// To use Static files such as css etc
const static__path = path.join(__dirname, "../public")
app.use(express.static(static__path))

// To set view engine "EJS"
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))

app.use(express.urlencoded({extended: false}))

app.get("/", async (req, res) => {
    const shortUrls = await shortUrl.find()
    res.render("index", {shortUrls: shortUrls})
})

app.post("/shortUrl", async (req, res) => {
    await shortUrl.create({
        full: req.body.fullUrl
    })
    res.redirect("/")
})

app.get("/:ShortUrl", async (req, res) => {
    const ShortUrl = await shortUrl.findOne({short: req.params.ShortUrl})

    if (ShortUrl == null) {
        return res.sendStatus(404)
    }

    ShortUrl.clicks++
    ShortUrl.save()

    res.redirect(ShortUrl.full)
})

app.listen(process.env.PORT || 3001);