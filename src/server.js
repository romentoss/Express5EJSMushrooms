import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Setas running on http://localhost:${PORT}`);
  console.log(`Docs: http://localhost:${PORT}/api/docs`);
  console.log(`Views: http://localhost:${PORT}/setas`);
});