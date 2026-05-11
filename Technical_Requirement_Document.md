# Technical Requirement Document

## Project Title

Student Placement Prediction System

## 1. Introduction

The Student Placement Prediction System is a software application that predicts whether a student is likely to get placed based on academic performance, technical ability, communication skill, internship experience, attendance, resume quality, and interview readiness.

The system is intended to help students understand their employability status and identify areas for improvement before campus placement drives.

## 2. Objectives

- Predict the placement possibility of a student.
- Analyze key placement factors such as CGPA, coding skills, communication skills, internship experience, and attendance.
- Provide a resume score analyzer as an advanced add-on.
- Provide an interview readiness score as an advanced add-on.
- Display clear feedback and improvement suggestions.
- Help students and placement coordinators make data-driven decisions.

## 3. Scope

### In Scope

- Student input form for placement-related details.
- Placement prediction result: likely placed or not likely placed.
- Placement probability score.
- Resume score analyzer based on resume quality indicators.
- Interview readiness score based on preparation parameters.
- Personalized recommendations for improvement.
- Basic dashboard or result screen.

### Out of Scope

- Direct integration with company hiring portals.
- Real-time interview scheduling.
- Automated resume parsing from PDF or DOCX in the first version.
- Final hiring decision guarantee.
- Biometric or proctored interview evaluation.

## 4. Stakeholders

- Students
- Placement officers
- Faculty mentors
- Training and development team
- System administrator

## 5. User Roles

### Student

- Enters academic, skill, internship, attendance, resume, and interview details.
- Views placement prediction result.
- Reads improvement suggestions.

### Placement Officer

- Reviews student readiness data.
- Identifies students needing additional training.
- Monitors overall placement preparedness.

### Administrator

- Manages system access.
- Updates scoring rules or model configuration.
- Maintains student records if database support is included.

## 6. Functional Requirements

### FR-01: Student Input Collection

The system shall collect the following student details:

- Student name or ID
- CGPA
- Coding skills score
- Communication skills score
- Internship experience
- Attendance percentage
- Resume score inputs
- Interview readiness inputs

### FR-02: CGPA Evaluation

The system shall evaluate CGPA on a normalized scale and use it as one of the main placement prediction factors.

Suggested scale:

- CGPA range: 0 to 10
- Higher CGPA increases placement probability.

### FR-03: Coding Skills Evaluation

The system shall collect a coding skills score.

Suggested scale:

- Score range: 0 to 100
- Parameters may include programming knowledge, problem-solving ability, data structures, algorithms, and project experience.

### FR-04: Communication Skills Evaluation

The system shall collect a communication skills score.

Suggested scale:

- Score range: 0 to 100
- Parameters may include spoken English, confidence, clarity, presentation ability, and group discussion performance.

### FR-05: Internship Experience Evaluation

The system shall collect internship experience details.

Supported values:

- No internship
- One internship
- Multiple internships

Internship experience shall positively affect placement probability.

### FR-06: Attendance Evaluation

The system shall collect attendance percentage.

Suggested scale:

- Attendance range: 0 to 100 percent
- Higher attendance indicates consistency and improves readiness score.

### FR-07: Placement Prediction

The system shall predict whether the student is likely to get placed.

The result shall include:

- Placement status: Likely to be placed / Needs improvement
- Placement probability percentage
- Strength areas
- Weak areas
- Recommended improvement actions

### FR-08: Resume Score Analyzer

The system shall analyze resume quality using structured inputs.

Suggested resume parameters:

- Academic details included
- Technical skills listed
- Projects included
- Internship or work experience included
- Certifications included
- Achievements included
- Resume formatting quality
- Grammar and clarity

The system shall generate:

- Resume score from 0 to 100
- Resume quality category: Excellent / Good / Average / Poor
- Resume improvement suggestions

### FR-09: Interview Readiness Score

The system shall calculate interview readiness using preparation-related inputs.

Suggested interview readiness parameters:

