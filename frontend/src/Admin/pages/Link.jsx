import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import UpdateHome from "./Home/UpdateHome";
import AllProjects from "./Projects/AllProjects";
import AddProject from "./Projects/AddProject";
import UpdateProject from "./Projects/UpdateProject";
import CVUpdate from "./Resume/CV Update";
import UpdateWorkUpdate from "./Resume/WorkExperience";
import AddWorkExperience from "./Resume/AddExperience";
import AllSkills from "./Resume/Skills";
import AddSkill from "./Resume/AddSkill";
import PNF from "./PNF";

const LinkComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="update-home" element={<UpdateHome />} />
                <Route path="all-projects" element={<AllProjects />} />
                <Route path="add-project" element={<AddProject />} />
                <Route path="update-project/:id" element={<UpdateProject />} />
                <Route path="all-workExperience" element={<UpdateWorkUpdate />} />
                <Route path="update-CV" element={<CVUpdate />} />
                <Route path="add-workExperience" element={<AddWorkExperience />} />
                <Route path="all-skills" element={<AllSkills />} />
                <Route path="add-skills" element={<AddSkill />} />
                <Route path="/*" element={<PNF />} />
            </Route>
        </Routes>
    );
};

export default LinkComponent;
