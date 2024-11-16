import { Hono } from "hono";
import { EmployeeController } from "../controllers/employeTable";

const employeeRouter = new Hono()
const employeeController = new EmployeeController()

employeeRouter.get("/list", employeeController.getAllEmployees);

employeeRouter.post("/add", employeeController.addEmployee);

employeeRouter.put("/update/:id", employeeController.updateEmployee);

employeeRouter.get("/:id", employeeController.getEmployeeById);

employeeRouter.delete("/:id", employeeController.deleteEmployee);

export default employeeRouter;