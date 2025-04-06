export const QUIZ_TEMPLATES_TYPE = [
  {
    label: "Choice หลายตัวเลือก (text)",
    value: "Multiple-choice-text",
  },
  {
    label: "Choice หลายตัวเลือก (image)",
    value: "Multiple-choice-image",
  },
  {
    label: "เกมจับคู่",
    value: "Matched",
  },
  {
    label: "เกมเรียงคำ",
    value: "ArrangeSentences",
  },{
    label: "เกมเรียงรูป",
    value: "ArrangePic",
  },{
    label: "เกมทายคำ",
    value: "WordCheck"
  }
];

export const QUIZ_TEMPLATES_STUCTURE = [
  {
    template: "",
    question: "",
    questionImage: "",
    choices: [
      { value: "", isAns: true },
      { value: "", isAns: false },
      { value: "", isAns: false },
      { value: "", isAns: false },
    ],
  },
  {
    template: "",
    question: "",
    questionImage: "",
    choices: [
      { key: "", pair: "", selectedPair: "" },
      { key: "", pair: "", selectedPair: "" },
      { key: "", pair: "", selectedPair: "" },
      { key: "", pair: "", selectedPair: "" },
    ],
  },
  {
    template: "",
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
  {
    template: "",
    question: "",
    questionImage: "",
    choices: [{ value: "" }],
  },
];