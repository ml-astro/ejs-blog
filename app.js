//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash"); //для того, чтобы сравнивать и форматировать заголовки, в которых могут быть пробелы, минусы, большие буквы

const homeStartingContent =
  "Безусловно, высокотехнологичная концепция общественного уклада является качественно новой ступенью новых принципов формирования материально-технической и кадровой базы! Таким образом, сплочённость команды профессионалов играет важную роль в формировании поэтапного и последовательного развития общества. Учитывая ключевые сценарии поведения, современная методология разработки выявляет срочную потребность глубокомысленных рассуждений.";
const aboutContent =
  "Разнообразный и богатый опыт говорит нам, что базовый вектор развития позволяет оценить значение системы обучения кадров, соответствующей насущным потребностям. Банальные, но неопровержимые выводы, а также ключевые особенности структуры проекта рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Также как выбранный нами инновационный путь является качественно новой ступенью новых предложений. Прежде всего, постоянное информационно-пропагандистское обеспечение нашей деятельности прекрасно подходит для реализации благоприятных перспектив.";
const contactContent =
  "Прежде всего, сплочённость команды профессионалов, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для стандартных подходов. В своём стремлении улучшить пользовательский опыт мы упускаем, что непосредственные участники технического прогресса являются только методом политического участия и обнародованы. В рамках спецификации современных стандартов, элементы политического процесса представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть указаны как претенденты на роль ключевых факторов.";

const posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { homeContent: homeStartingContent, postList: posts });
});

app.get("/posts/:post", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.post);
  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render(`post`, { title: post.title, body: post.body });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.entry,
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
