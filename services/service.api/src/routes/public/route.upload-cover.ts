import express from "express"

export const uploadCoverRoute = express.Router()

uploadCoverRoute.post('/cover', async (req, res) => {

  const fileData = req.file

  console.log(req.files);
  
    if(fileData?.size === 0)
        res.status(400).send("Ошибка при загрузке файла")
    else
        res.status(200).send("Файл загружен")
});