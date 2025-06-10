export const fetchNui = async <T = any>(type: string, value: unknown): Promise<T> => {
    const resourceName = (window as any).GetParentResourceName?.() ?? 'rv_gui';

    const response = await fetch(`https://${resourceName}/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(value),
    });

    if (!response.ok) {
        throw new Error(`HTTP ERROR! Status ${response.status}`);
    }

    const responseData: T = await response.json();

    return responseData;
};
