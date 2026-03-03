import { skills } from '../../data/skillsData';
import SkillIcon from './SkillIcon';

const SkillsGrid = () => {
  return (
    // margin-top to flex gap UNUTMA!!!
    <div className="w-full mt-8">
      <div className="flex items-center gap-2 mb-4 text-gray-500 font-mono text-sm border-b border-white/5 pb-1">
        <span className="text-primary">/</span>
        <h2 className="font-bold">tech_stack</h2>
      </div>

      {/* grids */}
      <div className="grid grid-cols-5 gap-y-6 gap-x-4 justify-items-start">
        {skills.map((skill, index) => (
          <div key={index} className="transform scale-90 origin-top-left">
            <SkillIcon 
                name={skill.name} 
                Icon={skill.icon} 
                color={skill.color} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsGrid;