const { database } = require("../utils/database")
const id = require("../utils/generate_id")

exports.createCategory = async (req, res, next) => {
    const category_id = id();
    const category_name = req.body.category_name.trim();

    console.log("category_name", category_name)
    console.log("category_id", category_id)

    const query = `insert into category (id, category_name) values ('${category_id}', '${category_name}')`

    database.query(query, (err, result) => {
        if (err) {
            next(err)
        }

        else {
            res.status(201).json({ message: "category added successfully" })
        }
    })

}

exports.getCategoryList = async (req, res, next) => {

    const query = "SELECT * FROM category"

    database.query(query, (err, result) => {
        if (err) {
            next(err)
        }

        else {
            res.status(201).json(result)
        }
    })

}

exports.updateCategory = async (req, res, next) => {
    const id = req.params.id;
    const category_name = req.body.category_name.trim();

    console.log("category_name", category_name)
    console.log("id", id)

    const query = `UPDATE category SET category_name = '${category_name}' WHERE id = '${id}' `

    database.query(query, (err, result) => {
        if (err) {
            next(err)
        }
        else if (result.affectedRows == 0) {
            const err = new Error("Selected Category not found")
            next(err);
        }

        else {
            res.status(201).json({ message: "category updated successfully" })
        }
    })

}

exports.deleteCategory = async (req, res, next) => {
    const id = req.params.id;
    const query = `DELETE FROM category WHERE id = '${id}'`

    database.query(query, (err, result) => {
        if (err) {
            next(err)
        }
        else if (result.affectedRows == 0) {
            const err = new Error("Selected Category not found")
            next(err);
        }

        else {
            res.status(201).json({ message: "category deleted successfully" })
        }
    })
}