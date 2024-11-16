import { and, eq, getTableName, inArray, isNull, sql, SQL } from "drizzle-orm";
import { DBTable, DBTableRow, InQueryData,OrderByQueryData, WhereQueryData } from "../types/db.types";
import { db } from "../db/dbConnection"
import { log } from "console";
import { textColumnPatternsForSorting } from "../helpers/columnsForSorting";

const prepareSelectColumnsForQuery = (table: DBTable, columnsToSelect?: any) => {

  if (!columnsToSelect) {
    return null;
  }

  if (columnsToSelect.length === 0) {
    return {};
  }

  let columnsForQuery: Record<string, SQL> = {};
  //loop through columns and prepare the select query object
  columnsToSelect.map((column: string) => {
    columnsForQuery[column as string] = sql.raw(`${getTableName(table)}.${column as string}`);
  });
  return columnsForQuery;
};

const prepareWhereQueryConditions = <R extends DBTableRow>(table: DBTable, whereQueryData?: WhereQueryData<R>) => { 
  
  if (whereQueryData && Object.keys(whereQueryData).length > 0 && whereQueryData.columns.length > 0) {
    const { columns, values } = whereQueryData;
    let whereQueries: SQL[] = [];
    for (let i = 0; i < columns.length; i++) {
      const columnInfo = sql.raw(`${getTableName(table)}.${columns[i] as string}`);
      if (typeof values[i] === 'string' && values[i].includes('%')) {
        whereQueries.push(sql`${columnInfo} ILIKE ${values[i]}`);
      }

      else if (columns[i] === 'deleted_at') {
        
        whereQueries.push(isNull(columnInfo));
      }

      else if (typeof values[i] === 'object' && values[i] !== null) {
        const value = values[i] as { gte?: Date | string; lte?: Date | string; };

        if (value.gte && value.lte) {
          whereQueries.push(sql`${columnInfo} BETWEEN ${value.gte} AND ${value.lte}`);
        } else if (value.gte) {
          whereQueries.push(sql`${columnInfo} >= ${value.gte}`);
        } else if (value.lte) {
          whereQueries.push(sql`${columnInfo} <= ${value.lte}`);
        }

      }
      else {
        whereQueries.push(eq(columnInfo, values[i]));
      }

    }    
    return whereQueries;
  }
  return null;
};

const prepareWhereQueryConditionsForTasks = <R extends DBTableRow>(table: DBTable, whereQueryData?: WhereQueryData<R>) => { 
  if (whereQueryData && Object.keys(whereQueryData).length > 0 && whereQueryData.columns.length > 0) {
    const { columns, values } = whereQueryData;
    let whereQueries: SQL[] = [];
    for (let i = 0; i < columns.length; i++) {
      const columnInfo = sql.raw(`${getTableName(table)}.${columns[i] as string}`);
      
      if (Array.isArray(values[i])) {
        // Use inArray for handling arrays like `userProjectIds`
        whereQueries.push(inArray(columnInfo, values[i]));
      } else if (typeof values[i] === 'string' && values[i].includes('%')) {
        whereQueries.push(sql`${columnInfo} ILIKE ${values[i]}`);
      } else if (columns[i] === 'deleted_at') {
        whereQueries.push(isNull(columnInfo));
      } else if (columns[i] === 'project_id') { 
        whereQueries.push(sql`${columnInfo} = ${values}`);
      } else if (typeof values[i] === 'object' && values[i] !== null) {
        const value = values[i] as { gte?: Date | string; lte?: Date | string; };

        if (value.gte && value.lte) {
          whereQueries.push(sql`${columnInfo} BETWEEN ${value.gte} AND ${value.lte}`);
        } else if (value.gte) {
          whereQueries.push(sql`${columnInfo} >= ${value.gte}`);
        } else if (value.lte) {
          whereQueries.push(sql`${columnInfo} <= ${value.lte}`);
        }
      } else {
        whereQueries.push(eq(columnInfo, values[i]));
      }
    }
    return whereQueries;
  }
  return null;
};




