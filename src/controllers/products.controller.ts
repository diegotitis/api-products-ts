import pool from '../conf/dbConnection';

// Validaciones
const isValidId = (id: any): any => {
    const num: any = Number(id);
    return Number.isInteger(num) && num > 0;
};

const isValidPrice = (price: any): any => {
    const num: any = Number(price);
    return !isNaN(num) && num > 0;
};

export const getAll = async (req: any, res: any): Promise<any> => {
    try {
        const [rows]: any = await pool.query('SELECT * FROM products WHERE active = TRUE');
        return res.status(200).json({ success: true, data: rows });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Error de servidor interno' });
    }
};

export const getById = async (req: any, res: any): Promise<any> => {
    try {
        const { id }: any = req.params;
        if (!isValidId(id)) return res.status(400).json({ success: false, message: 'ID inválido. Debe ser entero positivo.' });

        const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ? AND active = TRUE', [id]);
        
        if (rows.length === 0) {
            // Regla: 200 aunque no exista
            return res.status(200).json({ success: false, message: 'Producto no encontrado o inactivo' });
        }
        return res.status(200).json({ success: true, data: rows[0] });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Error de servidor interno' });
    }
};

export const create = async (req: any, res: any): Promise<any> => {
    try {
        const { name, price, stock, description, brand, img }: any = req.body;
        
        if (!name || price === undefined || stock === undefined || !description) {
            return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
        }
        if (!isValidPrice(price)) {
            return res.status(400).json({ success: false, message: 'Precio inválido' });
        }

        const query: any = `INSERT INTO products (name, price, stock, description, brand, img) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result]: any = await pool.query(query, [name, price, stock, description, brand || null, img || null]);

        return res.status(201).json({ success: true, message: 'Producto creado', id: result.insertId });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Error de servidor interno' });
    }
};

export const update = async (req: any, res: any): Promise<any> => {
    try {
        const { id }: any = req.params;
        if (!isValidId(id)) return res.status(400).json({ success: false, message: 'ID inválido' });

        const { name, price, stock, description, brand, img }: any = req.body;
        if (!name || price === undefined || stock === undefined || !description) {
            return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
        }
        if (!isValidPrice(price)) return res.status(400).json({ success: false, message: 'Precio inválido' });

        const query: any = `UPDATE products SET name = ?, price = ?, stock = ?, description = ?, brand = ?, img = ? WHERE id = ? AND active = TRUE`;
        const [result]: any = await pool.query(query, [name, price, stock, description, brand || null, img || null, id]);

        if (result.affectedRows === 0) {
            // Regla: 200 aunque no exista
            return res.status(200).json({ success: false, message: 'Producto no encontrado o inactivo' });
        }
        return res.status(200).json({ success: true, message: 'Producto actualizado exitosamente' });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Error de servidor interno' });
    }
};

export const deleteProduct = async (req: any, res: any): Promise<any> => {
    try {
        const { id }: any = req.params;
        if (!isValidId(id)) return res.status(400).json({ success: false, message: 'ID inválido' });

        const query: any = `UPDATE products SET active = FALSE WHERE id = ? AND active = TRUE`;
        const [result]: any = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(200).json({ success: false, message: 'Producto no encontrado o ya estaba inactivo' });
        }
        return res.status(200).json({ success: true, message: 'Baja lógica exitosa' });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Error de servidor interno' });
    }
};

export const changePrice = async (req: any, res: any): Promise<any> => {
    try {
        const { id }: any = req.params;
        if (!isValidId(id)) return res.status(400).json({ success: false, message: 'ID inválido' });

        const { price }: any = req.body;
        if (!isValidPrice(price)) return res.status(400).json({ success: false, message: 'Precio inválido' });

        const query: any = `UPDATE products SET price = ? WHERE id = ? AND active = TRUE`;
        const [result]: any = await pool.query(query, [price, id]);

        if (result.affectedRows === 0) {
            return res.status(200).json({ success: false, message: 'Producto no encontrado o inactivo' });
        }
        return res.status(200).json({ success: true, message: 'Precio modificado exitosamente' });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Error de servidor interno' });
    }
};