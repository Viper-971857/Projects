import { Delete } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React from 'react'
import { FaRegSmileWink } from 'react-icons/fa';
import { AiOutlineProject } from "react-icons/ai";
import { deleteProject, getUser } from "../../actions/user";
import { useDispatch } from "react-redux";
import './Projects.css';


export const ProjectCard = ({
    url,
    projectImage,
    projectTitle,
    description,
    technologies,
    isAdmin = false,
    id,
  }) => {
    const dispatch = useDispatch();
  
    const deleteHandler = async (id) => {
      await dispatch(deleteProject(id));
      dispatch(getUser());
    };
    

        return (
            <>
              <a href={url} className="projectCard" target="blank">
                <div>
                  <img src={projectImage} alt="Project" />
                  <Typography variant="h5">{projectTitle}</Typography>
                </div>
                <div>
                  <Typography variant="h4"> About Project</Typography>
                  <Typography>{description}</Typography>
                  <Typography variant="h6">Tech Stack: {technologies}</Typography>
                </div>
              </a>
        
              {isAdmin && (
                <Button
                  style={{ color: "rgba(40,40,40,0.7)" }}
                  onClick={() => deleteHandler(id)}
                >
                  <Delete />
                </Button>
              )}
            </>
          );
        };



const Projects = ({ projects }) => {
    return (
      <div className="projects">
        <Typography variant="h3">
          Projects <AiOutlineProject />
        </Typography>
  
        <div className="projectsWrapper">
          {projects.map((item) => (
            <ProjectCard
              id={item._id}
              key={item._id}
              url={item.url}
              projectImage={item.image.url}
              projectTitle={item.title}
              description={item.description}
              technologies={item.techStack}
            />
          ))}
        </div>

        <Typography  className="above" >
            All The Projects Shown Above Are Made By Me  <FaRegSmileWink/>
        </Typography>

    </div>

  )
}

export default Projects