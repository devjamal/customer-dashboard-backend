import { Express as Server } from "express";
// import { IsAuthenticated } from "../policies/Authorizer";
import { UserController } from "../controllers/user.controller";
import {CustomerController } from '../controllers/customer.controller'

export default function routeDefinition(server: Server) {
  const USER = new UserController();

  server.post("/signup", USER.registerAUser);
  server.post("/signin", USER.userLogin);


const CUSTOMER =new CustomerController()

server.post("/customer/add" , CUSTOMER.registerACustomer)
server.post("/customer/find" , CUSTOMER.searchUser)


}
