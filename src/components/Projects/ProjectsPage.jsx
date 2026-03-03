import { projects } from '../../data/dummyProjects';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen pt-28 px-6 md:px-20 pb-12">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
          <h1 className="text-3xl font-bold font-mono">
            <span className="text-primary">~/</span>projects
          </h1>
          <Link to="/" className="text-gray-500 hover:text-white font-mono text-sm">
            ../back_to_home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;