// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const assignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);


function getLearnerData(courseInfo, assignmentGroups, learnerSubmissions) {
    const learnerScores = {};
    let totalWeight = 0;

    for (const assignmentGroup of assignmentGroups) {
        const assignmentLookup = new Map(assignmentGroup.assignments.map(a => [a.id, a]));

        for (const submission of learnerSubmissions) {
            const assignment = assignmentLookup.get(submission.assignment_id);
            if (assignment) {
                // Process submission data based on assignment information
                // Accumulate scores for the learner, considering group weight
            }
        }

        totalWeight += assignmentGroup.group_weight;
    }
}
    // Initialize variables for results
    const formattedResults = [];

    // Iterate through learner submissions
    for (const submission of learnerSubmissions) {
      const learnerData = {
        id: submission.learner_id,
        avg: 0, // Initialize weighted average
      };}

      // Find the corresponding assignment in the assignment group
      const assignment = assignmentGroup.assignments.find(
        (a) => a.id === submission.assignment_id
      );

      // Handle potential errors with assignment or points_possible
      if (!assignment || assignment.points_possible === 0) {
        console.warn(
          "Invalid assignment or missing points_possible. Skipping calculation for this learner."
        );
        continue;
      }

      // Calculate weighted score for this assignment, considering due date and late penalty
      const weightedScore = calculateWeightedScore(submission, assignment);

      // Update learner data with weighted score and overall average
      getLearnerData [assignment.id] = weightedScore;
      learnerData.avg = (learnerData.avg * assignmentGroup.group_weight + weightedScore) /
        (assignmentGroup.group_weight + 1); // Adjust for group weight

      // Add learner data to results
      formattedResults.push(learnerData);
    

    return formattedResults;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw to propagate errors
  }


function calculateWeightedScore(submission, assignment) {
  // Check if assignment is due
  if (isPastDue(assignment.due_at)) {
    // Apply late penalty
    const penalty = assignment.points_possible * 0.1;
    return Math.max(
      0,
      (submission.submission.score - penalty) / assignment.points_possible
    );
  } else {
    return 0; // Assignment not yet due, exclude from scores
  }
}

function isPastDue(dueDateString) {
  // Implement logic to compare dueDateString with current date
  // Example:
  const dueDate = new Date(dueDateString);
  const now = new Date();
  return now > dueDate;
}