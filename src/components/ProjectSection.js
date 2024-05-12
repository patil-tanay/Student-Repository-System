import React, { useState } from 'react';
import { auth, firestore } from './firebase';
import './ProjectSection.css'; // Import CSS file for styling

function ProjectSection({ projectDetails, setProjectDetails }) {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [technologiesUsed, setTechnologiesUsed] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddProjectDetail = () => {
    const newProjectDetails = [
      ...projectDetails,
      {
        projectName,
        description,
        technologiesUsed,
        githubLink
      }
    ];
    setProjectDetails(newProjectDetails);
    setShowAddProject(false);
    updateProjectDetailsInFirestore(newProjectDetails);
  };

  const handleEditProjectDetail = (index) => {
    setEditIndex(index);
    const detail = projectDetails[index];
    setProjectName(detail.projectName);
    setDescription(detail.description);
    setTechnologiesUsed(detail.technologiesUsed);
    setGithubLink(detail.githubLink);
    setShowAddProject(true);
  };

  const handleUpdateProjectDetail = () => {
    const updatedDetails = [...projectDetails];
    updatedDetails[editIndex] = {
      projectName,
      description,
      technologiesUsed,
      githubLink
    };
    setProjectDetails(updatedDetails);
    setEditIndex(-1);
    setShowAddProject(false);
    updateProjectDetailsInFirestore(updatedDetails);
  };

  const handleDeleteProjectDetail = (index) => {
    const updatedDetails = [...projectDetails];
    updatedDetails.splice(index, 1);
    setProjectDetails(updatedDetails);
    updateProjectDetailsInFirestore(updatedDetails);
  };

  const updateProjectDetailsInFirestore = async (details) => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update({
        projectDetails: details
      });
    }
  };

  const redirectToGithub = (url) => {
    // Check if the URL starts with 'http://' or 'https://'
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // If not, prepend 'http://' to the URL
      url = 'http://' + url;
    }
    // Open the URL in a new tab
    window.open(url, "_blank");
  };
  return (
    <div className="project-section">
      <h2>Projects</h2>
      {!showAddProject && (
        <button className="add-button" onClick={() => setShowAddProject(true)}>Add Project</button>
      )}
      {showAddProject && (
        <div className="project-form">
          <input className="input-field" type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
          <textarea className="textarea-field" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
          <input className="input-field" type="text" value={technologiesUsed} onChange={(e) => setTechnologiesUsed(e.target.value)} placeholder="Technologies Used" />
          <input className="input-field" type="text" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} placeholder="Github Link" />
          {editIndex !== -1 ? (
            <button className="update-button" onClick={handleUpdateProjectDetail}>Update</button>
          ) : (
            <button className="add-button" onClick={handleAddProjectDetail}>Add</button>
          )}
        </div>
      )}
      <div className="project-details">
        <h3>Project Details</h3>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Technologies Used</th>
              <th>Github Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectDetails.map((project, index) => (
              <tr key={index}>
                <td>{project.projectName}</td>
                <td>{project.description}</td>
                <td>{project.technologiesUsed}</td>
                <td>
                  <button onClick={() => redirectToGithub(project.githubLink)}>View</button>
                </td>
                <td>
                  <button className="edit-button" onClick={() => handleEditProjectDetail(index)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteProjectDetail(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectSection;

// In the code snippet above, we have created a ProjectSection component that displays a list of projects. The component has a state variable showAddProject that determines whether the form to add a new project is visible or not. The component also has state variables to store the project details such as projectName, description, technologiesUsed, and githubLink.
