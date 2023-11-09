const express = require('express');
const cors = require('cors'); //npm i cors //cors 에러 막기위해 설치
//const fs = require('fs'); //이미 express에 있던 거라 다운 안해도 됨
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express(); //웬만하면 모듈(cors, fs, bodyParser)받고 쓰기(모듈 받기 전에 쓴다고 오류생기는 건 또 아님)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // form에서 action속성으로 넘어온 body(post의 그 body)내용을 얻기 위함(false는 원래 써줘야 함)
app.use(bodyParser.json()); // body에 있는 json객체를 넘어오기 위함

app.use(express.static('build')); 

const url = "mongodb+srv://tlatlago824:ljJlxOITgoeMzeX3@cluster0.qkekbll.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

let collection;

const dbConnect = async () => {
    await client.connect();
    const db = client.db('employmentDB');
    collection = db.collection('contactMsg');

    console.log('접속성공!');
}//dbConnect() 함수정의


app.get('/', async function (req, res) {
  

    //await collection.insertOne({'key': Number(new Date()), title, msg, 'time': date}); // 값 넣기 

    res.send('성공!');
});

app.post('/', async function (req, res) {
    console.log(req.body)
    const {title, msg, date} = req.body;

    await collection.insertOne({'key': Number(new Date()), title, msg, 'time': date}); // 값 넣기 

    res.send('성공!');
});



app.listen(3000, dbConnect);