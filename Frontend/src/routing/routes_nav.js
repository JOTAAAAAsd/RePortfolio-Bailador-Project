
// Components Public
import LayoutPublic from "../components/layouts/LayoutPublic";
import IndexHome from "../components/public/home/IndexHome";
import Projects from "../components/public/project/Projects";
import Login from "../components/public/auth/Login";
import Register from "../components/public/auth/Register";
 

// Components Private
import LayoutPrivate from "../components/layouts/LayoutPrivate";
import TypesAndImageLangProjectList from "../components/admin/types-and-image-lang-project/TypesAndImageLangProjectList";
import ProjectList from "../components/admin/projects/ProjectList";
import SkillList from "../components/admin/skills/SkillList";
import WorkExperienceList from "../components/admin/work-experience/WorkExperienceList";
import AboutMeList from "../components/admin/about-me/AboutMeList";

 
export const ROUTES_NAV= [

    // NAV ADMIN
    {
        path: "/admin",
        component: LayoutPrivate,
        exact: false,

        routes: [
            {
                path: "/admin/types-and-image-lang-project",
                component: TypesAndImageLangProjectList,
                exact: true
            },
            {
                path: "/admin/project-list",
                component: ProjectList,
                exact: true
            },
            {
                path: "/admin/skill-list",
                component: SkillList,
                exact: true
            },
            {
                path: "/admin/work-experience-list",
                component: WorkExperienceList,
                exact: true
            },
            {
                path: "/admin/about-me-list",
                component: AboutMeList,
                exact: true
            }
        ]

    },

    // NAV PUBLIC
    {
        path: "",
        component: LayoutPublic,
        exact: false, 
    
        routes: [
            {
                path: "/",
                component: IndexHome,
                exact: true
            },
            {
                path: "/projects",
                component: Projects,
                exact: true
            },
            {
                path: "/auth/login",
                component: Login,
                exact: true
            },
            {
                path: "/auth/register",
                component: Register,
                exact: true
            },
            {
                // component: Error404
            }
        ]
    }
];
 




