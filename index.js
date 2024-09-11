
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.use('/api/v1', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
