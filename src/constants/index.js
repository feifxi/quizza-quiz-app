export const QUIZ_TEMPLATES_TYPE = [
  {
    label: "Choice หลายตัวเลือก (text)",
    value: "Multiple-choice-text",
    structure: {
      template: "Multiple-choice-text",
      question: "",
      questionImage: "",
      choices: [
        { value: "", isAns: true },
        { value: "", isAns: false },
        { value: "", isAns: false },
        { value: "", isAns: false },
      ],
    },
  },

  {
    label: "Choice หลายตัวเลือก (image)",
    value: "Multiple-choice-image",
    structure: {
      template: "Multiple-choice-image",
      question: "",
      questionImage: "",
      choices: [
        { value: "", isAns: true },
        { value: "", isAns: false },
        { value: "", isAns: false },
        { value: "", isAns: false },
      ],
    },
  },

  {
    label: "เกมจับคู่",
    value: "Matched",
    structure: {
      template: "Matched",
      question: "",
      questionImage: "",
      choices: [
        { key: "", pair: "", selectedPair: "" },
        { key: "", pair: "", selectedPair: "" },
        { key: "", pair: "", selectedPair: "" },
        { key: "", pair: "", selectedPair: "" },
      ],
    },
  },

  {
    label: "เกมเรียงคำ",
    value: "Word-Shuffle",
    structure: {
      template: "Word-Shuffle",
      question: "",
      questionImage: "",
      choices: [
        { value: "", order: 0 },
        { value: "", order: 1 },
        { value: "", order: 2 },
        { value: "", order: 3 },
        { value: "", order: 4 },
        { value: "", order: 5 },
        { value: "", order: 6 },
        { value: "", order: 7 },
      ],
    },
  },

  {
    label: "เกมเรียงรูป",
    value: "Image-Shuffle",
    structure: {
      template: "Image-Shuffle",
      question: "",
      questionImage: "",
      choices: [
        { value: "", order: 0 },
        { value: "", order: 1 },
        { value: "", order: 2 },
        { value: "", order: 3 },
        { value: "", order: 4 },
        { value: "", order: 5 },
        { value: "", order: 6 },
        { value: "", order: 7 },
      ],
    },
  },

  {
    label: "เกมทายคำ",
    value: "WordCheck",
    structure: {
      template: "WordCheck",
      question: "",
      questionImage: "",
      choices: [{ value: "" }],
    },
  },
];
