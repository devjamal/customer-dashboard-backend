import { Express as Server } from "express";
// import { IsAuthenticated } from "../policies/Authorizer";
import { UserController } from "../controllers/user.controller";
import {CustomerController } from '../controllers/customer.controller'
import {AgentController} from '../controllers/Agent.controller'

export default function routeDefinition(server: Server) {
  const USER = new UserController();

  server.post("/signup", USER.registerAUser);
  server.post("/signin", USER.userLogin);


  const AGENT = new AgentController()


  server.post("/agent/add" , AGENT.registerAgent)
  server.get("/agent/getall" , AGENT.getAgent)



const CUSTOMER =new CustomerController()

server.post("/customer/add" , CUSTOMER.registerACustomer)
server.post("/customer/find" , CUSTOMER.searchCustomer)
server.post("/customer/getCustomerStats" , CUSTOMER.customerStatsData)
server.post("/customer/count", CUSTOMER.getLiveStats)



}
