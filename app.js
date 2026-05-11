const form = document.querySelector("#predictionForm");
const statusPill = document.querySelector("#statusPill");
const sampleButton = document.querySelector("#sampleButton");
const tabButtons = document.querySelectorAll(".tab-button");
const resumePanel = document.querySelector("#resumePanel");
const interviewPanel = document.querySelector("#interviewPanel");
const breakdownList = document.querySelector("#breakdownList");
const recommendationsList = document.querySelector("#recommendations");

const sliders = [
  ["cgpa", (value) => Number(value).toFixed(1)],
  ["coding", (value) => Math.round(Number(value))],
  ["communication", (value) => Math.round(Number(value))],
  ["attendance", (value) => `${Math.round(Number(value))}%`],
  ["technicalPrep", (value) => Math.round(Number(value))],
  ["hrPrep", (value) => Math.round(Number(value))],
  ["mockInterviews", (value) => Math.round(Number(value))],
  ["confidence", (value) => Math.round(Number(value))],
];

const fieldLabels = {
  cgpa: "CGPA",
  coding: "Coding skills",
  communication: "Communication",
  internship: "Internship",
  attendance: "Attendance",
  resume: "Resume",
  interview: "Interview",
};

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function getNumber(id) {
  return Number(document.querySelector(`#${id}`).value);
}

function getResumeScore() {
  const checks = document.querySelectorAll(".resume-check");
  return [...checks].reduce((total, check) => total + (check.checked ? Number(check.value) : 0), 0);
}

function getInterviewScore() {
  const technical = getNumber("technicalPrep");
  const hr = getNumber("hrPrep");
  const mock = getNumber("mockInterviews");
  const confidence = getNumber("confidence");
  return Math.round(technical * 0.35 + hr * 0.25 + mock * 0.2 + confidence * 0.2);
}

function getInternshipScore(value) {
  if (value === "multiple") return 100;
  if (value === "one") return 75;
  return 40;
}

function category(score, type = "placement") {
  if (type === "resume") {
    if (score >= 80) return "Excellent";
    if (score >= 65) return "Good";
    if (score >= 50) return "Average";
    return "Poor";
  }

  if (type === "interview") {
    if (score >= 75) return "Ready";
    if (score >= 60) return "Almost ready";
    return "Needs preparation";
  }

  if (score >= 75) return "Likely to be placed";
  if (score >= 60) return "Moderately likely";
  return "Needs improvement";
}

function scoreTone(score) {
  if (score >= 75) return "success";
  if (score >= 60) return "warning";
  return "danger";
}

function setProgressColor(element, score) {
  const tone = scoreTone(score);
  const color = tone === "success" ? "#15803d" : tone === "warning" ? "#b45309" : "#b91c1c";
  element.style.background = color;
}

function getPredictionData() {
  const studentName = document.querySelector("#studentName").value.trim() || "This student";
  const cgpa = getNumber("cgpa");
  const coding = getNumber("coding");
  const communication = getNumber("communication");
  const attendance = getNumber("attendance");
  const internship = document.querySelector("#internship").value;
  const resume = getResumeScore();
  const interview = getInterviewScore();
  const internshipScore = getInternshipScore(internship);

  const factors = [
    { key: "cgpa", label: fieldLabels.cgpa, score: cgpa * 10, weight: 0.2 },
    { key: "coding", label: fieldLabels.coding, score: coding, weight: 0.25 },
    { key: "communication", label: fieldLabels.communication, score: communication, weight: 0.2 },
    { key: "internship", label: fieldLabels.internship, score: internshipScore, weight: 0.1 },
    { key: "attendance", label: fieldLabels.attendance, score: attendance, weight: 0.1 },
    { key: "resume", label: fieldLabels.resume, score: resume, weight: 0.1 },
    { key: "interview", label: fieldLabels.interview, score: interview, weight: 0.05 },
  ];

  const placement = Math.round(factors.reduce((total, factor) => total + factor.score * factor.weight, 0));

  return {
    studentName,
    cgpa,
    coding,
    communication,
    attendance,
    internship,
    resume,
    interview,
    factors,
    placement: clamp(placement),
  };
}

