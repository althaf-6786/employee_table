import path from "path";
import { promises as fs } from "fs";
import NotFoundException from "../exceptions/notFoundException";
import { EMPLOYEE_NOT_FOUND } from "../constants/appMessages";

export class EmployeeService {
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, "../../employee_details.txt");
  }

  fetchAllEmployees = async () => {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      const lines = data.trim().split("\n");

      const headers = lines[0].split(",").map((header) => header.trim());
      const employees = lines.slice(1).map((line) => {
        const values = line.split(",").map((value) => value.trim());
        const employee: { [key: string]: string } = {};

        headers.forEach((header, index) => {
          employee[header] = values[index];
        });

        return employee;
      });

      return employees;
    } catch (error) {
      throw error;
    }
  }


  addEmployee = async (employee: any) => {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      const lines = data.trim().split("\n");

      const headers = lines[0].split(',').map(header => header.trim());

      const newRow = headers.map(header => employee[header] || '').join(',');

      await fs.appendFile(this.filePath, `\n${newRow}`);

      return newRow;
    } catch (error) {
      throw error;
    }
  }


  updateEmployee = async (id: string, employee: any) => {
    try {

      const data = await fs.readFile(this.filePath, "utf8");
      const lines = data.trim().split("\n");

      const headers = lines[0].split(',').map(header => header.trim());

      const updatedData = lines.map(line => {
        const columns = line.split(',');
        if (columns[0] === id) {
          return headers.map((header, index) => employee[header] || columns[index]).join(',');
        }
        return line;
      }).join('\n');

      await fs.writeFile(this.filePath, updatedData);

      return updatedData;

    } catch (error) {
      throw error;
    }
  }

  getEmployeeById = async (id: string) => {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      const lines = data.trim().split("\n");

      const headers = lines[0].split(',').map(header => header.trim());

      const employee = lines.find(line => {
        const columns = line.split(',');
        return columns[0].trim() === id;
      });

      if (!employee) {
        throw new NotFoundException(EMPLOYEE_NOT_FOUND);
      }

      const employeeData: { [key: string]: string } = {};
      const employeeColumns = employee.split(',');

      headers.forEach((header, index) => {
        employeeData[header] = employeeColumns[index].trim();
      });

      return employeeData;
    } catch (error) {
      throw error;
    }
  };


  deleteEmployee = async (id: string) => {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      const lines = data.trim().split("\n");

      const updatedData = lines.filter(line => {
        const columns = line.split(',');
        return columns[0] !== id;
      }).join('\n');

      await fs.writeFile(this.filePath, updatedData);

      return updatedData;
    } catch (error) {
      throw error;
    }
  };

  addMultipleEmployees = async (employees: any[]) => {
    try {
      for (const employee of employees) {
        await this.addEmployee(employee);
      }
      return employees;
    } catch (error) {
      throw error;
    }
  };

}