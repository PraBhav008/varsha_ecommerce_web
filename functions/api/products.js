// GET: Fetch all active products
export async function onRequestGet(context) {
    try {
        const { results } = await context.env.DB
            .prepare(`
        SELECT
          id,
          title,
          slug,
          category,
          category_id,
          price,
          original_price,
          image,
          desc,
          badge,
          status,
          stock_quantity,
          is_featured,
          rating_avg,
          rating_count
        FROM products
        WHERE status != 'Discontinued'
        ORDER BY created_at DESC
      `)
            .all();

        return Response.json({
            success: true,
            products: results
        });
    } catch (error) {
        console.error("D1 ERROR [GET /api/products]:", error);
        return Response.json(
            { success: false, error: "Failed to fetch products", details: error.message },
            { status: 500 }
        );
    }
}

// POST: Create a new product
export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const id = body.id || `vf-${Date.now().toString().slice(-4)}`;
        const title = body.title;
        const category = body.category || 'Dining Chairs';
        const price = Number(body.price) || 0;
        const originalPrice = body.originalPrice || body.original_price ? Number(body.originalPrice || body.original_price) : null;
        const image = body.image || 'assets/images/catalog/varsha-prod-01.jpg';
        const desc = body.desc || '';
        const badge = body.badge || '';
        const status = body.status || 'In Stock';
        const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        await context.env.DB.prepare(`
            INSERT INTO products (id, title, slug, category, price, original_price, image, desc, badge, status)
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
        `).bind(id, title, slug, category, price, originalPrice, image, desc, badge, status).run();

        return Response.json({ success: true, message: "Product created successfully", id });
    } catch (error) {
        console.error("D1 ERROR [POST /api/products]:", error);
        return Response.json({ success: false, error: "Failed to create product", details: error.message }, { status: 500 });
    }
}

// PUT: Update an existing product
export async function onRequestPut(context) {
    try {
        const body = await context.request.json();
        if (!body.id) {
            return Response.json({ success: false, error: "Product ID is required" }, { status: 400 });
        }

        const price = Number(body.price) || 0;
        const originalPrice = body.originalPrice || body.original_price ? Number(body.originalPrice || body.original_price) : null;

        await context.env.DB.prepare(`
            UPDATE products
            SET title = ?1, category = ?2, price = ?3, original_price = ?4,
                image = ?5, desc = ?6, badge = ?7, status = ?8,
                updated_at = (strftime('%Y-%m-%d %H:%M:%SZ', 'now'))
            WHERE id = ?9
        `).bind(body.title, body.category, price, originalPrice, body.image, body.desc, body.badge, body.status, body.id).run();

        return Response.json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        console.error("D1 ERROR [PUT /api/products]:", error);
        return Response.json({ success: false, error: "Failed to update product", details: error.message }, { status: 500 });
    }
}

// DELETE: Discontinue or delete a product
export async function onRequestDelete(context) {
    try {
        const url = new URL(context.request.url);
        const id = url.searchParams.get("id");
        if (!id) {
            return Response.json({ success: false, error: "Product ID is required" }, { status: 400 });
        }

        await context.env.DB.prepare(`
            UPDATE products SET status = 'Discontinued' WHERE id = ?1
        `).bind(id).run();

        return Response.json({ success: true, message: "Product marked as discontinued" });
    } catch (error) {
        console.error("D1 ERROR [DELETE /api/products]:", error);
        return Response.json({ success: false, error: "Failed to delete product", details: error.message }, { status: 500 });
    }
}