// Cloudflare Pages Function: /api/orders
// Handles Orders CRUD for Varsha Furniture

export async function onRequestGet(context) {
    try {
        const url = new URL(context.request.url);
        const status = url.searchParams.get("status");

        let query = "SELECT * FROM orders ORDER BY created_at DESC";
        let stmt;

        if (status && status !== "All") {
            query = "SELECT * FROM orders WHERE status = ?1 ORDER BY created_at DESC";
            stmt = context.env.DB.prepare(query).bind(status);
        } else {
            stmt = context.env.DB.prepare(query);
        }

        const { results } = await stmt.all();

        return Response.json({
            success: true,
            orders: results
        });
    } catch (error) {
        console.error("D1 ERROR [GET /api/orders]:", error);
        return Response.json({ success: false, error: "Failed to fetch orders", details: error.message }, { status: 500 });
    }
}

export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const id = body.id || `ORD-${Date.now().toString().slice(-4)}`;
        const orderNumber = body.orderNumber || `VF-2026-${Date.now().toString().slice(-4)}`;
        const customerName = body.customer || body.customerName || 'Direct Client';
        const customerPhone = body.phone || body.customerPhone || '';
        const customerEmail = body.email || body.customerEmail || '';
        const deliveryCity = body.city || body.deliveryCity || 'Ahmedabad';
        const deliveryAddress = body.address || body.deliveryAddress || '';
        const itemsSummary = body.items || body.itemsSummary || 'Standard Order';
        const subtotal = Number(body.subtotal || body.total) || 0;
        const discount = Number(body.discount) || 0;
        const total = Number(body.total) || subtotal;
        const status = body.status || 'Manufacturing';
        const paymentStatus = body.paymentStatus || 'Pending';
        const paymentMethod = body.paymentMethod || 'Bank Transfer / Workshop NEFT';
        const notes = body.notes || '';

        await context.env.DB.prepare(`
            INSERT INTO orders (
                id, order_number, customer_name, customer_phone, customer_email,
                delivery_city, delivery_address, items_summary, subtotal, discount,
                total, status, payment_status, payment_method, notes, order_date
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, date('now'))
        `).bind(
            id, orderNumber, customerName, customerPhone, customerEmail,
            deliveryCity, deliveryAddress, itemsSummary, subtotal, discount,
            total, status, paymentStatus, paymentMethod, notes
        ).run();

        return Response.json({
            success: true,
            message: "Order placed successfully",
            orderId: id,
            orderNumber
        });
    } catch (error) {
        console.error("D1 ERROR [POST /api/orders]:", error);
        return Response.json({ success: false, error: "Failed to create order", details: error.message }, { status: 500 });
    }
}

export async function onRequestPut(context) {
    try {
        const body = await context.request.json();
        if (!body.id || !body.status) {
            return Response.json({ success: false, error: "Order ID and status are required" }, { status: 400 });
        }

        await context.env.DB.prepare(`
            UPDATE orders
            SET status = ?1, updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
            WHERE id = ?2
        `).bind(body.status, body.id).run();

        return Response.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.error("D1 ERROR [PUT /api/orders]:", error);
        return Response.json({ success: false, error: "Failed to update order", details: error.message }, { status: 500 });
    }
}
