import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { user,category,expense } from './src/routes/index'
import { sequelize as db } from './src/model/index'
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Home Page ');
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/user', user)
app.use('/category', category)
app.use('/expense', expense)

db.sync().then(() => {
app.listen(process.env.port||3000, function () {
    console.log(`Server Up on ${process.env.port||3000}`)
})
})