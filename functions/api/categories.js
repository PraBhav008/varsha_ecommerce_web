// Cloudflare Pages Function: /api/categories
// Returns category taxonomy and product counts

export async function onRequestGet(context) {
    try {
        const { results } = await context.env.DB
            .prepare(`
                SELECT 
                    c.id, 
                    c.name, 
                    c.slug, 
                    c.description, 
                    c.cover_image, 
                    c.display_order,
                    COUNT(p.id) AS product_count
                FROM categories c
                LEFT JOIN products p ON (p.category_id = c.id OR p.category = c.name) AND p.status != 'Discontinued'
                WHERE c.is_active = 1
                GROUP BY c.id
                ORDER BY c.display_order ASC
            `)
            .all();

        return Response.json({ success: true, categories: results });
    } catch (error) {
        console.error("D1 ERROR [GET /api/categories]:", error);
        return Response.json({ success: false, error: "Failed to fetch categories", details: error.message }, { status: 500 });
    }
}
