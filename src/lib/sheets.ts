const url = import.meta.env.ORDER_LIST;

export interface Order {
    id: number;
    client: string;
    progress: number;
    state: string;
}

export async function getOrders(): Promise<Order[] | undefined> {
    const res = await fetch(url, {
        headers: {
            "Cache-Control": "max-age=300"
        }
    });

    if (!res.ok) {
        console.error("Failed to fetch orders:", res.statusText);
        return undefined;
    }

    const csv = await res.text();
    const rows = csv.trim().split("\n").map(r => r.split(","));
    const headers = rows.shift()!;
    console.log("headers", headers);
    const data: Order[] = rows.map(row => {
        return {
            id: Number(row[headers.indexOf("id")]),
            client: row[headers.indexOf("client")],
            progress: Number(row[headers.indexOf("progress")]),
            state: row[headers.indexOf("state\r")]
        }
    });

    return data;
}