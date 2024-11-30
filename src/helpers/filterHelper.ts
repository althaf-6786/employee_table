import NotFoundException from "../exceptions/notFoundException";
import { EmployeeService } from "../services/employeeTableServices";

const employeeService = new EmployeeService();

export class FilterHelper {

  async filterEmployees(filters: any) {

    const employees = await employeeService.fetchAllEmployees();

    let filteredEmployees = employees;


    // Search string filter on FirstName and LastName
    if (filters?.search_string && filters.search_string.trim() !== '') {
      const searchString = filters.search_string.trim().toLowerCase();
      filteredEmployees = filteredEmployees.filter(employee => {
        const firstName = employee.FirstName?.toLowerCase() || '';
        const lastName = employee.LastName?.toLowerCase() || '';
        return firstName.includes(searchString) || lastName.includes(searchString);
      });
    }

    // Filter by Department
    if (filters?.department) {
      filteredEmployees = filteredEmployees.filter(employee =>
        employee.Department?.toLowerCase() === filters.department.toLowerCase()
      );
    }

    // Filter by Email
    if (filters?.email) {
      filteredEmployees = filteredEmployees.filter(employee =>
        employee.Email?.toLowerCase() === filters.email.toLowerCase()
      );
    }

    // Filter by Phone
    if (filters?.phone) {
      filteredEmployees = filteredEmployees.filter(employee =>
        employee.Phone === filters.phone
      );
    }

    // Filter by Last Name
    if (filters?.lastName) {
      filteredEmployees = filteredEmployees.filter(employee =>
        employee.LastName?.toLowerCase() === filters.lastName.toLowerCase()
      );
    }

    if (filteredEmployees.length === 0) {
      throw new NotFoundException("No data found matching the filters");
    }

    return filteredEmployees;
  }
}