function buildRecommendations(data) {
  const suggestions = [];

  if (data.coding < 70) suggestions.push("Practice data structures, algorithms, and coding problems consistently.");
  if (data.communication < 70) suggestions.push("Improve communication through group discussions, presentations, and mock HR rounds.");
  if (data.internship === "none") suggestions.push("Complete an internship or industry-level project to strengthen practical exposure.");
  if (data.attendance < 75) suggestions.push("Improve attendance consistency to show reliability and discipline.");
  if (data.resume < 75) suggestions.push("Add stronger projects, certifications, achievements, and measurable resume impact.");
  if (data.interview < 75) suggestions.push("Schedule more mock interviews and revise project explanations before placement drives.");
  if (data.cgpa < 7) suggestions.push("Focus on academic improvement and highlight projects to balance a lower CGPA.");

  if (suggestions.length === 0) {
    suggestions.push("Maintain the current preparation pace and start company-specific interview practice.");
    suggestions.push("Refine resume bullet points with measurable outcomes and clear technical keywords.");
  }

  return suggestions;
}

function renderBreakdown(factors) {
  breakdownList.innerHTML = factors
    .map((factor) => {
      const score = Math.round(factor.score);
      return `
        <div class="breakdown-item">
          <div class="breakdown-line">
            <span>${factor.label}</span>
            <span>${score}%</span>
          </div>
          <div class="mini-track">
            <div class="mini-fill" style="width: ${score}%; background: ${
              score >= 75 ? "#15803d" : score >= 60 ? "#b45309" : "#b91c1c"
            }"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function render(data) {
  const placementBar = document.querySelector("#placementBar");
  const placementScore = document.querySelector("#placementScore");
  const predictionTitle = document.querySelector("#predictionTitle");
  const resultCopy = document.querySelector("#resultCopy");
  const resumeScore = document.querySelector("#resumeScore");
  const resumeCategory = document.querySelector("#resumeCategory");
  const interviewScore = document.querySelector("#interviewScore");
  const interviewCategory = document.querySelector("#interviewCategory");

  const prediction = category(data.placement);
  predictionTitle.textContent = prediction;
  placementScore.textContent = `${data.placement}%`;
  placementBar.style.width = `${data.placement}%`;
  setProgressColor(placementBar, data.placement);

  const toneClass = `tone-${scoreTone(data.placement)}`;
  predictionTitle.className = toneClass;
  statusPill.textContent = data.placement >= 75 ? "Strong candidate" : data.placement >= 60 ? "Needs focused polish" : "Training recommended";

  resultCopy.textContent =
    data.placement >= 75
      ? `${data.studentName} shows strong placement readiness with balanced academic, skill, and readiness indicators.`
      : data.placement >= 60
        ? `${data.studentName} is close to placement readiness, but a few areas need targeted improvement.`
        : `${data.studentName} needs focused preparation before appearing for placement drives.`;

  resumeScore.textContent = `${data.resume}%`;
  resumeCategory.textContent = category(data.resume, "resume");
  interviewScore.textContent = `${data.interview}%`;
  interviewCategory.textContent = category(data.interview, "interview");

  renderBreakdown(data.factors);
  recommendationsList.innerHTML = buildRecommendations(data).map((item) => `<li>${item}</li>`).join("");
}

function updateOutputs() {
  sliders.forEach(([id, formatter]) => {
    const input = document.querySelector(`#${id}`);
    const output = document.querySelector(`#${id}Value`);
    if (input && output) output.textContent = formatter(input.value);
  });
}

function setSample() {
  document.querySelector("#studentName").value = "Neha Reddy";
  document.querySelector("#internship").value = "multiple";
  document.querySelector("#cgpa").value = "8.6";
  document.querySelector("#coding").value = "84";
  document.querySelector("#communication").value = "79";
  document.querySelector("#attendance").value = "91";
  document.querySelector("#technicalPrep").value = "82";
  document.querySelector("#hrPrep").value = "76";
  document.querySelector("#mockInterviews").value = "74";
  document.querySelector("#confidence").value = "81";
  document.querySelectorAll(".resume-check").forEach((check) => {
    check.checked = true;
  });
  updateOutputs();
  render(getPredictionData());
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.tab;
    tabButtons.forEach((tabButton) => {
      const isActive = tabButton === button;
      tabButton.classList.toggle("active", isActive);
      tabButton.setAttribute("aria-selected", String(isActive));
    });
    resumePanel.classList.toggle("active", selected === "resume");
    interviewPanel.classList.toggle("active", selected === "interview");
  });
});

sliders.forEach(([id]) => {
  document.querySelector(`#${id}`).addEventListener("input", () => {
    updateOutputs();
    render(getPredictionData());
  });
});

document.querySelectorAll(".resume-check, #internship, #studentName").forEach((element) => {
  element.addEventListener("input", () => render(getPredictionData()));
  element.addEventListener("change", () => render(getPredictionData()));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  render(getPredictionData());
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    updateOutputs();
    render(getPredictionData());
  }, 0);
});

sampleButton.addEventListener("click", setSample);

updateOutputs();
render(getPredictionData());