- Technical interview preparation
- HR interview preparation
- Mock interview participation
- Confidence level
- Aptitude preparation
- Communication confidence
- Knowledge of projects and resume

The system shall generate:

- Interview readiness score from 0 to 100
- Readiness category: Ready / Almost ready / Needs preparation
- Interview preparation suggestions

### FR-10: Recommendation Engine

The system shall provide personalized suggestions based on weak areas.

Examples:

- Improve coding skills through daily problem solving.
- Improve communication through mock interviews and group discussions.
- Add projects and measurable achievements to the resume.
- Complete internships or industry-level projects.
- Improve attendance consistency.

### FR-11: Result Dashboard

The system shall display a result dashboard containing:

- Overall placement probability
- Resume score
- Interview readiness score
- Factor-wise breakdown
- Final prediction
- Suggestions for improvement

## 7. Non-Functional Requirements

### Performance

- The system should generate prediction results within 2 seconds after form submission.
- The interface should remain responsive on desktop and mobile devices.

### Usability

- The user interface should be simple and beginner-friendly.
- Input fields should include validation messages.
- Scores and results should be easy to understand.

### Reliability

- The system should validate all user inputs before prediction.
- Invalid values should not be accepted.

### Maintainability

- Code should be modular.
- Prediction logic should be separated from user interface logic.
- Scoring weights should be easy to update.

### Security

- Student data should be protected.
- If authentication is added, passwords must be stored using hashing.
- Input validation should prevent malicious entries.

### Scalability

- The system should support future integration with machine learning models.
- The system should support database storage for multiple student records.

## 8. Input Requirements

| Field | Data Type | Range / Values | Required |
| --- | --- | --- | --- |
| Student Name | Text | 2 to 100 characters | Yes |
| CGPA | Number | 0 to 10 | Yes |
| Coding Skills | Number | 0 to 100 | Yes |
| Communication Skills | Number | 0 to 100 | Yes |
| Internship Experience | Select | None, One, Multiple | Yes |
| Attendance | Number | 0 to 100 percent | Yes |
| Resume Parameters | Number / Checklist | 0 to 100 or checklist | Yes |
| Interview Parameters | Number / Checklist | 0 to 100 or checklist | Yes |

## 9. Output Requirements

The system shall produce:

- Placement prediction result
- Placement probability percentage
- Resume score
- Interview readiness score
- Factor-wise performance breakdown
- Improvement recommendations

## 10. Prediction Logic

For the first version, the system may use a weighted scoring method.

Suggested weight distribution:

| Factor | Weight |
| --- | ---: |
| CGPA | 20% |
| Coding Skills | 25% |
| Communication Skills | 20% |
| Internship Experience | 10% |
| Attendance | 10% |
| Resume Score | 10% |
| Interview Readiness Score | 5% |

### Placement Score Formula

```text
Placement Score =
  CGPA Score * 0.20 +
  Coding Skills Score * 0.25 +
  Communication Skills Score * 0.20 +
  Internship Score * 0.10 +
  Attendance Score * 0.10 +
  Resume Score * 0.10 +
  Interview Readiness Score * 0.05
```

CGPA should be converted to a 100-point scale:

```text
CGPA Score = CGPA * 10
```

Internship score:

```text
No internship = 40
One internship = 75
Multiple internships = 100
```

### Prediction Categories

| Placement Score | Prediction |
| ---: | --- |
| 75 to 100 | Likely to be placed |
| 60 to 74 | Moderately likely; improvement recommended |
| Below 60 | Needs improvement before placement |

## 11. System Architecture

### Recommended Architecture

```text
User Interface
    |
    v
Input Validation Layer
    |
    v
Prediction and Scoring Engine
    |
    v
Recommendation Engine
    |
    v
Result Dashboard
```

### Optional Future Architecture

```text
Frontend Application
    |
    v
Backend API
    |
    v
Machine Learning Model
    |
    v
Database
```

## 12. Recommended Technology Stack

### Basic Version

- Frontend: HTML, CSS, JavaScript
- Data storage: Browser local storage or JSON file
- Prediction method: Weighted rule-based scoring

