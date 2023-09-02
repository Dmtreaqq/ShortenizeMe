import express from 'express';
import cors from 'cors';
import { httpMethodLogger } from './middleware/httpMethodLogger';
import { urlController } from './controllers/urlController';
import { httpErrorLogger } from './middleware/httpErrorLogger';
import { redirectionController } from './controllers/redirectionController';

export const app = express();

app.use(express.json());
app.use(httpMethodLogger);
app.use(cors());

app.use('/shortenize', urlController);
app.use('/s', redirectionController);

app.get('/health', (req, res) => {
    res.status(200).send('ok');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Path not found' });
});

app.use(httpErrorLogger);
