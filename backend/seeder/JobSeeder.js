// seed.js
const Job = require("../models/JobModel");
const connectDb = require('../config/dbConnection');
const { default: mongoose } = require("mongoose");

connectDb();

// Insert Job static data
try {
  Job.insertMany([
    {
      description: 'Sample job description 1',
      education_description: [
        "education description 1",
        "education description 2",
        "education description 3",
        "education description 4",
        "education description 5",
      ],
      knowledge_description: [
        "knowledge description 1",
        "knowledge description 2",
        "knowledge description 3",
        "knowledge description 4",
        "knowledge description 5",
      ],
      category_id: new mongoose.Types.ObjectId('65c26377b786a6aacd920c5c'),
      company_id: new mongoose.Types.ObjectId('65c271758b94577d67f558af'),
      job_location_id: new mongoose.Types.ObjectId('65c26385e45c200d244195e0'),
      vacancy: 3,
      nature: 'Full-time',
      annual_salary: 80000,
      position: {
        name: 'Sample Position 1',
        salary_range: '$1500 - $2800',
      },
    },
    {
      description: 'Sample job description 2',
      education_description: [
        "education description 1",
        "education description 2",
        "education description 3",
        "education description 4",
        "education description 5",
      ],
      knowledge_description: [
        "knowledge description 1",
        "knowledge description 2",
        "knowledge description 3",
        "knowledge description 4",
        "knowledge description 5",
      ],
      category_id: new mongoose.Types.ObjectId('65c26377b786a6aacd920c5d'),
      company_id: new mongoose.Types.ObjectId('65c271758b94577d67f558b0'),
      job_location_id: new mongoose.Types.ObjectId('65c26385e45c200d244195e1'),
      vacancy: 2,
      nature: 'Part-time',
      annual_salary: 90000,
      position: {
        name: 'Sample Position 2',
        salary_range: '$3000 - $6000',
      },
    },
    {
      description: 'Sample job description 3',
      education_description: [
        "education description 1",
        "education description 2",
        "education description 3",
        "education description 4",
        "education description 5",
      ],
      knowledge_description: [
        "knowledge description 1",
        "knowledge description 2",
        "knowledge description 3",
        "knowledge description 4",
        "knowledge description 5",
      ],
      category_id: new mongoose.Types.ObjectId('65c26377b786a6aacd920c5e'),
      company_id: new mongoose.Types.ObjectId('65c271758b94577d67f558b1'),
      job_location_id: new mongoose.Types.ObjectId('65c26385e45c200d244195e2'),
      vacancy: 6,
      nature: 'Full-time',
      annual_salary: 980000,
      position: {
        name: 'Sample Position 3',
        salary_range: '$4000 - $7000',
      },
    }
  ]);
  console.log('Static data inserted successfully');
} catch (error) {
  console.error('Error inserting static data:', error);
}
