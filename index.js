const express = require('express');
const { doSomeHeavyTask } = require('./util');
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', function (req, res) {
  return res.json({ message: `Hello from Express Server` });
});

app.get('/slow', async (req, res) => {
   try {
    const timeTaken = await doSomeHeavyTask();
    console.log(timeTaken);
    return res.json({
        status: "Success",
        message: `Heavy task completed in ${timeTaken}ms`
    })
  } catch (error){
    return res
        .status(500)
        .json({ status: "Error", error: "Internal Server Error"})
  }
});



app.listen(PORT, function () {
  console.log(`Express Server Started at http://localhost:${PORT}`);
});