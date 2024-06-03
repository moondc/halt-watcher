import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/healthcheck', (req: Request, res: Response) => {
    const status = {status:"up"}
    res.send(JSON.stringify(status));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;