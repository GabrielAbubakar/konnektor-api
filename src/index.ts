import app from './server.ts';

app.listen(process.env.PORT || 8000, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${process.env.PORT || 8000}`);
});
