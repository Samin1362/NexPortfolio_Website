export type EducationItem = {
  degree: string;
  field: string;
  focus?: string;
  school: string;
  schoolUrl?: string;
  location: string;
  start: string;
  end: string;
  gpa?: string;
  highlights?: string[];
};

export const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Science",
    field: "Computer Science & Engineering",
    focus: "Major in Machine Learning",
    school: "North South University",
    schoolUrl: "https://www.northsouth.edu/",
    location: "Dhaka, Bangladesh",
    start: "2020",
    end: "2025",
    gpa: "3.10",
    highlights: [
      "Coursework in Algorithms, Database Systems, Software Engineering, and Machine Learning.",
      "Capstone and side projects focused on full-stack web applications.",
    ],
  },
];
