import React, { useState, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";

export default function Skills({ onSelectedSkillsChange }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const skills = [
    { name: "Java", code: "java" },
    { name: "JavaScript", code: "javascript" },
    { name: "C++", code: "cpp" },
    { name: "Goland", code: "go" },
    { name: "Rust", code: "rust" },
    { name: "Python", code: "python" },
  ];

  // Function to handle skill selection change
  const handleSkillSelectionChange = (e) => {
    setSelectedSkills(e.value);
  };

  // Pass selected skills to parent component whenever selectedSkills changes
  useEffect(() => {
    onSelectedSkillsChange(selectedSkills.map((skill) => skill.name));
  }, [selectedSkills, onSelectedSkillsChange]);

  return (
    <div className="card flex p-4 sm:w-3/5 border bg-white rounded-lg justify-content-center">
      <MultiSelect
        value={selectedSkills}
        onChange={handleSkillSelectionChange}
        options={skills}
        optionLabel="name"
        display="chip"
        placeholder="Select Skills"
        panelClassName="p-4 bg-[#F5F5F5]"
        maxSelectedLabels={5}
        className="w-full"
      />
    </div>
  );
}
