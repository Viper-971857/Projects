import  express from "express";
import { login,logout,getuser, myProfile, contact, updateUser, addTimeline, addYoutube, addProject, deleteTimeline, deleteYoutube, deleteProject } from "../Controller/User.js";
import {isAuthenticated} from '../Middleware/Auth.js'



export const Router = express.Router();

Router.route("/login").post(login);
Router.route("/logout").get(logout);

Router.route("/user").get(getuser);
Router.route("/me").get(isAuthenticated,myProfile);

Router.route("/admin/update").put(isAuthenticated,updateUser);
Router.route("/admin/timeline/add").post(isAuthenticated,addTimeline);
Router.route("/admin/youtube/add").post(isAuthenticated,addYoutube);
Router.route("/admin/project/add").post(isAuthenticated,addProject);

Router.route("/admin/timeline/:id").delete(isAuthenticated,deleteTimeline);
Router.route("/admin/youtube/:id").delete(isAuthenticated,deleteYoutube);
Router.route("/admin/project/:id").delete(isAuthenticated,deleteProject);

Router.route("/contact").post(contact);