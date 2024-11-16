import { Context } from "hono";
import { EmployeeService } from "../services/employeTable";
import NotFoundException from "../exceptions/notFoundException";
import { ResponseHelper } from "../helpers/responseHelper";
import { EMPLOYEE_ADDED_SUCCESS, EMPLOYEE_DELETED_SUCCESS, EMPLOYEE_FETCHED_SUCCESS, EMPLOYEE_NOT_FOUND } from "../constants/appMessages";

const employeeService = new EmployeeService();

export class EmployeeController {

  getAllEmployees = async (c: Context) => {
    try {

      const employees = await employeeService.fetchAllEmployees();

      if (employees.length === 0) {
        throw new NotFoundException(EMPLOYEE_NOT_FOUND);
      }

      return ResponseHelper.sendSuccessResponse(c, 200, EMPLOYEE_FETCHED_SUCCESS, employees);
    } catch (error) {

      throw error;
    }
  }


  addEmployee = async (c: Context) => {
    try {
      const data = await c.req.json();

      const employee = await employeeService.addEmployee(data);

      return ResponseHelper.sendSuccessResponse(c, 201, EMPLOYEE_ADDED_SUCCESS, employee);

    } catch (error) {

      throw error;
    }
  }


  updateEmployee = async (c: Context) => {
    try {

      const id = c.req.param("id");

      const data = await c.req.json();

      const employees = await employeeService.getEmployeeById(id);

      if (!employees) {
        throw new NotFoundException(EMPLOYEE_NOT_FOUND);
      }


      const employee = await employeeService.updateEmployee(id, data);

      return ResponseHelper.sendSuccessResponse(c, 200, EMPLOYEE_ADDED_SUCCESS, employee);

    } catch (error) {

      throw error;
    }
  }


  getEmployeeById = async (c: Context) => {
    try {

      const id = c.req.param("id");

      const employee = await employeeService.getEmployeeById(id);

      if (!employee) {
        throw new NotFoundException(EMPLOYEE_NOT_FOUND);
      }

      return ResponseHelper.sendSuccessResponse(c, 200, EMPLOYEE_FETCHED_SUCCESS, employee);

    } catch (error) {

      throw error;
    }
  }


  deleteEmployee = async (c: Context) => {
    try {

      const id = c.req.param("id");

      const employee = await employeeService.getEmployeeById(id);

      if (!employee) {
        throw new NotFoundException(EMPLOYEE_NOT_FOUND);
      }

      await employeeService.deleteEmployee(id);

      return ResponseHelper.sendSuccessResponse(c, 200, EMPLOYEE_DELETED_SUCCESS);

    } catch (error) {

      throw error;
    }
  }
}