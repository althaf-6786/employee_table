import { Context } from "hono";
import { EmployeeService } from "../services/employeeTableServices";
import NotFoundException from "../exceptions/notFoundException";
import { ResponseHelper } from "../helpers/responseHelper";
import { EMPLOYEE_ADDED_SUCCESS, EMPLOYEE_DELETED_SUCCESS, EMPLOYEE_FETCHED_SUCCESS, EMPLOYEE_NOT_FOUND } from "../constants/appMessages";
import { PaginationHelper } from "../helpers/paginationHelper";
import { SortingHelper } from "../helpers/sortingHelper";
import { FilterHelper } from "../helpers/filterHelper";

const employeeService = new EmployeeService();
const sortingHelper = new SortingHelper();
const paginationHelper = new PaginationHelper();
const filterHelper = new FilterHelper();



export class EmployeeController {


  getAllEmployees = async (c: any) => {
    try {
      const page = +c.req.query('page')! || 1;
      const limit = +c.req.query('limit')! || 10;
      const sortColumn = c.req.query('sortColumn') || 'id';
      const sortOrder = c.req.query('sortOrder') || 'asc';
      const skip = (page - 1) * limit;

      // Extract filters from query parameters
      const filters = {
        search_string: c.req.query('search_string'),
        department: c.req.query('department'),
        email: c.req.query('email'),
        phone: c.req.query('phone'),
        lastName: c.req.query('lastName'),
      };

      const filteredEmployees = await filterHelper.filterEmployees(filters);

      if (filteredEmployees.length === 0) {
        throw new NotFoundException(EMPLOYEE_NOT_FOUND);
      }

      const sortedData = sortingHelper.sortData(filteredEmployees, sortColumn, sortOrder);

      const paginatedData = sortedData.slice(skip, skip + limit);
      const totalCount = filteredEmployees.length;

      const response = await paginationHelper.getPaginationResponse({
        page,
        count: totalCount,
        limit,
        skip,
        data: paginatedData,
        message: EMPLOYEE_FETCHED_SUCCESS,
        searchString: filters.search_string
      });

      return ResponseHelper.sendSuccessResponse(c, 200, EMPLOYEE_FETCHED_SUCCESS, response);
    } catch (error) {
      throw error;
    }
  };


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


  addMultipleEmployees = async (c: Context) => {
    try {
      const data = await c.req.json();

      const employees = await employeeService.addMultipleEmployees(data);

      return ResponseHelper.sendSuccessResponse(c, 201, EMPLOYEE_ADDED_SUCCESS, employees);

    } catch (error) {

      throw error;
    }
  }
}