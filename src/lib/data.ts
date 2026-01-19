
export type Skill = {
    name: string;
};

export type SkillGroup = {
    title:string;
    skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
    {
        title: "Languages & Scripting",
        skills: [
            { name: "TypeScript" },
            { name: "JavaScript" },
            { name: "Python" },
            { name: "Java" },
            { name: "Bash scripting" },
        ],
    },
    {
        title: "Backend Development",
        skills: [
            { name: "Node.js" },
            { name: "ExpressJs" },
            { name: "NestJs" },
            { name: "Django" },
            { name: "FastApi" },
            { name: "RESTful APIs" },
        ],
    },
    {
        title: "Frontend Development",
        skills: [
            { name: "React" },
            { name: "Remix" },
            { name: "Vite" },
            { name: "Tailwind" },
            { name: "Material UI" },
            { name: "HTML5" },
            { name: "CSS3" },
        ],
    },
    {
        title: "Databases & ORMs",
        skills: [
            { name: "PostgreSQL" },
            { name: "MySQL" },
            { name: "Sequelize" },
            { name: "Redis" },
            { name: "Firebase" },
            { name: "Prisma" },
        ],
    },
    {
        title: "DevOps, CI/CD & Tooling",
        skills: [
            { name: "Linux" },
            { name: "Git" },
            { name: "GitHub Actions" },
            { name: "Docker" },
            { name: "Ansible" },
            { name: "Jenkins" },
            { name: "CI/CD" },
            { name: "SonarQube" },
            { name: "Elasticsearch" },
            { name: "System Monitoring" },
            { name: "Database Management" },
            { name: "Database Optimization" },
        ],
    },
];
