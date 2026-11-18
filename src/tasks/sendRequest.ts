type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export default async function sendRequest<Response>(
    method: RequestMethod,
    url: string,
    body?: object,
    options: { abortControllerSignal?: AbortSignal;  } = {},
): Promise<Response> {
    const response = await fetch(
        url,
        {
            method,
            signal: options?.abortControllerSignal,
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        },
    );

    if (!response.ok) {
        const message = await response.json();
        throw new Error(message);
    }

    return await response.json();
}
