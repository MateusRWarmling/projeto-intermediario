const app = require('./app');

const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.send('Server online.');
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`O servidor está na porta ${PORT}! 🛸`);
});
