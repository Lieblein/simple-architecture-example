type RequestMethod = 'GET';

export async function sendRequest<Response>(
    method: RequestMethod,
    url: string,
    abortControllerSignal?: AbortSignal,
): Promise<Response> {
    const response = await fetch(
        url,
        {
            method,
            signal: abortControllerSignal,
        },
    );

    if (!response.ok) {
        const message = await response.json();
        throw new Error(message);
    }

    return await response.json();
}
