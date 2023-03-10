import moment from "moment";
import React from "react";
import "./styles.less";

export type WorkProject = {
  id: number;
  name: string;
  start: Date;
  end?: Date;
  position: string;
  description: string;
  achievements: string[];
  resposibilities: string[];
};

const Project: React.FC<{ project: WorkProject }> = ({ project }) => {
  const {
    id,
    name,
    position,
    start,
    end,
    description,
    achievements,
    resposibilities,
  } = project;

  return (
    <div className="project-block">
      <div className="project-header">
        <div className="project-header__left">
          <div className="project-name">{name}</div>
          <div>
            {moment(start).format("MMM yyyy")} -{" "}
            {!end ? "Present" : moment(end).format("MMM yyyy")}
          </div>
        </div>
        <div className="project-position">{position}</div>
      </div>
      <div className="project-description">{description}</div>
      <div className="project-achievements_header">Achievements:</div>
      <div className="project-achievements_block">
        {achievements.map((achievement, i) => (
          <div key={i} className="project-achievement">
            {achievement}
          </div>
        ))}
      </div>
      <div className="project-resposibilities_header">Responsibilities:</div>
      <div className="project-resposibilities_block">
        {resposibilities.map((resposibility, i) => (
          <div key={i} className="project-resposibility">
            {resposibility}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
