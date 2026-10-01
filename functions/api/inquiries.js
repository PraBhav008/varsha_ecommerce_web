// Cloudflare Pages Function: /api/inquiries
// Handles Contact Form Inquiries & Custom Quote Requests

export async function onRequestGet(context) {
    try {
        const { results } = await context.env.DB
            .prepare("SELECT * FROM inquiries ORDER BY created_at DESC")
            .all();

        return Response.json({ success: true, inquiries: results });
    } catch (error) {
        console.error("D1 ERROR [GET /api/inquiries]:", error);
        return Response.json({ success: false, error: "Failed to fetch inquiries", details: error.message }, { status: 500 });
    }
}

export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const id = `INQ-${Date.now().toString().slice(-4)}`;
        const name = body.name || 'Anonymous';
        const email = body.email || '';
        const phone = body.phone || '';
        const subject = body.subject || 'General Inquiry';
        const message = body.message || '';
        const inquiryType = body.inquiryType || body.inquiry_type || 'General';

        await context.env.DB.prepare(`
            INSERT INTO inquiries (id, name, email, phone, subject, message, inquiry_type, status)
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 'New')
        `).bind(id, name, email, phone, subject, message, inquiryType).run();

        return Response.json({ success: true, message: "Inquiry received successfully", id });
    } catch (error) {
        console.error("D1 ERROR [POST /api/inquiries]:", error);
        return Response.json({ success: false, error: "Failed to submit inquiry", details: error.message }, { status: 500 });
    }
}
