import express, { urlencoded } from 'express';
import commentsrouter from '../routes/comments.router.js';


const app = express();
const PORT = 3306;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', [commentsrouter]);

app.listen(PORT, () => {
    console.log(PORT, "번으로 열렸음");
});