### Advanced Version

- Frontend: React.js
- Backend: Python Flask or Node.js Express
- Machine learning: Python, scikit-learn
- Database: MySQL, PostgreSQL, or MongoDB
- Deployment: Render, Vercel, Netlify, or AWS

## 13. Database Requirements

For an advanced version, the following database tables may be used.

### Students Table

| Column | Type | Description |
| --- | --- | --- |
| student_id | Integer / UUID | Unique student identifier |
| name | Varchar | Student name |
| cgpa | Decimal | Student CGPA |
| coding_score | Integer | Coding skill score |
| communication_score | Integer | Communication skill score |
| internship_experience | Varchar | Internship status |
| attendance | Decimal | Attendance percentage |
| resume_score | Integer | Resume score |
| interview_score | Integer | Interview readiness score |
| placement_score | Decimal | Final calculated score |
| prediction_result | Varchar | Placement prediction |
| created_at | Timestamp | Record creation time |

## 14. User Interface Requirements

The user interface shall contain:

- Header with project title
- Student detail form
- Slider or number inputs for scores
- Dropdown for internship experience
- Submit or Predict button
- Result section with score cards
- Factor-wise progress indicators
- Recommendation section

## 15. Validation Rules

- CGPA must be between 0 and 10.
- Coding skills must be between 0 and 100.
- Communication skills must be between 0 and 100.
- Attendance must be between 0 and 100.
- Resume score must be between 0 and 100.
- Interview readiness score must be between 0 and 100.
- Required fields cannot be empty.

## 16. Testing Requirements

### Unit Testing

- Test CGPA score conversion.
- Test internship score conversion.
- Test placement score calculation.
- Test prediction category generation.
- Test recommendation generation.

### Integration Testing

- Verify form data flows correctly into prediction logic.
- Verify dashboard displays correct scores and prediction.

### User Acceptance Testing

- Confirm students can enter details easily.
- Confirm prediction result is understandable.
- Confirm recommendations are useful.

## 17. Sample Test Cases

| Test Case ID | Input Scenario | Expected Output |
| --- | --- | --- |
| TC-01 | High CGPA, high skills, internship, good attendance | Likely to be placed |
| TC-02 | Low coding score, average CGPA, no internship | Needs improvement |
| TC-03 | Good academics but poor communication | Moderately likely with communication suggestion |
| TC-04 | Invalid CGPA greater than 10 | Validation error |
| TC-05 | Missing required fields | Validation error |

## 18. Constraints

- The prediction is an estimate and does not guarantee actual placement.
- Accuracy depends on scoring logic or quality of training data.
- Manual resume score input may be subjective unless automated resume parsing is added.
- Interview readiness depends on honest self-assessment unless evaluated by mentors.

## 19. Risks and Mitigation

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Inaccurate prediction | Student may receive misleading feedback | Clearly label result as advisory |
| Subjective scoring | Scores may vary by evaluator | Use clear scoring rubrics |
| Poor data quality | Prediction accuracy decreases | Validate inputs and provide help text |
| Overdependence on result | Student may treat prediction as final decision | Provide recommendations, not guarantees |

## 20. Future Enhancements

- Machine learning model trained on historical placement data.
- Automated resume upload and parsing.
- AI-based resume feedback.
- Mock interview module.
- Admin dashboard for placement officers.
- Batch-wise placement readiness reports.
- Export result as PDF.
- Email result report to students.
- Company-specific placement readiness prediction.

## 21. Success Criteria

The system will be considered successful if:

- Students can enter required details without confusion.
- The system generates a placement prediction instantly.
- Resume score and interview readiness score are calculated correctly.
- Recommendations are relevant to the student profile.
- The system can be extended later with a machine learning model.

## 22. Conclusion

The Student Placement Prediction System will provide a structured way to estimate student placement readiness. By combining academic, technical, communication, internship, attendance, resume, and interview readiness factors, the system can guide students toward focused improvement before campus placement opportunities.