const prepareWhereQueryConditionsForProjects = <R extends DBTableRow>(table: DBTable, whereQueryData?: WhereQueryData<R>) => {
  if (whereQueryData && Object.keys(whereQueryData).length > 0 && whereQueryData.columns.length > 0) {
    const { columns, values } = whereQueryData;
    let whereQueries: SQL[] = [];

    for (let i = 0; i < columns.length; i++) {
      const columnInfo = sql.raw(`${getTableName(table)}.${columns[i] as string}`);
      
      if (Array.isArray(values[i])) {  
        whereQueries.push(sql`${columnInfo} IN (${sql.join(values[i], sql`, `)})`);
      } 
      else if (typeof values[i] === 'string' && values[i].includes('%')) {
        whereQueries.push(sql`${columnInfo} ILIKE ${values[i]}`);
      } 
      else if (columns[i] === 'deleted_at') {
        whereQueries.push(sql`${columnInfo} IS NULL`);
      } 
      else if (typeof values[i] === 'object' && values[i] !== null) {
        const value = values[i] as { gte?: Date | string; lte?: Date | string };

        if (value.gte && value.lte) {
          whereQueries.push(sql`${columnInfo} BETWEEN ${value.gte} AND ${value.lte}`);
        } else if (value.gte) {
          whereQueries.push(sql`${columnInfo} >= ${value.gte}`);
        } else if (value.lte) {
          whereQueries.push(sql`${columnInfo} <= ${value.lte}`);
        }
      } 
      else {
        whereQueries.push(sql`${columnInfo} = ${values[i]}`);
      }
    }

    return whereQueries;
  }

  return null;
};

const prepareOrderByQueryConditions = <R extends DBTableRow>(
  table: DBTable, 
  orderByQueryData?: OrderByQueryData<R>
) => {
  let orderByQueries: SQL[] = [];

  if (!orderByQueryData || !orderByQueryData.columns || orderByQueryData.columns.length === 0) {
    const orderByQuery = sql.raw(`${getTableName(table)}.id DESC`);
    orderByQueries.push(orderByQuery);
    return orderByQueries;
  }

  const { columns, values } = orderByQueryData;

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i] as string;
    const order = values[i] as string;

    const isTextColumn = textColumnPatternsForSorting.some(pattern => column.toLowerCase().includes(pattern));

    const orderByQuery = isTextColumn
      ? sql.raw(`LOWER(${getTableName(table)}.${column}) ${order}`)
      : sql.raw(`${getTableName(table)}.${column} ${order}`);

    orderByQueries.push(orderByQuery);
  }

  return orderByQueries;
};


const prepareInQueryCondition = <R extends DBTableRow>(table: DBTable, inQueryData?: InQueryData<R>) => {
  if (inQueryData && Object.keys(inQueryData).length > 0 && inQueryData.values.length > 0) {
    const columnInfo = sql.raw(`${getTableName(table)}.${inQueryData.key as string}`);
    let inQuery = inArray(columnInfo, inQueryData.values);
    return inQuery;
  }
  return null;
};




const executeQuery = async <R extends DBTableRow, C extends keyof R = keyof R>(
  table: DBTable,
  whereQuery: SQL | undefined | null,
  columnsRequired: Record<string, SQL> | null,
  orderByConditions: SQL[],
  inQueryCondition: SQL | null,
  paginationData?: { page: number, pageSize: number; }
) => {

  let dQuery = columnsRequired ?
    db.select(columnsRequired).from(table).$dynamic() :
    db.select().from(table).$dynamic();

  if (whereQuery) {
    dQuery = dQuery.where(whereQuery);
  }

  if (inQueryCondition) {
    dQuery = dQuery.where(inQueryCondition);
  }

  dQuery = dQuery.orderBy(...orderByConditions);

  if (paginationData) {
    const { page, pageSize } = paginationData;
    dQuery = dQuery.limit(pageSize).offset((page - 1) * pageSize);
  }
  

  const results = await dQuery;

  if (columnsRequired) {
    return results as Pick<R, C>[];
  }
  return results as R[];
};


export {
  prepareSelectColumnsForQuery,
  prepareWhereQueryConditions,
  prepareOrderByQueryConditions,
  prepareInQueryCondition,
  executeQuery,
  prepareWhereQueryConditionsForProjects,
  prepareWhereQueryConditionsForTasks
  
};