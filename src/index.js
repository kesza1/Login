import express, { request } from 'express'
import mysql from 'mysql2/promise'
import { myConfig } from './configDatabase.js'
import cors from 'cors'

const app=express()
app.use(express.json())
app.use(cors())

let connection

try {
    connection=mysql.createPool(myConfig)
    //egy teszt mert a connectionPool() csak létrehozza a pool objektumot, de nem ellenőrzni hogy létezike az adatbázis
    await connection.execute('select 1')
    console.log('Sikeres adatbázis kapcsolódás....');
    
} catch (error) {
    console.log('HIBAAAAAA',error);
    process.exit(1)//leállítja a programot mert az alkalmazás nem tudja megnyitni az adatbázist
}

app.get('/todos',async (request,response)=>{
    try {
        const sql='select * from todolist order by timestamp'
        const [rows,fields]=await connection.execute(sql)
        //console.log(rows,fields);
        response.status(200).send(rows)
    } catch (error) {
        console.log(error);
        
    }
})
app.post('/todos',async (request,response)=>{
    const {task}=request.body
    try {
        const sql='insert into todolist (task) values(?)'
        await connection.execute(sql,[task])
        response.status(200).json({msg:'Sikeres hozzáadás!'})
    } catch (error) {
        console.log(error);
        
    }
})

app.patch('/todos/:id',async (request,response)=>{
    const {id}=request.params
    try {
        const sql='update todolist set complete=NOT complete WHERE id=?'
        const [rows]=await connection.execute(sql,[+id])
        console.log(rows, rows.affectedRows);
        response.status(200).json({msg:'Sikeres módosítás!'})
        
        
    } catch (error) {
        console.log(error);
        
    }
})

app.delete('/todos/:id',async (request,response)=>{
    const {id}=request.params
    try {
        const sql='delete from todolist where id=?'
        const [rows]=await connection.execute(sql,[+id])
        console.log(rows, rows.affectedRows);
        response.status(200).json({msg:'Sikeres törlés!'})
        
        
    } catch (error) {
        console.log(error);
        
    }
})

//bejelentkezés:
app.post('/todos/login',(request,response)=>{
    const {username,password}=request.body
    if(username==process.env.LOGIN_USERNAME && password==process.env.LOGIN_PASSWORD)
        response.json({success:true, msg:'Sikeres bejelentkezés!'})
    else
        response.json({success:false, msg:'Hibás felhasználó jelszó páros!'})

})



const port =process.env.PORT || 8000
app.listen(port,()=>console.log(`Server listening on port: ${port}...`))