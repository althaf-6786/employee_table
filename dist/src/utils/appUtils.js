import BaseException from "../exceptions/baseException.js";
import ForbiddenException from "../exceptions/forbiddenException.js";
import NotFoundException from "../exceptions/notFoundException.js";
function makeSlug(name) {
    // converting name to lower case then spaces replacing with '-'
    // removing other special chars
    return name.trim().toLowerCase().replace(/[ /&]/g, "-").replace(/[^\w-]+/g, "").replace(/(-)\1+/g, (str, match) => {
        return match[0];
    });
}
function fileNameHelper(fileName) {
    let [fileOriginalName, fileExtension] = fileName.split(".");
    // Remove spaces and special characters from the fileOriginalName
    fileOriginalName = makeSlug(fileOriginalName);
    // Get the current date and format it
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    // Get the current time and format it (HHmmss)
    const formattedTime = currentDate.toTimeString().split(" ")[0].replace(/:/g, "");
    // Construct the unique filename with date and time
    const uniqueFileName = `${formattedDate}_${formattedTime}_${fileOriginalName}.${fileExtension}`;
    return uniqueFileName;
}
;
function sendErrorResp(c, status, message) {
    const exception = new BaseException(status, message, "Internal Server Error", false);
    return c.json({
        success: false,
        statusCode: exception.statusCode,
        error: exception.errorName,
        message: exception.message,
    }, exception.statusCode);
}
function getErrorResponse(c, status, result) {
    switch (status) {
        case 404:
            throw new NotFoundException("The requested page could not be found");
        case 403:
            throw new ForbiddenException("Access denied. The page may require authentication.");
        case 429:
            return sendErrorResp(c, 429, "Rate limit exceeded. Try again later.");
        default:
            if (!status || status >= 500) {
                return sendErrorResp(c, 502, "Service unavailable due to an upstream error. Please try again.");
            }
            if (status !== 200) {
                return sendErrorResp(c, 400, result?.metadata?.error || "Unexpected scraping error");
            }
            return null;
    }
}
export { fileNameHelper, getErrorResponse, makeSlug, sendErrorResp };
