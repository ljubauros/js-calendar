const BASE_URL = 'http://localhost:3001';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        return [];
    }
}

async function deleteData(url) {
    try {
        const response = await fetch(url, { method: 'DELETE' });
        if (response.status === 200) {
            return true;
        } else {
            throw new Error(`Failed to delete data from ${url}`);
        }
    } catch (error) {
        console.error(`Error deleting data from ${url}:`, error.message);
        return false;
    }
}

export async function postEvent(newEvent) {
    try {
        const response = await fetch(`${BASE_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        });
        if (!response.ok) {
            throw new Error('Failed to post event');
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting event:', error.message);
        return null;
    }
}

export async function deleteEvent(id) {
    const url = `${BASE_URL}/events?id=${id}`;
    return await deleteData(url);
}

export async function getParticipant(id) {
    const url = `${BASE_URL}/participants/findById?id=${id}`;
    return await fetchData(url);
}

export async function getParticipants() {
    const url = `${BASE_URL}/participants`;
    return await fetchData(url);
}

export async function getEvent(id) {
    const url = `${BASE_URL}/events/findById?id=${id}`;
    return await fetchData(url);
}

export async function getEvents(month, year) {
    const url = `${BASE_URL}/events?month=${month}&year=${year}`;
    return await fetchData(url);
}
