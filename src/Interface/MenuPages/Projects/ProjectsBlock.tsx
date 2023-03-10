import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { MenuComponentsProps } from "../../ContentContainer/ContentContainer";
import Project, { WorkProject } from "./Project";

const ProjectsBlock: React.FC<MenuComponentsProps> = ({
  animationClassName,
}) => {
  const IS_PROD = process.env.DOMAIN !== "localhost";
  const baseUrl = `http${IS_PROD ? "s" : ""}://${process.env.DOMAIN}`;
  const apiPort = process.env.API_PORT;

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      let projs = await fetch(
        `${baseUrl}${apiPort ? `:${apiPort}` : ""}/projects`
      ).then((resp) => resp.json());
      setProjects(projs);
    })();
  }, []);

  return (
    <div className={classNames("projects-list-block", animationClassName)}>
      {projects.map((project, i) => (
        <Project key={i} project={project} />
      ))}
    </div>
  );
};

export default ProjectsBlock;
