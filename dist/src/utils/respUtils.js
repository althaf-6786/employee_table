export function sendSuccessResp(c, status, message, data) {
    const resp = {
        status,
        success: true,
        message,
    };
    if (data) {
        resp.data = data;
    }
    return c.json(resp, status);
}
