import { Hono } from "hono";
import { EmployeeController } from "../controllers/employeeTableController";

const employeeRouter = new Hono()
const employeeController = new EmployeeController()

employeeRouter.get("/list", employeeController.getAllEmployees);

employeeRouter.post("/add", employeeController.addEmployee);

employeeRouter.put("/update/:id", employeeController.updateEmployee);

employeeRouter.get("/:id", employeeController.getEmployeeById);

employeeRouter.delete("/:id", employeeController.deleteEmployee);

employeeRouter.post("/add-multiple", employeeController.addMultipleEmployees);

export default employeeRouter;