import { Router } from 'express';

const routes = new Router();

const projects = [];

function checkIfProjectsExists(req,res,next){

  const { id } = req.params;

  const project = projects.find(proj => proj.id = id);

  if(!project){
    return res.status(400).json({error: 'Project does not exist'});

  }
  return next();
}


routes.get('/projects', (req, res) => {
  return res.json(projects);
});

routes.post('/projects',checkIfProjectsExists, (req, res) => {

  const { id, title } = req.body;

  const project = {
    id: id,
    title: title,
    task: [],
  };

  projects.push(project);

  return res.json(projects);
});

routes.post('/projects/:id/tasks', checkIfProjectsExists,(req, res) => {

  const { id } = req.params;

  const { task } = req.body;

  const project = projects.find(p => p.id == id);
  
  project.task.push(task);

  return res.json(project);
});

routes.put('/projects/:id/tasks', checkIfProjectsExists,(req, res) => {

  const { id } = req.params;

  project = projects.find(p => id == id);

  project.title = title;

  return res.json(project);
});

routes.delete('/projects/:id', checkIfProjectsExists,(req, res) => {

  const { id } = req.params;

  project = projects.findIndex(p => id == id);

  projects.splice(project);

  return res.json(projects);
});

export default routes;