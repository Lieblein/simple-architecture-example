type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export default async function sendRequest<Response>(
    method: RequestMethod,
    url: string,
    options: { abortControllerSignal?: AbortSignal; } = {},
): Promise<Response> {
    const response = await fetch(
        url,
        {
            method,
            signal: options?.abortControllerSignal,
        },
    );

    if (!response.ok) {
        const message = await response.json();
        throw new Error(message);
    }

    return await response.json();
}
