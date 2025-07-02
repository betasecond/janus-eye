const express = require('express');
const cors = require('cors');
const {
  mockUsers,
  mockCourses,
  mockQuestions,
  mockAssignments,
  mockNotifications,
  mockPerformanceStats,
  mockSyllabus,
  mockStudentAnalysis,
  mockResources,
  teacherMenuItems,
  studentMenuItems,
  adminMenuItems,
} = require('./data.cjs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- API Endpoints ---

// Users
app.get('/api/users', (req, res) => {
  res.json(mockUsers);
});

// Courses
app.get('/api/courses', (req, res) => {
  res.json(mockCourses);
});

// Questions
app.get('/api/questions', (req, res) => {
  res.json(mockQuestions);
});

// Assignments
app.get('/api/assignments', (req, res) => {
  res.json(mockAssignments);
});

// Notifications
app.get('/api/notifications', (req, res) => {
  res.json(mockNotifications);
});

// Performance Stats
app.get('/api/stats', (req, res) => {
  res.json(mockPerformanceStats);
});

// Syllabus
app.get('/api/syllabus', (req, res) => {
  res.json(mockSyllabus);
});

// Student Analysis
app.get('/api/analysis', (req, res) => {
  res.json(mockStudentAnalysis);
});

// Resources
app.get('/api/resources', (req, res) => {
  res.json(mockResources);
});

// Menu Items
app.get('/api/menu/teacher', (req, res) => {
  res.json(teacherMenuItems);
});

app.get('/api/menu/student', (req, res) => {
  res.json(studentMenuItems);
});

app.get('/api/menu/admin', (req, res) => {
  res.json(adminMenuItems);
});

app.listen(port, () => {
  console.log(`🚀 Mock API server is running at http://localhost:${port}`);
}); 