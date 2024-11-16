import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'
import * as dotenv from 'dotenv';
import { DEF_ERROR_RESP } from './constants/appMessages';
import employeeRouter from './router/employeTable';

dotenv.config();

const app = new Hono();


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/employee-table', employeeRouter);

const port = Number(process.env.PORT)
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

app.onError((err: any, c: Context) => {
  if (err.isOperational) {
    //TODO: Log the error
  }
  console.error(err);
  c.status(err.status || 555);
  return c.json({
    status: err.status || 555,
    success: false,
    message: err.message || DEF_ERROR_RESP,
    errData: err.errData || undefined
  });
});
