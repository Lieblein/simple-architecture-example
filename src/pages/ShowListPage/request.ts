type RequestMethod = 'GET';

function stringifyObject<Data extends Record<string, any> | any[]>(data: Data) {
    return Object.keys(data).reduce<Record<string, string>>(
        (requestData, key) => {
            const value = data[key as keyof Data];
            let requestValue: string | null = null;
            if (Array.isArray(value)) {
                requestValue = value.join(',');
            } else {
                if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                    requestValue = value.toString();
                } else if (typeof value !== 'undefined') {
                    console.error('нельзя преобразовать в параметр url', value);
                }
            }
            if (requestValue !== null) {
                requestData[key] = requestValue;
            }

            return requestData;
        },
        {},
    );
}

export async function sendRequest<Response, Data extends Record<string, any> | any[] = Record<string, any> | unknown[]>(
    method: RequestMethod,
    url: string,
    data?: Data,
    abortControllerSignal?: AbortSignal,
): Promise<Response> {
    let requestUrl = url;
    if (method === 'GET' && data !== undefined) {
        requestUrl = `${url}?${new URLSearchParams(stringifyObject(data)).toString()}`;
    }
    const response = await fetch(requestUrl, {
        method,
        body: data !== undefined && method !== 'GET' ? JSON.stringify(data) : undefined,
        headers: {
            //Accept: 'application/json',
            //'Content-Type': 'application/json; charset=UTF-8',
        },
        signal: abortControllerSignal,
    });

    if (!response.ok) {
        const message = await response.json();
        throw new Error(message);
    }

    return await response.json();
}
