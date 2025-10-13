export async function httpGet(url: string, headers?: any) {
  const response = await fetch(url, {
    method: "GET",
    headers,
  });
  return await response.json();
}

export async function httpPost(url: string, body: any, customHeaders?: Record<string, string>) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...customHeaders,
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  return response;
}
