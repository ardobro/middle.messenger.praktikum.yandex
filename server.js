import express from "express";

const app = express();
const PORT = 3000;

app.use(express.static("dist"));

app.listen(PORT, () => {
  console.log(`App listening on http://127.0.0.1:${PORT}`);
});
