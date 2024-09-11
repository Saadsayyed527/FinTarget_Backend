
const fs = require('fs');
const path = require('path');
const taskQueue = {};
const taskLogFile = path.join(__dirname, '../task_logs.txt');
const isWithinRateLimit = require('../middleware/rateLimit');

function logTask(userId) {
  const logMessage = `${userId} - task completed at - ${new Date().toISOString()}\n`;
  
  return new Promise((resolve, reject) => {
    fs.appendFile(taskLogFile, logMessage, (err) => {
      if (err) {
        console.error('Error logging task:', err);
        return reject(err);
      }
      resolve();
    });
  });
}

function processTaskQueue() {
  Object.keys(taskQueue).forEach(async (userId) => {
    if (taskQueue[userId].length > 0 && isWithinRateLimit(userId)) {
      const taskToProcess = taskQueue[userId].shift();

      try {
        await logTask(userId);
        taskToProcess.resolve();
      } catch (error) {
        console.error('Error processing task:', error);
        taskToProcess.reject(error);
      }
    }
  });

  
  setTimeout(processTaskQueue, 1000);
}

processTaskQueue();

async function handleTaskCreation(req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  
  const taskPromise = new Promise((resolve, reject) => {
    if (!taskQueue[userId]) {
      taskQueue[userId] = [];
    }

    taskQueue[userId].push({ resolve, reject });

 
    if (taskQueue[userId].length === 1) {
      processTaskQueue();
    }
  });

  
  taskPromise
    .then(() => res.status(200).json({ message: 'Task completed' }))
    .catch(() => res.status(500).json({ message: 'Internal server error' }));
}

module.exports = {
  handleTaskCreation,
};
